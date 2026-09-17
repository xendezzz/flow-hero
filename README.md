# Flow — full site

The complete existing Flow page, restyled with the white, charcoal and spectral pink/yellow Figma theme.

`src/original.js` and `src/original.css` retain the supplied live site's compiled React/Motion implementation and all section content. `src/hero.js` adds the headline reveal; `src/theme.css` contains the new responsive theme. `build.mjs` applies those isolated changes to produce the static site in `dist`.

Run `npm run build` then `npm start` to preview at http://localhost:4173.

The hero plays once on entry: text opens, the color circle stretches into a pill, and the reference thumbnail fades in. Replay and reduced-motion controls remain available. The hero uses the supplied Flow video, encoded as a fast-start H.264/AAC MP4. Hover expands the player and attempts playback with audio; browsers that block audible autoplay fall back to muted playback with a sound toggle.

The original scroll-driven dictation story, mobile timed demonstration, app-card animations, key interactions, FAQ, navigation and external CTA destinations are preserved.
