/**
 * Small state helper kept separate so the landing interaction can grow into
 * the later photo-to-album transition without coupling the modules.
 */
export function setBoothState(root, state) {
  root.dataset.state = state;
}

export function revealPhoto(root) {
  const photo = root.querySelector('.revealed-photo');
  if (!photo) return;

  photo.hidden = false;
  requestAnimationFrame(() => {
    root.dataset.state = 'printing';
    photo.classList.add('is-emerging');
  });
}
