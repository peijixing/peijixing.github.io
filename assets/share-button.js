(function() {
  function loadHtml2Canvas(callback) {
    if (window.html2canvas) return callback();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = callback;
    script.onerror = () => alert('截图组件加载失败，请刷新后重试');
    document.head.appendChild(script);
  }

  function createShareButton() {
    const btn = document.createElement('button');
    btn.className = 'share-btn'; btn.innerHTML = '📸 截图分享'; btn.title = '生成截图并分享';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      btn.innerHTML = '⏳ 生成中...'; btn.disabled = true;
      const target = document.getElementById('conflictCard') || document.getElementById('progressBox') || document.querySelector('.container') || document.body;

      loadHtml2Canvas(() => {
        html2canvas(target, { backgroundColor: '#0d1117', scale: Math.min(window.devicePixelRatio, 2), useCORS: true, logging: false, allowTaint: true })
          .then(canvas => {
            showPreviewModal(canvas);
            btn.innerHTML = '📸 截图分享'; btn.disabled = false;
          })
          .catch(err => {
            alert('截图失败，请尝试手动截图'); console.error(err);
            btn.innerHTML = '📸 截图分享'; btn.disabled = false;
          });
      });
    });
  }

  function showPreviewModal(canvas) {
    const existing = document.querySelector('.screenshot-modal-overlay');
    if (existing) existing.remove();

    const dataURL = canvas.toDataURL('image/png');
    const overlay = document.createElement('div');
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

    const closeBtn = overlay.querySelector('.screenshot-close');
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    const downloadBtn = overlay.querySelector('#downloadScreenshot');
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = '离谱发明实验室_' + Date.now() + '.png';
      link.href = dataURL;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
    });

    const shareBtn = overlay.querySelector('#shareScreenshot');
    shareBtn.addEventListener('click', () => {
      canvas.toBlob(blob => {
        if (!blob) return;
        const file = new File([blob], 'screenshot.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ title: '离谱发明实验室', text: '看看这个离谱的网站！', files: [file] }).catch(() => {});
        } else {
          downloadBtn.click();
          alert('已保存图片，可手动分享');
        }
      }, 'image/png');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createShareButton);
  else createShareButton();
})();