export function supportsTouch() {
  return window.matchMedia('(pointer: coarse)').matches;
}
