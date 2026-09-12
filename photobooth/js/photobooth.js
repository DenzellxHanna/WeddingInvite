import { setBoothState } from './animations.js';

/** Public entry point for the photobooth system. */
export function createPhotobooth(root) {
  return {
    mount() {
      root.dataset.system = 'photobooth';
      root.dataset.state = 'idle';
      root.innerHTML = `
        <div class="photobooth-stage scene-camera">
          <section class="booth" aria-labelledby="couple-name">
            <div class="booth__frame" aria-hidden="true">
              <div class="booth__ornament booth__ornament--tl"></div>
              <div class="booth__ornament booth__ornament--tr"></div>
              <div class="booth__ornament booth__ornament--bl"></div>
              <div class="booth__ornament booth__ornament--br"></div>
              <div class="booth__inner">
                <div class="booth__instruction">
                  <p class="booth__eyebrow">D / H</p>
                  <p class="booth__prompt">PRESS<br>TO<br>REVEAL</p>
                  <span class="booth__rule"></span>
                  <button class="booth__start" type="button" aria-label="Press to reveal the wedding invitation">
                    <span class="booth__button-core"></span>
                  </button>
                </div>
                <div class="booth__window">
                  <div class="booth__window-light"></div>
                  <div class="booth__window-content" aria-hidden="true">
                    <span>D</span><i>&amp;</i><span>H</span>
                  </div>
                </div>
              </div>
            </div>
            <h1 id="couple-name" class="booth__sr-only">Denzell &amp; Hanna</h1>
            <div class="printer" aria-hidden="true">
              <div class="printer__housing">
                <div class="printer__slot">
                  <article class="printed-photo" hidden>
                    <div class="printed-photo__image">Test Photo</div>
                  </article>
                </div>
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
        status.textContent = 'Invitation revealed.';
      });
    },
  };
}
