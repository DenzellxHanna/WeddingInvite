import { setBoothState } from './animations.js';

/** Public entry point for the photobooth system. */
export function createPhotobooth(root) {
  return {
    mount() {
      root.dataset.system = 'photobooth';
      root.dataset.state = 'idle';
      root.innerHTML = `
        <div class="photobooth-stage">
          <section class="booth" aria-labelledby="couple-name">
            <div class="booth__crown" aria-hidden="true"></div>
            <div class="booth__frame">
              <header class="booth__display">
                <h1 id="couple-name">Denzell <span>&amp;</span> Hanna</h1>
                <div class="booth__display-line" aria-hidden="true"></div>
              </header>

              <div class="booth__controls">
                <button class="booth__start" type="button" aria-pressed="false">
                  <span>Press to Start</span>
                </button>
              </div>

              <div class="printer" aria-label="Photo printer">
                <div class="printer__housing">
                  <span class="printer__indicator" aria-hidden="true"></span>
                  <div class="printer__slot" aria-label="Photo output slot">
                    <span class="printer__slot-shadow" aria-hidden="true"></span>
                    <article class="printed-photo" aria-label="Test photo placeholder" hidden>
                      <div class="printed-photo__image">Test Photo</div>
                    </article>
                  </div>
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
        setBoothState(root, 'ready');
        startButton.setAttribute('aria-pressed', 'true');
        status.textContent = 'Photobooth ready.';
      });
    },
  };
}
