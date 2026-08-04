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
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    
    let currentIndex = 0;
    let timer = null;
    const titleEl = document.getElementById('adTitle');
    const copyBtn = document.getElementById('adCopyBtn');
    const dotsContainer = document.getElementById('adDots');
    
    AD_LIST.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => goTo(index));
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function goTo(index) {
      currentIndex = index;
      const ad = AD_LIST[index];
      titleEl.textContent = ad.title;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    
    function nextAd() {
      goTo((currentIndex + 1) % AD_LIST.length);
    }
    
    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextAd, 5000);
    }
    
    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
    
    copyBtn.addEventListener('click', () => {
      const code = AD_LIST[currentIndex].code;
      copyToClipboard(code, (success) => {
        if (success) {
          copyBtn.textContent = '已复制';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = '复制口令';
            copyBtn.classList.remove('copied');
          }, 1500);
        } else {
          alert('复制失败，请手动复制');
        }
      });
    });
    
    const bannerEl = document.querySelector('.ad-banner');
    bannerEl.addEventListener('mouseenter', stopAutoPlay);
    bannerEl.addEventListener('mouseleave', startAutoPlay);
    
    goTo(0);
    startAutoPlay();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdBanner);
  } else {
    initAdBanner();
  }
})();