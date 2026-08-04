(function() {
  // 创建弹窗结构（如果不存在）
  function createModal() {
    if (document.getElementById('donateOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'donateOverlay';
    overlay.className = 'donate-overlay';
    overlay.innerHTML = `
      <div class="donate-modal">
        <div class="donate-close" id="donateClose">&times;</div>
        <h3>❤️ 请我喝杯咖啡</h3>
        <p class="donate-sub">如果这些离谱发明让你笑了，支持一下吧~</p>
        <div class="donate-qr-wrapper">
          <div class="donate-qr-item">
            <img src="assets/images/wechat-qr.png" alt="微信收款码">
            <span>微信</span>
          </div>
          <div class="donate-qr-item">
            <img src="assets/images/alipay-qr.png" alt="支付宝收款码">
            <span>支付宝</span>
          </div>
        </div>
        <p class="donate-tip">扫码打赏，金额随意 ☕</p>
        <p style = "font-size:0.75rem;color:var(--text-secondary);" > 📱手机用户可截图保存二维码后扫码 </p>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  
  function init() {
    createModal();
    const overlay = document.getElementById('donateOverlay');
    const closeBtn = document.getElementById('donateClose');
    
    // 首页卡片点击打开弹窗
    const card = document.getElementById('donateCard');
    if (card) {
      card.addEventListener('click', (e) => {
        // 如果点击的是按钮本身也没关系，阻止重复触发
        e.stopPropagation();
        overlay.classList.add('active');
      });
      // 卡片内按钮同样触发
      const openBtn = card.querySelector('.donate-open-btn');
      if (openBtn) {
        openBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          overlay.classList.add('active');
        });
      }
    }
    
    // 关闭按钮
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
      });
    }
    // 点击遮罩关闭
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();