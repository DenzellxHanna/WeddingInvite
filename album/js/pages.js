/**
 * The canonical content map for the album. Rendering and page-turn mechanics
 * consume this data later; content does not live inside the animation engine.
 */
export const albumStructure = Object.freeze({
  cover: Object.freeze({
    type: 'cover',
    title: 'D/H WEDDING',
  }),
  spreads: Object.freeze([
    Object.freeze({
      id: 'invitation',
      left: Object.freeze({
        title: 'THE INVITATION',
        content: 'printed-photograph',
      }),
      right: Object.freeze({
        title: 'MAIN INVITATION',
        content: 'invitation-details',
      }),
    }),
    Object.freeze({
      id: 'navigation',
      left: Object.freeze({ title: 'NAVIGATION' }),
      right: Object.freeze({
        title: 'NAVIGATION MENU',
        content: 'album-navigation',
      }),
    }),
    Object.freeze({
      id: 'details',
      left: Object.freeze({ title: 'DETAILS' }),
      right: Object.freeze({
        title: 'WEDDING DETAILS',
        content: 'event-details',
      }),
    }),
    Object.freeze({
      id: 'dress-code',
      left: Object.freeze({ title: 'DRESS CODE' }),
      right: Object.freeze({
        title: 'DRESS CODE CONTENT',
        content: 'dress-code-details',
      }),
    }),
    Object.freeze({
      id: 'rsvp',
      left: Object.freeze({ title: 'RSVP' }),
      right: Object.freeze({ title: 'RSVP FORM', content: 'rsvp-form' }),
    }),
  ]),
});

export function createPages() {
  return albumStructure;
}
