const contentMain = document.getElementById('content-main');
const fadeElements = contentMain.querySelectorAll('[data-build-delay]');

document.body.style.overflow = 'hidden';

module.exports = function cascadeFadeIn() {
  contentMain.className = 'visible';

  for (let i = 0; i < fadeElements.length; i += 1) {
    const elem = fadeElements[i];
    setTimeout(() => {
      elem.className += ' visible';
    }, elem.getAttribute('data-build-delay') * 1000);
  }

  setTimeout(() => {
    document.body.style.overflow = '';
  }, 7000);
};
