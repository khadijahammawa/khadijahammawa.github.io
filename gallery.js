(() => {
  'use strict';
  const dialog = document.querySelector('.image-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('.dialog-image');
  const caption = dialog.querySelector('.dialog-caption');
  let opener;
  document.querySelectorAll('[data-viewer]').forEach(link => {
    link.addEventListener('click', event => {
      // Preserve native new-tab behavior and the original-image fallback.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      const thumbnail = link.querySelector('img');
      image.src = link.getAttribute('href');
      image.alt = thumbnail.alt;
      caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    opener?.focus();
  });
})();
