# Design

## Context

See `proposal.md` for motivation and `specs/seat-management-web/spec.md` for the browser behavior contract. The project already uses Vite, Tailwind CSS 4, and Vitest. `src/seatManager.ts` owns the immutable 8-by-10 matrix and pure reservation, count, and adjacent-pair operations; `src/interactiveReservations.ts` is a Node readline flow. `index.html` currently loads the starter `src/main.ts`, and `src/style.css` imports Tailwind.

## Goals / Non-Goals

**Goals:**
- Add a browser workflow that uses existing seat-domain functions and does not couple browser APIs to the console flow.
- Keep matrix state authoritative; derive counts, room status, and temporary pair highlighting from it.
- Retain successful reservations across reloads within the current browser session and recover safely from invalid stored data.
- Make the map, controls, message output, and status usable on narrow screens.

**Non-Goals:**
- Change seat rules, matrix dimensions, or console behavior.
- Add a frontend framework, backend, account system, cross-user synchronization, VIP categories, or pricing.
- Store data beyond the browser session.

## Decisions

- **Use a dedicated web entry point.** Replace the starter page content and load a browser-specific entry module rather than importing `interactiveMain.ts`, which depends on Node process and readline APIs. Keep `npm run console:interactive` mapped to its existing module. This avoids mixing browser and terminal side effects; sharing the console controller would require replacing its input/output boundary.
- **Reuse the matrix and pure domain operations.** The web controller calls `createEmptySeatMatrix`, `reserveSeat`, `countSeats`, and `findFirstAdjacentAvailableSeats`. It derives the four display states from counts and pair availability rather than duplicating reservation rules or modifying the matrix for visual highlighting.
- **Keep the adjacent-pair highlight transient.** Store highlighted coordinates as view state separate from the matrix. Clear the old highlight before processing every seat click or search; a successful search may then set a new pair. Render seat color from the highlight first and otherwise from the matrix.
- **Use `sessionStorage` as the only persistence boundary.** Serialize the matrix under a namespaced key after successful reservations, restore it at startup, and accept restored data only if it has 8 rows, 10 columns per row, and values of `0` or `1`. Missing or invalid data starts with an empty matrix. `sessionStorage` provides reload continuity for the current tab session without a server or cross-user synchronization.
- **Use native DOM controls and responsive CSS.** Render each seat as a labeled button so it works with keyboard and assistive technology, and use CSS Grid to retain the 8-by-10 layout while fitting narrow viewports. Keep message history/output and the live count/status as separate semantic regions. Extend the existing Tailwind entry stylesheet with the required visual states instead of introducing another UI framework.
- **Test state and integration at the existing Vitest boundary.** Cover status derivation, successful and rejected reservation messages, pair ordering/highlight clearing, and session restore/save behavior with the existing test setup. Verify the production build and exercise the responsive page in a browser; do not add an end-to-end framework solely for this change.

## Risks / Trade-offs

- **Session storage can be unavailable or contain malformed data** → Guard parsing and shape validation; fall back to an empty matrix without changing domain behavior.
- **A visual highlight can become stale after an action** → Clear it at the start of every seat click and search, then render seat occupancy from the matrix.
- **Ten columns can become cramped on phones** → Use a constrained responsive grid and verify the smallest target viewport; preserve all seats without overlap.
- **UI state rules could drift from the domain** → Derive status and counts using existing domain functions and test the no-adjacent-pair case explicitly.

## Migration Plan

Replace the starter markup and script reference with the web entry, then add the web controller, session-state handling, and responsive styles while leaving the console entry and script intact. Validate with unit tests, typecheck, and production build. Roll back by restoring the starter page and removing the web-only modules/styles; no data migration is required because session data is tab-scoped and temporary.