# Denzell & Hanna — Wedding Invitation

A static, interactive wedding invitation built around a photobooth-to-album experience.

## Development

Open `index.html` through a local static server. The project uses browser-native ES modules and has no build step.

See [docs/architecture.md](docs/architecture.md) for module ownership and [docs/animation-flow.md](docs/animation-flow.md) for the planned experience.

## Branches and deployment

`main` is the stable production branch. Development belongs on `feature/*` branches and reaches `main` through a pull request and CI validation. Cloudflare Pages will deploy `main` to production and provide preview deployments for feature branches; GitHub Actions does not deploy the site.
