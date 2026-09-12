/** Centralized audio ownership prevents competing playback across systems. */
export function createAudioManager() {
  return { play() {}, stop() {} };
}
