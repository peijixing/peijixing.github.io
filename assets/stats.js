(function() {
  function localIncrement(statName) {
    const key = 'stats_' + statName;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, current + 1);
    console.log(`[Stats] 本地计数 +1：${statName}，当前值：${current + 1}`);
  }

  async function firestoreIncrement(statName) {
    if (!window.db || !window.firestoreHelpers) {
      console.warn('[Stats] Firestore 未初始化，使用本地计数');
      localIncrement(statName);
      return;
    }
    try {
      const { doc, setDoc, increment } = window.firestoreHelpers;
      const docRef = doc(window.db, 'stats', statName);
      console.log(`[Stats] 准备写入 Firestore：${statName}，docRef 路径：stats/${statName}`);
      await setDoc(docRef, { count: increment(1) }, { merge: true });
      console.log(`[Stats] Firestore 写入成功：${statName}`);
    } catch (e) {
      console.error(`[Stats] Firestore 写入失败：${statName}，错误：`, e);
      localIncrement(statName);
    }
  }

  window.incrementStat = function(statName) {
    console.log(`[Stats] 触发计数：${statName}`);
    firestoreIncrement(statName);
  };

  window.getStats = async function(callback) {
    const names = ['password_unique', 'human_verification', 'progress_bar', 'slide_verify', 'gender_unique'];
    if (!window.db || !window.firestoreHelpers) {
      console.warn('[Stats] Firestore 未初始化，从本地获取统计');
      const result = {};
      names.forEach(n => result[n] = parseInt(localStorage.getItem('stats_' + n) || '0', 10));
      console.log('[Stats] 本地统计数据：', result);
      callback(result);
      return;
    }
    try {
      const { collection, getDocs } = window.firestoreHelpers;
      console.log('[Stats] 开始从 Firestore 获取统计数据...');
      const snapshot = await getDocs(collection(window.db, 'stats'));
      const data = {};
      snapshot.forEach(doc => {
        data[doc.id] = doc.data().count || 0;
        console.log(`[Stats] 文档 ${doc.id} = ${doc.data().count}`);
      });
      console.log('[Stats] Firestore 统计数据：', data);
      callback(data);
    } catch (e) {
      console.error('[Stats] 获取统计失败：', e);
      callback({});
    }
  };
})();