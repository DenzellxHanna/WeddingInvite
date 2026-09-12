/** Creates the portable photo payload passed to the application-layer transition. */
export function createPhoto() {
  return { id: crypto.randomUUID?.() ?? `photo-${Date.now()}` };
}
