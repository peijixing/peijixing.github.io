(function() {
  function loadHtml2Canvas(callback, retryCount) {
    retryCount = retryCount || 0;
    if (window.html2canvas) return callback();

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = function() {
      console.log('html2canvas 加载成功');
      callback();
    };
    script.onerror = function() {
      console.error('html2canvas 加载失败，重试次数：' + retryCount);
      if (retryCount < 2) {
        setTimeout(function() { loadHtml2Canvas(callback, retryCount + 1); }, 1500);
      } else {
        alert('截图组件加载失败，请检查网络后刷新页面重试');
      }
    };
    document.head.appendChild(script);
  }

  function createShareButton() {
    var btn = document.createElement('button');
    btn.className = 'share-btn';
    btn.innerHTML = '📸 截图分享';
    btn.title = '生成截图并分享';
    document.body.appendChild(btn);

    btn.addEventListener('click', function() {
      btn.innerHTML = '⏳ 生成中...';
      btn.disabled = true;

      var target = document.getElementById('conflictCard') ||
                   document.getElementById('progressBox') ||
                   document.querySelector('.container') ||
                   document.body;
      console.log('截图目标元素：', target.id || target.className || 'body');

      loadHtml2Canvas(function() {
        try {
          html2canvas(target, {
            backgroundColor: '#0d1117',
            scale: Math.min(window.devicePixelRatio, 2),
            useCORS: true,
            logging: true,
            allowTaint: true
          }).then(function(canvas) {
            console.log('截图生成成功');
            showPreviewModal(canvas);
            btn.innerHTML = '📸 截图分享';
            btn.disabled = false;
          }).catch(function(err) {
            console.error('截图生成失败：', err);
            alert('截图失败，请尝试手动截图');
            btn.innerHTML = '📸 截图分享';
            btn.disabled = false;
          });
        } catch (err) {
          console.error('html2canvas 调用异常：', err);
          alert('截图失败，请尝试手动截图');
          btn.innerHTML = '📸 截图分享';
          btn.disabled = false;
        }
      });
    });
  }

  function showPreviewModal(canvas) {
    var existing = document.querySelector('.screenshot-modal-overlay');
    if (existing) existing.remove();

    var dataURL = canvas.toDataURL('image/png');
    var overlay = document.createElement('div');
    overlay.className = 'screenshot-modal-overlay';
    overlay.innerHTML = `
      <div class="screenshot-modal">
        <span class="screenshot-close">&times;</span>
        <img src="${dataURL}" alt="分享截图" style="width:100%; border-radius:8px; border:1px solid #30363d;" />
        <div style="margin-top:1rem; display:flex; gap:1rem; justify-content:center;">
          <button class="btn btn-sm" id="downloadScreenshot">💾 保存图片</button>
          <button class="btn btn-sm" id="shareScreenshot">📤 分享</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    // 强制显示弹窗（CSS 中默认 display:none，这里改为 flex）
    overlay.style.display = 'flex';

    var closeBtn = overlay.querySelector('.screenshot-close');
    closeBtn.addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

    var downloadBtn = overlay.querySelector('#downloadScreenshot');
    downloadBtn.addEventListener('click', function() {
      var link = document.createElement('a');
      link.download = '离谱发明实验室_' + Date.now() + '.png';
      link.href = dataURL;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
    });

    var shareBtn = overlay.querySelector('#shareScreenshot');
    shareBtn.addEventListener('click', function() {
      canvas.toBlob(function(blob) {
        if (!blob) return;
        var file = new File([blob], 'screenshot.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ title: '离谱发明实验室', text: '看看这个离谱的网站！', files: [file] }).catch(function() {});
        } else {
          downloadBtn.click();
          alert('已保存图片，可手动分享');
        }
      }, 'image/png');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createShareButton);
  } else {
    createShareButton();
  }
})();