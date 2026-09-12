import { createPrinter } from './printer.js';
import { createPhoto } from './photo.js';
import { setBoothState } from './animations.js';

/** Public entry point for the photobooth system. */
export function createPhotobooth(root, { onPrintComplete } = {}) {
  const printer = createPrinter();

  return {
    mount() {
      root.dataset.system = 'photobooth';
      root.dataset.state = 'idle';
      // Booth markup and physical controls will be introduced with the visual design.
    },
    start() {
      setBoothState(root, 'printing');
      printer.print(createPhoto(), onPrintComplete);
    },
  };
}
