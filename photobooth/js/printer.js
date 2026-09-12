/** Printer timing and physical output mechanics belong in this module. */
export function createPrinter() {
  return {
    print(photo, onComplete) {
      // Intentionally no simulated print animation in the architecture scaffold.
      // The final implementation invokes onComplete after the photo fully exits.
      void photo;
      void onComplete;
    },
  };
}
