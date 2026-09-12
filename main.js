import { createPhotobooth } from './photobooth/js/photobooth.js';

/**
 * Application entry point. Album initialization is intentionally deferred until
 * its development stage; this stage mounts the photobooth landing experience.
 */
function startInvitation() {
  const photoboothRoot = document.querySelector('#photobooth-root');
  const photobooth = createPhotobooth(photoboothRoot);
  photobooth.mount();
}

startInvitation();
