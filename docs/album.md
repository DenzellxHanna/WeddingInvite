# Album

The album owns its cover, spine, pages, wedding content, local navigation, and page-turn interactions. It accepts a photo payload from the application layer but does not know how that photo was printed.

The album begins as a **closed cover**, then contains exactly six spreads. Every spread has a left title page and a right content page. There is no story, relationship timeline, proposal section, material-gift registry, or additional album page.

| Stage | Left page | Right page |
| --- | --- | --- |
| Cover | `D/H WEDDING` | — |
| Spread 1 | `THE INVITATION` with the same physical print produced by the photobooth | `MAIN INVITATION` |
| Spread 2 | `NAVIGATION` | `NAVIGATION MENU` |
| Spread 3 | `DETAILS` | `WEDDING DETAILS` |
| Spread 4 | `DRESS CODE` | `DRESS CODE CONTENT` |
| Spread 5 | `GIFTS` | Minimal monetary-gift message |
| Spread 6 | `RSVP` | `RSVP FORM` |

`album/js/pages.js` is the canonical content map. The future renderer, navigation, and page-turn engine must read it rather than hard-code individual spreads.

The printed photograph is a portable object received through `receivePhoto(photo)`. On spread 1 it will be rendered as a physical print with an ivory border, paper depth, shadow, and a subtle natural rotation—not as an ordinary page image.

The final RSVP storage solution is intentionally undecided. No API keys, credentials, or private guest data belong in this static frontend.

## Gifts direction

Spread 5 is an elegant, restrained gifts page. Its right page will explain that material gifts are not necessary and monetary gifts are sincerely appreciated. It is not a material-gift registry. Payment details and a QR code are intentionally deferred until they are supplied and the album implementation reaches this stage.
