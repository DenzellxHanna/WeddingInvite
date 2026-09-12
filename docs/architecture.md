# Architecture

The experience is split into `photobooth`, `album`, and `shared` systems. `shared` is the lowest-level dependency and contains only utilities needed by both systems. Neither feature system imports the other's internals.

`main.js` is the application layer. It initializes both public module interfaces and owns the photobooth-to-album transition. This prevents a physical animation change from coupling the two systems.

## Public boundaries

- `createPhotobooth(root, { onPrintComplete })` owns the machine and emits a completed printed-photo payload.
- `createAlbum(root)` owns the album and accepts that payload through `receivePhoto(photo)`.
- `main.js` decides when roots are shown and coordinates the handoff.

Assets, CSS, and feature-specific scripts remain within their respective systems. Shared CSS establishes identity tokens, reset, typography, and responsive foundations only.
