/**
 * 复制文本到剪贴板
 * @param {string} text 要复制的文本
 * @param {function} callback 复制成功后的回调（可选）
 */
function copyToClipboard(text, callback) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (callback) callback(true);
    }).catch(() => {
      // 降级方案
      fallbackCopy(text, callback);
    });
  } else {
    fallbackCopy(text, callback);
  }
}

function fallbackCopy(text, callback) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    if (callback) callback(true);
  } catch (err) {
    if (callback) callback(false);
  }
  document.body.removeChild(textarea);
}

/**
 * 显示短暂提示（可替换为自己的UI）
 * @param {string} msg 提示文字
 * @param {string} type 'success' 或 'error'
 */
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}