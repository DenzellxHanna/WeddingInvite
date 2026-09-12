import { createPhotobooth } from './photobooth/js/photobooth.js';
import { createAlbum } from './album/js/album.js';

function startInvitation() {
  const photoboothRoot = document.querySelector('#photobooth-root');
  const albumRoot = document.querySelector('#album-root');

  const photobooth = createPhotobooth(photoboothRoot);
  const album = createAlbum(albumRoot);

  photobooth.mount();
  album.mount();

  // The photobooth owns the curtain sequence. main.js only coordinates the
  // handoff once the curtain has completely opened.
  window.addEventListener('photobooth:curtain-open', () => {
    albumRoot.hidden = false;
    album.open();
  }, { once: true });
}

startInvitation();
