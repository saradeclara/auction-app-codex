# AGENTS.md

## Project overview

Meridian Auctions is a small React and TypeScript auction marketplace prototype built with Vite. It has two route shapes:

- `/` — auction listings homepage
- `/auction/:id` — single-auction detail page

Routing uses React Router with browser-history URLs.

## Repository structure

- `src/main.tsx` — application components, sample auction data, React Router routes, theme state, and interactions
- `src/styles.css` — base layout and responsive styling
- `src/theme.css` — Ivory, Sage, and Midnight theme overrides
- `index.html` — Vite entry document
- `tsconfig.json` — strict TypeScript configuration
- `dist/` — generated production build; do not edit manually

## Development commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

Before handing off code changes, run both:

```bash
npm run typecheck
npm run build
```

There is currently no automated test framework or lint script.

## Implementation conventions

- Use React function components and TypeScript with strict typing.
- Prefer explicit interfaces or union types for shared domain data and component props.
- Keep the dependency footprint small; do not add a state library unless the change genuinely requires one.
- Preserve React Router navigation using `BrowserRouter`, `Routes`, `Route`, `Link`, and `Navigate`.
- Add new sample listings to the typed `auctions` array in `src/main.tsx`.
- Format displayed prices through `formatMoney` rather than inline formatting.
- Use semantic HTML and accessible labels for interactive controls.
- Maintain the current responsive behavior at the `800px` and `460px` breakpoints.

## Themes

The supported theme identifiers are `ivory`, `sage`, and `midnight`.

- Theme selection is stored under `meridian-theme` in `localStorage`.
- The active value is applied to `document.documentElement.dataset.theme`.
- Base visual rules belong in `styles.css`; theme-specific overrides belong in `theme.css`.
- When adding a new UI surface, verify it remains readable in all three themes.

## Navigation and interaction checks

For UI changes, manually verify:

1. The homepage renders all sample auctions.
2. Clicking an auction updates the browser path and renders the correct detail page without a reload.
3. The logo, “Browse auctions,” and breadcrumb links return to the homepage.
4. Category filters, search, sorting, saved-item buttons, and the bid interaction still work.
5. The selected theme survives navigation and refresh.
6. Desktop and mobile layouts remain usable.

## Scope and generated files

- Do not edit `node_modules/` or `dist/` directly.
- Do not commit credentials, environment secrets, or machine-specific configuration.
- Keep changes focused on the requested feature and preserve unrelated user edits.
