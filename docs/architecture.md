# Architecture

This is a static HTML, CSS, and vanilla JavaScript application. It has three systems: `photobooth`, `album`, and `shared`. `shared` is the lowest-level dependency and contains only code or styles needed by both feature systems.

```text
                 main.js
                /       \\
               v         v
        photobooth      album
             ^             ^
             \\──── shared ──/
```

## Module boundaries

- `photobooth` owns the machine, start button, printer slot, printed photo, and photobooth-local motion. It does not open or import the album.
- `album` owns the closed cover, pages, content structure, navigation, and album-local interactions. It does not import photobooth internals.
- `shared` owns identity tokens, fonts, reset, responsive utilities, audio management, asset preloading, and general utilities. It does not own feature behavior.
- `main.js` initializes both public interfaces and owns the high-level photobooth-to-album handoff.

## Public interfaces

- `createPhotobooth(root, { onPrintComplete })` eventually emits a completed printed-photo payload once the print has fully exited the real printer slot.
- `createAlbum(root)` exposes `receivePhoto(photo)` and `open()`; album content is defined in `album/js/pages.js`.
- `main.js` decides when roots are shown, sends the photo payload to the album, and asks the album to open. This avoids circular dependencies.

Assets, CSS, and feature-specific scripts remain within their respective folders. Shared CSS establishes identity tokens, reset, typography, and responsive foundations only.

## GitHub branch strategy

- `main` is the stable, production-ready branch.
- Development work belongs on focused `feature/*` branches, such as `feature/album`, `feature/photobooth`, `feature/page-animation`, or `feature/rsvp`.
- An approved feature branch goes through a pull request and CI validation before merging into `main`.
- Development and production use one repository; no separate repositories are required.

## Cloudflare Pages strategy

Cloudflare Pages is responsible for deployment. It will deploy `main` as the production website and can provide preview deployments for `feature/*` branches. GitHub Actions performs validation only and must not be expanded into a custom deployment workflow unless deployment needs change explicitly.
