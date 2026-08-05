(function() {
  function loadHtml2Canvas(callback) {
    if (window.html2canvas) {
      callback();
      return;
    }
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = callback;
    script.onerror = function() {
      alert('截图组件加载失败，请刷新后重试');
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
      
      // 优先截取冲突卡片、排行榜、进度条容器，否则截取主体
      var target = document.getElementById('conflictCard') ||
        document.getElementById('leaderboard') ||
        document.getElementById('progressBox') ||
        document.querySelector('.container') ||
        document.body;
      
      loadHtml2Canvas(function() {
        html2canvas(target, {
          backgroundColor: '#0d1117',
          scale: Math.min(window.devicePixelRatio, 2),
          useCORS: true,
          logging: false,
          allowTaint: true
        }).then(function(canvas) {
          showPreviewModal(canvas);
          btn.innerHTML = '📸 截图分享';
          btn.disabled = false;
        }).catch(function(err) {
          alert('截图失败，请尝试手动截图');
          console.error(err);
          btn.innerHTML = '📸 截图分享';
          btn.disabled = false;
        });
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
      </div>
    `;
    document.body.appendChild(overlay);
    
    var closeBtn = overlay.querySelector('.screenshot-close');
    closeBtn.addEventListener('click', function() {
      overlay.remove();
    });
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.remove();
    });
    
    var downloadBtn = overlay.querySelector('#downloadScreenshot');
    downloadBtn.addEventListener('click', function() {
      var link = document.createElement('a');
      link.download = '离谱发明实验室_' + Date.now() + '.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    
    var shareBtn = overlay.querySelector('#shareScreenshot');
    shareBtn.addEventListener('click', function() {
      if (navigator.share) {
        canvas.toBlob(function(blob) {
          var file = new File([blob], 'screenshot.png', { type: 'image/png' });
          var shareData = {
            title: '离谱发明实验室',
            text: '看看这个离谱的进度条！',
            files: [file]
          };
          if (navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData).catch(function(err) {
              console.log('分享取消或失败', err);
            });
          } else {
            downloadBtn.click();
          }
        }, 'image/png');
      } else {
        downloadBtn.click();
        alert('已保存图片，可手动分享');
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createShareButton);
  } else {
    createShareButton();
  }
})();