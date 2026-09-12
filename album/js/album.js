import { createPageNavigator } from './navigation.js';
import { createPageTurner } from './page-turn.js';

/** Public entry point for the album system. */
export function createAlbum(root) {
  const navigation = createPageNavigator();
  const pageTurner = createPageTurner();

  return {
    mount() {
      root.dataset.system = 'album';
      root.dataset.state = 'closed';
    },
    receivePhoto(photo) {
      root.dataset.photoId = photo.id;
    },
    open() {
      root.dataset.state = 'open';
    },
    nextPage() {
      pageTurner.turn('forward');
      navigation.goTo(navigation.current() + 1);
    },
  };
}
