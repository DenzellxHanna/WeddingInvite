import { revealPhoto } from './animations.js';

/** Play a short, tactile mechanical push-button sound. */
function playButtonPressSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const now = context.currentTime;

  const click = context.createOscillator();
  const clickGain = context.createGain();
  click.type = 'square';
  click.frequency.setValueAtTime(220, now);
  click.frequency.exponentialRampToValueAtTime(85, now + 0.045);
  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.exponentialRampToValueAtTime(0.28, now + 0.003);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
  click.connect(clickGain).connect(context.destination);
  click.start(now);
  click.stop(now + 0.07);

  const snap = context.createBufferSource();
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.025), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (context.sampleRate * 0.004));
  }
  snap.buffer = buffer;
  const snapGain = context.createGain();
  snapGain.gain.value = 0.12;
  snap.connect(snapGain).connect(context.destination);
  snap.start(now);

  window.setTimeout(() => context.close(), 120);
}

/** Public entry point for the photobooth landing interaction. */
export function createPhotobooth(root) {
  return {
    mount() {
      root.dataset.system = 'photobooth';
      root.dataset.state = 'idle';
      root.innerHTML = `
        <div class="photobooth-stage scene-camera">
          <div class="booth-scene" aria-label="Wedding invitation reveal">
            <img
              class="booth-scene__background"
              src="./photobooth/assets/images/booth/background.png"
              alt=""
              aria-hidden="true"
            />

            <section class="booth" aria-labelledby="couple-name">
              <img
                class="booth__artwork"
                src="./photobooth/assets/images/booth/photobooth-without background.png"
                alt="Elegant burgundy and navy wedding invitation reveal box"
              />

              <button
                class="booth__start"
                type="button"
                aria-label="Press to reveal the wedding invitation"
              ></button>

              <div class="booth__photo-mask" aria-hidden="true">
                <div class="revealed-photo" hidden>
                  <div class="revealed-photo__image">PHOTO PLACEHOLDER</div>
                  <div class="revealed-photo__caption">PLACEHOLDER</div>
                </div>
              </div>
            </section>
          </div>
          <h1 id="couple-name" class="booth__sr-only">Denzell &amp; Hanna</h1>
          <p class="photobooth-status" aria-live="polite"></p>
        </div>
      `;

      const startButton = root.querySelector('.booth__start');
      const photo = root.querySelector('.revealed-photo');
      const status = root.querySelector('.photobooth-status');

      startButton.addEventListener('click', () => {
        if (root.dataset.state !== 'idle') return;

        startButton.classList.add('is-pressed');
        playButtonPressSound();
        status.textContent = 'Photo reveal started.';
        revealPhoto(root);

        window.setTimeout(() => {
          photo?.classList.add('is-settled');
        }, 1250);
      });
    },
  };
}
