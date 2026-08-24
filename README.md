# Grace Fellowship Church — App Prototype

A mobile-first Progressive Web App (PWA) prototype built with React, TypeScript, Vite, and Tailwind CSS. No backend — all content comes from local mock data, structured to make a future backend swap painless.

## What's included

- **Home** — hero, live banner (when live), latest announcement, upcoming events, short videos, recent sermons, contact teaser
- **Events** — filterable list by category, event detail page
- **Watch** — sermons list + short vertical videos, sermon detail page with embedded player
- **Live** — live stream when active, otherwise next service time + last service replay
- **More** — about, service times, contact info & map link, socials, announcements
- Installable PWA: manifest, service worker, offline caching of the app shell, custom icons

## Running it locally

```bash
npm install
npm run dev
```

Open the printed local URL. To test PWA install behavior (Add to Home Screen, offline shell), run a production build instead, since the service worker behaves closest to real usage there:

```bash
npm run build
npm run preview
```

Open the preview URL on your phone (same Wi-Fi network, use the "Network" URL Vite prints) or in Chrome DevTools' device emulation, and look for the install prompt / "Add to Home Screen" option.

## Project structure

```
src/
  data/          Mock JSON content (events, sermons, shorts, live status, updates, church info)
  services/      Async functions that read the mock data — shaped like future API calls
  types/         Shared TypeScript interfaces
  components/    Shared UI (nav, cards, video modal, icons)
  pages/         One file per screen/route
```

## Swapping in a real backend later

Each function in `src/services/*.ts` currently reads from a local JSON file, but is already `async` and shaped like a real API call. When the backend is ready, you only need to change the *inside* of these functions — nothing in `pages/` or `components/` needs to change.

Example, in `src/services/events.ts`:

```ts
// Before (mock)
export async function getEvents(): Promise<EventItem[]> {
  return Promise.resolve(eventsData as EventItem[]);
}

// After (real API)
export async function getEvents(): Promise<EventItem[]> {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
}
```

## Design system

- **Colors**: Ink Navy `#1B2340`, Warm Gold `#C89B3C`, Warm Cream `#FAF7F1`, Deep Teal `#3F6659`, Soft Rose `#C97B84`
- **Type**: Fraunces (headings), Inter (body/UI)
- **Signature motif**: an arch shape (church doorway/window reference), used for the app icon and featured imagery frames

Tokens live in `src/index.css` under `@theme`.

## Known gaps in this prototype (by design — no backend yet)

- "I'm going" on event detail and any form submissions are non-functional placeholders
- Video content links to a placeholder YouTube embed — swap for real sermon/live URLs
- Live status is hardcoded to "not live" in `src/data/live.json` — toggle `isLive: true` to preview the live state
- Church address/contact/service times are fictional sample data — replace in `src/data/churchInfo.json`
