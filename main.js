import { createAlbum } from './album/js/album.js';
import { createPhotobooth } from './photobooth/js/photobooth.js';
import { preloadAssets } from './shared/js/preload.js';

/**
 * Application layer: it knows both systems, while the systems remain independent.
 * The visual handoff will be added here when the physical transition is designed.
 */
async function startInvitation() {
  const photoboothRoot = document.querySelector('#photobooth-root');
  const albumRoot = document.querySelector('#album-root');

  await preloadAssets([]);

  const album = createAlbum(albumRoot);
  const photobooth = createPhotobooth(photoboothRoot, {
    onPrintComplete: ({ photo }) => {
      // Future: coordinate the photo's physical journey into the album here.
      photoboothRoot.hidden = true;
      albumRoot.hidden = false;
      album.receivePhoto(photo);
      album.open();
    },
  });

  photobooth.mount();
  album.mount();
}

startInvitation();
