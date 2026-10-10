# Hello World with Typescript

<!-- hide -->
> By [@ehiber](https://github.com/ehiber) and contributors at [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![twitter](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=twitter)](https://twitter.com/4geeksacademy)

*Estas instrucciones estan disponibles en [espanol](./README.es.md).*
<!-- endhide -->
Start coding a TypeScript/HTML/CSS website in 30 seconds by opening this template using 4Geeks' [One-Click Coding](https://s.4geeks.com/start?repo=https://github.com/4GeeksAcademy/typescript-hello) or locally on your computer.

## Before you begin

Install the packages by typing:

```bash
npm install
```

## How do I run my website to see live changes?

Type on the command line:

```bash
npm run start
```

Then open your local URL in the browser (usually `http://localhost:5173`).

## How do I run this in GitHub Codespaces?

Run the same development server:

```bash
npm run start
```

Vite is configured to listen on `0.0.0.0`, so Codespaces can detect and forward port `5173` automatically.

## How do I run only the TypeScript check?

Use this command to validate only TypeScript without starting Vite:

```bash
npm run typecheck
```

## How do I run `main.ts` from the terminal?

If you want to execute `./src/main.ts` directly and see `console.log` output in the terminal, run:

```bash
npm run console
```

This command is already wired to `./src/main.ts`.

## Where do I write my code?

It depends on the language:

- `./src/main.ts` for TypeScript logic.
- `./src/style.css` for styles (Tailwind CSS v4 is already imported).
- `./index.html` for the HTML shell.

You can add more files as needed, just make sure to import them from `main.ts`.

Note: if you can see the "Hello Rigo" card and the message "If you can see this, Tailwind is working.", Tailwind is configured correctly.

## Troubleshooting

### I don't see my changes...

Every time you change any file inside `./src`, the website refreshes automatically (hot reload).

If changes still don't appear, refresh clearing cache:

- Mac: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

## How do I include more images in my project?

Add them inside `./public` and reference them in HTML using `/your-image-name.ext`.

Example:

```html
<img src="/rigo-baby.jpg" alt="Rigo" />
```

## How do I include more TypeScript files?

Add files into `./src` and import them from `main.ts`.

Example:

```ts
import { myVar } from "./file2";
```

## How do I publish the website?

This boilerplate is compatible with Vercel in one step.

<!-- hide -->
## Contributors

This template was built as part of the [4Geeks Academy Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [ehiber](https://github.com/ehiber) and contributors. Find out more about our [AI Engineering Course](https://4geeksacademy.com/us/coding-bootcamps/ai-engineering), [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school's GitHub page](https://github.com/4geeksacademy/).
<!-- endhide -->
