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
      root.innerHTML = `
        <div class="album-arrival" aria-label="Wedding album">
          <div class="album-cover">
            <div class="album-cover__frame"></div>
            <div class="album-cover__content">
              <span class="album-cover__title">D/H WEDDING</span>
            </div>
          </div>
        </div>
      `;
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
