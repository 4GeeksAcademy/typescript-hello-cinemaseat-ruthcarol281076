# CinemaSeat | Cinema Seat Manager

<!-- hide -->
> By [@ehiber](https://github.com/ehiber) and contributors at [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![twitter](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=twitter)](https://twitter.com/4geeksacademy)

*Estas instrucciones estan disponibles en [espanol](./README.es.md).*
<!-- endhide -->
CinemaSeat is a web application for viewing and reserving seats in an 8-row, 10-seat-per-row cinema. It supports immediate reservations by clicking a free seat, finding the first available horizontal adjacent pair, and viewing live room counts and status. The original console workflows remain available.

## Requirements

- Node.js 20 or newer
- npm

## Installation

Clone or download the project, change to its directory, and install dependencies:


```bash
npm install
```

## Run the web application

Start the development server:

```bash
npm run start
```

Open `http://localhost:5173` in a browser. Vite refreshes the page as you save changes.

## Usage

- The map labels rows 1 through 8 and columns 1 through 10.
- Click a free seat to reserve it immediately. Clicking an occupied seat reports the rejection and leaves the matrix unchanged.
- Select **Find first pair** to locate the first free horizontal pair in one row. The seats are highlighted in orange; the temporary highlight is cleared by the next seat click or search.
- The status and message panels show seat locations, occupied and available counts, and one of four room states: empty, partially occupied, nearly full, or full. “Nearly full” means seats remain available but no adjacent pair exists.
- Reservations are stored in `sessionStorage` and survive reloads within the current tab session. They are not synchronized between users or saved to a server.

Free seats are dark gray, occupied seats are light gray with a watermark `X`, and the found pair is orange. The interface adapts the map and controls to mobile screens. VIP categories and pricing are out of scope.

## Run in GitHub Codespaces

Use the same development server:

```bash
npm run start
```

Vite listens on `0.0.0.0`, so Codespaces can detect and forward port `5173` automatically.

## Use CinemaSeat from the console

The web interface does not replace the console commands.

### Scenario demo

Show empty, partially occupied, nearly full, and full-room scenarios:

```bash
npm run console
```

### Interactive console

Start an interactive reservation session in the terminal:

```bash
npm run console:interactive
```

Enter a row from 1 to 8 and a seat from 1 to 10. Enter `status` to see the counts, `buscar2AsientosContiguos` to find the first available horizontal pair, or `salir` to end the session.

## Tests and build

Run the automated tests:

```bash
npm test -- --run
```

Type-check the project:

```bash
npm run typecheck
```

Build and preview the production version locally:

```bash
npm run build
npm run preview
```

## Main files

- `index.html` and `src/webMain.ts`: web page and application entry point.
- `src/webApp.ts`: map interactions and UI updates.
- `src/seatManager.ts`: seat matrix and domain operations shared by the web app and console.
- `src/webReservations.ts`: room status and session storage.
- `src/webSeatMap.ts`: seat rendering and accessible labels.
- `src/style.css`: dark theme and responsive styles; Tailwind CSS v4 is configured.

## Troubleshooting

### Changes do not appear

Changes in `src/` should appear automatically. If they do not, refresh while clearing the cache:

- macOS: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

<!-- hide -->
## Contributors

This project started from a template built as part of the [4Geeks Academy Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [ehiber](https://github.com/ehiber) and contributors. Find out more about our [AI Engineering Course](https://4geeksacademy.com/us/coding-bootcamps/ai-engineering), [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school's GitHub page](https://github.com/4geeksacademy/).
<!-- endhide -->
