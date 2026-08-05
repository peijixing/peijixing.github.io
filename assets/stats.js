// assets/stats.js
(function() {
  function localIncrement(statName) {
    const key = 'stats_' + statName;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, current + 1);
  }
  
  async function firestoreIncrement(statName) {
    if (!window.db || !window.firestoreHelpers) {
      localIncrement(statName);
      return;
    }
    try {
      const { doc, setDoc, increment } = window.firestoreHelpers;
      const docRef = doc(window.db, 'stats', statName);
      await setDoc(docRef, { count: increment(1) }, { merge: true });
    } catch (e) {
      console.warn('Firestore 统计失败，使用本地计数', e);
      localIncrement(statName);
    }
  }
  
  window.incrementStat = function(statName) {
    firestoreIncrement(statName);
  };
  
  window.getStats = async function(callback) {
    const names = ['password_unique', 'human_verification', 'progress_bar', 'slide_verify', 'gender_unique'];
    if (!window.db || !window.firestoreHelpers) {
      const result = {};
      names.forEach(n => result[n] = parseInt(localStorage.getItem('stats_' + n) || '0', 10));
      callback(result);
      return;
    }
    try {
      const { collection, getDocs } = window.firestoreHelpers;
      const snapshot = await getDocs(collection(window.db, 'stats'));
      const data = {};
      snapshot.forEach(doc => data[doc.id] = doc.data().count || 0);
      callback(data);
    } catch (e) {
      console.warn('获取统计失败', e);
      callback({});
    }
  };
})();