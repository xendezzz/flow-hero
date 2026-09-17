# Flow — full site

The complete existing Flow page, restyled with the white, charcoal and spectral pink/yellow Figma theme.

`src/original.js` and `src/original.css` retain the supplied live site's compiled React/Motion implementation and all section content. `src/hero.js` adds the headline reveal; `src/theme.css` contains the new responsive theme. `build.mjs` applies those isolated changes to produce the static site in `dist`.

Run `npm run build` then `npm start` to preview at http://localhost:4173.

The hero plays once on entry: text opens, the color circle stretches into a pill, and the reference thumbnail fades in. Replay and reduced-motion controls remain available. The thumbnail is an image from the supplied screen recording, not a playable video asset.

The original scroll-driven dictation story, mobile timed demonstration, app-card animations, key interactions, FAQ, navigation and external CTA destinations are preserved.
