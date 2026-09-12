/** Keyboard, click, and touch navigation map to the same page index. */
export function createPageNavigator() {
  let page = 0;
  return {
    current: () => page,
    goTo: (index) => { page = Math.max(0, index); },
  };
}
