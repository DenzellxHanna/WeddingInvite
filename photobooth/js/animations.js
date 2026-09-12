/** Keeps booth state changes separate from the eventual motion implementation. */
export function setBoothState(root, state) {
  root.dataset.state = state;
}
