(function() {
  function createModal() {
    if (document.getElementById('donateOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'donateOverlay'; overlay.className = 'donate-overlay';
    overlay.innerHTML = `
      <div class="donate-modal">
        <div class="donate-close" id="donateClose">&times;</div>
        <h3>❤️ 请我喝杯咖啡</h3>
        <p class="donate-sub">如果这些离谱发明让你笑了，支持一下吧~</p>
        <div class="donate-qr-wrapper">
          <div class="donate-qr-item"><img src="assets/images/wechat-qr.webp" alt="微信收款码"><span>微信</span></div>
          <div class="donate-qr-item"><img src="assets/images/alipay-qr.webp" alt="支付宝收款码"><span>支付宝</span></div>
        </div>
        <p class="donate-tip">扫码打赏，金额随意 ☕</p>
      </div>`;
    document.body.appendChild(overlay);
  }

  function init() {
    createModal();
    const overlay = document.getElementById('donateOverlay');
    const closeBtn = document.getElementById('donateClose');
    const card = document.getElementById('donateCard');
    if (card) {
      card.addEventListener('click', e => { e.stopPropagation(); overlay.classList.add('active'); });
      const btn = card.querySelector('.donate-open-btn');
      if (btn) btn.addEventListener('click', e => { e.stopPropagation(); overlay.classList.add('active'); });
    }
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();