import { createPageNavigator } from './navigation.js';
import { createPageTurner } from './page-turn.js';
import { createPages } from './pages.js';

/** Public entry point for the album system. */
export function createAlbum(root) {
  const navigation = createPageNavigator();
  const pageTurner = createPageTurner();
  const pages = createPages();

  return {
    mount() {
      root.dataset.system = 'album';
      root.dataset.state = 'closed';
    },
    receivePhoto(photo) {
      root.dataset.photoId = photo.id;
    },
    structure() {
      return pages;
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
