(function() {
  function initAdBanner() {
    if (typeof AD_LIST === 'undefined' || AD_LIST.length === 0) return;

    const bannerHTML = `
      <div class="ad-banner">
        <div class="ad-banner-inner">
          <div class="ad-content">
            <span class="ad-label">[📦 资源补给站]</span>
            <span class="ad-title" id="adTitle"></span>
            <button class="ad-copy-btn" id="adCopyBtn">复制口令</button>
          </div>
          <div class="ad-dots" id="adDots"></div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    let currentIndex = 0, timer = null;
    const titleEl = document.getElementById('adTitle');
    const copyBtn = document.getElementById('adCopyBtn');
    const dotsContainer = document.getElementById('adDots');

    AD_LIST.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function goTo(i) {
      currentIndex = i;
      titleEl.textContent = AD_LIST[i].title;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }
    function nextAd() { goTo((currentIndex + 1) % AD_LIST.length); }
    function startAutoPlay() { stopAutoPlay(); timer = setInterval(nextAd, 5000); }
    function stopAutoPlay() { if (timer) clearInterval(timer); timer = null; }

    copyBtn.addEventListener('click', () => {
      const code = AD_LIST[currentIndex].code;
      copyToClipboard(code, success => {
        if (success) {
          copyBtn.textContent = '已复制'; copyBtn.classList.add('copied');
          setTimeout(() => { copyBtn.textContent = '复制口令'; copyBtn.classList.remove('copied'); }, 1500);
        } else alert('复制失败');
      });
    });

    const bannerEl = document.querySelector('.ad-banner');
    bannerEl.addEventListener('mouseenter', stopAutoPlay);
    bannerEl.addEventListener('mouseleave', startAutoPlay);

    goTo(0);
    startAutoPlay();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAdBanner);
  else initAdBanner();
})();