import { setBoothState } from './animations.js';
import { photoboothCopy } from './config.js';

const lines = (items, className) => items.map((item) => `<span class="${className}">${item}</span>`).join('');

/** Public entry point for the photobooth system. */
export function createPhotobooth(root) {
  return {
    mount() {
      root.dataset.system = 'photobooth';
      root.dataset.state = 'idle';
      root.innerHTML = `
        <div class="photobooth-stage scene-camera">
          <section class="booth" aria-labelledby="couple-name">
            <div class="booth__frame">
              <div class="booth__ornament booth__ornament--tl" aria-hidden="true"></div>
              <div class="booth__ornament booth__ornament--tr" aria-hidden="true"></div>
              <div class="booth__ornament booth__ornament--bl" aria-hidden="true"></div>
              <div class="booth__ornament booth__ornament--br" aria-hidden="true"></div>

              <div class="booth__inner">
                <div class="booth__instruction">
                  <p class="booth__eyebrow">${photoboothCopy.eyebrow}</p>
                  <div class="booth__initials" aria-hidden="true">
                    <span>${photoboothCopy.initials[0]}</span>
                    <i>/</i>
                    <span>${photoboothCopy.initials[1]}</span>
                  </div>
                  <span class="booth__rule" aria-hidden="true"></span>
                  <p class="booth__prompt">${lines(photoboothCopy.action, 'booth__prompt-line')}</p>
                  <button class="booth__start" type="button" aria-label="${photoboothCopy.buttonLabel}">
                    <span class="booth__button-core"></span>
                  </button>
                  <p class="booth__footer">${lines(photoboothCopy.footer, 'booth__footer-line')}</p>
                </div>

                <div class="booth__window" aria-label="Invitation display">
                  <div class="booth__window-content">
                    <p class="booth__window-title">${lines(photoboothCopy.windowTitle, 'booth__window-title-line')}</p>
                    <span class="booth__window-rule" aria-hidden="true"></span>
                    <p class="booth__date">${photoboothCopy.date}</p>
                  </div>
                  <div class="booth__photo-slot" aria-hidden="true">
                    <span class="booth__slot-shadow"></span>
                  </div>
                </div>
              </div>
            </div>
            <h1 id="couple-name" class="booth__sr-only">Denzell &amp; Hanna</h1>
            <div class="printer" aria-hidden="true">
              <div class="printer__housing">
                <div class="printer__slot"></div>
              </div>
            </div>
          </section>
          <p class="photobooth-status" aria-live="polite"></p>
        </div>
      `;

      const startButton = root.querySelector('.booth__start');
      const status = root.querySelector('.photobooth-status');
      startButton.addEventListener('click', () => {
        if (root.dataset.state !== 'idle') return;
        startButton.classList.add('is-pressed');
        setBoothState(root, 'ready');
        status.textContent = 'Invitation reveal started.';
      });
    },
  };
}
