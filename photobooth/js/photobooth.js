import { revealPhoto } from './animations.js';

/** Play a short camera/shutter-style sound without requiring an audio asset. */
function playRevealSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const now = context.currentTime;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  gain.connect(context.destination);

  const click = context.createOscillator();
  click.type = 'square';
  click.frequency.setValueAtTime(980, now);
  click.frequency.exponentialRampToValueAtTime(170, now + 0.055);
  click.connect(gain);
  click.start(now);
  click.stop(now + 0.06);

  const body = context.createOscillator();
  const bodyGain = context.createGain();
  body.type = 'triangle';
  body.frequency.setValueAtTime(120, now + 0.035);
  body.frequency.exponentialRampToValueAtTime(55, now + 0.16);
  bodyGain.gain.setValueAtTime(0.0001, now + 0.035);
  bodyGain.gain.exponentialRampToValueAtTime(0.12, now + 0.045);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  body.connect(bodyGain).connect(context.destination);
  body.start(now + 0.035);
  body.stop(now + 0.21);

  window.setTimeout(() => context.close(), 300);
}

/** Public entry point for the photobooth landing interaction. */
export function createPhotobooth(root) {
  return {
    mount() {
      root.dataset.system = 'photobooth';
      root.dataset.state = 'idle';
      root.innerHTML = `
        <div class="photobooth-stage scene-camera">
          <section class="booth" aria-labelledby="couple-name">
            <img
              class="booth__artwork"
              src="./photobooth/assets/images/booth/Denzell-Hanna-landing-page.png"
              alt="Elegant burgundy, navy and champagne wedding invitation display surrounded by flowers"
            />

            <button
              class="booth__start"
              type="button"
              aria-label="Press to reveal the wedding invitation"
            ></button>

            <div class="booth__photo-mask" aria-hidden="true">
              <div class="revealed-photo" hidden>
                <div class="revealed-photo__image">PHOTO</div>
                <div class="revealed-photo__caption">PLACEHOLDER</div>
              </div>
            </div>

            <h1 id="couple-name" class="booth__sr-only">Denzell &amp; Hanna</h1>
          </section>
          <p class="photobooth-status" aria-live="polite"></p>
        </div>
      `;

      const startButton = root.querySelector('.booth__start');
      const photo = root.querySelector('.revealed-photo');
      const status = root.querySelector('.photobooth-status');

      startButton.addEventListener('click', () => {
        if (root.dataset.state !== 'idle') return;

        startButton.classList.add('is-pressed');
        playRevealSound();
        status.textContent = 'Photo reveal started.';
        revealPhoto(root);

        window.setTimeout(() => {
          photo?.classList.add('is-settled');
        }, 1250);
      });
    },
  };
}
