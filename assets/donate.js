(function() {
  // 创建打赏按钮和模态
  function initDonate() {
    // 按钮
    const btn = document.createElement('button');
    btn.className = 'donate-btn';
    btn.innerHTML = '☕';
    btn.title = '请我喝杯咖啡';
    document.body.appendChild(btn);

    // 模态遮罩
    const overlay = document.createElement('div');
    overlay.className = 'donate-overlay';
    overlay.innerHTML = `
      <div class="donate-modal">
        <div class="donate-close">&times;</div>
        <h3>☕ 请我喝杯咖啡</h3>
        <p class="donate-sub">感谢你的支持，让我更有动力创作离谱发明！</p>
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
        <p class="donate-tip">扫码请我喝杯咖啡，金额随意~</p>
      </div>
    `;
    document.body.appendChild(overlay);

    // 事件绑定
    btn.addEventListener('click', () => {
      overlay.classList.add('active');
    });
    overlay.querySelector('.donate-close').addEventListener('click', () => {
      overlay.classList.remove('active');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDonate);
  } else {
    initDonate();
  }
})();