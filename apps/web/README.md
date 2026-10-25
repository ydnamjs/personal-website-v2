
Readme · MD
# @site/web
 
The public-facing website for personal-website-v2. It is a single-page application built with **React**, **TypeScript**, and **Vite**, using **React Router** for navigation. **Zod** is installed for data validation and will be used once the content schemas are drafted.
 
This package lives at `apps/web` inside an npm-workspaces monorepo. Other apps and services (admin app, API, infrastructure) will be added alongside it later.
 
## Tech stack
 
| Tool | Role |
| --- | --- |
| React | Builds the UI out of components |
| TypeScript | Adds static types to JavaScript |
| Vite | Dev server and production bundler |
| React Router (`react-router-dom`) | Client-side routing between pages |
| Zod | Runtime data validation (not yet in use) |
| ESLint | Catches common code mistakes |
 
## Requirements
 
- Node.js 20.19+ or 22.12+ (developed on Node 24)
- npm 10+
## Getting started
 
Run all commands from the **repository root**, not from inside `apps/web`.
 
```bash
npm install     # install dependencies for every workspace
npm run dev     # start the dev server at http://localhost:5173
```
 
### Available scripts
 
The root `package.json` forwards these to this workspace:
 
| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reloading |
| `npm run build` | Type-checks the project, then creates a production build in `apps/web/dist` |
| `npm run lint` | Runs ESLint over the source |
 
Inside `apps/web` there is also `npm run preview`, which serves the production build locally so you can check it before deploying.
 
## Project structure
 
```
apps/web/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  eslint.config.js
  .gitignore
  public/
  src/
    main.tsx
    App.tsx
    index.css
    components/
      Layout.tsx
    pages/
      Home.tsx
      About.tsx
      Cooking.tsx
      Games.tsx
      Interviews.tsx
      NotFound.tsx
    data/
    schemas/
```
 
## What each file does
 
### Configuration files (`apps/web/`)
 
**`package.json`**
Declares the package name (`@site/web`), its scripts, and its dependencies. The `@site/` scope lets future workspaces (such as `@site/shared`) import each other by name.
 
**`index.html`**
The single HTML page the whole site runs on. It contains an empty `<div id="root"></div>` and a `<script type="module" src="/src/main.tsx">` tag. React fills the empty div in the browser. Vite treats this file as the entry point of the app.
 
**`vite.config.ts`**
Configuration for Vite. At the moment it only enables the React plugin, which handles JSX and fast refresh during development.
 
**`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`**
TypeScript compiler settings. `tsconfig.json` is a small file that references the other two. `tsconfig.app.json` applies to code in `src/` (the browser code), and `tsconfig.node.json` applies to tooling files like `vite.config.ts` that run in Node.
 
**`eslint.config.js`**
ESLint rules for TypeScript and React, including the rules of hooks.
 
**`.gitignore`**
Ignore rules specific to this app. The root `.gitignore` covers `node_modules`, `dist`, and `.env*`.
 
**`public/`**
Static files copied as-is to the site root (favicon, images that need a fixed URL, and so on).
 
### Source files (`apps/web/src/`)
 
**`main.tsx`: the entry point**
Finds the `#root` element from `index.html`, creates a React root there, and renders the app inside two wrappers:
 
- `StrictMode` adds extra development-time warnings to catch bugs early.
- `BrowserRouter` enables client-side routing for everything inside it.
It also imports `index.css`, which is how the global styles get bundled.
 
**`App.tsx`: the route table**
Maps URL paths to page components using React Router:
 
| Path | Page |
| --- | --- |
| `/` | `Home` |
| `/about` | `About` |
| `/cooking` | `Cooking` |
| `/games` | `Games` |
| `/interviews` | `Interviews` |
| anything else (`*`) | `NotFound` |
 
Every route is nested inside a parent `<Route element={<Layout />}>`, so all pages share the same layout.
 
**`components/Layout.tsx`: the shared page frame**
Renders the parts of the page that never change between routes:
 
- A **skip link** (`Skip to content`) that is hidden until a keyboard user tabs to it, letting them bypass the navigation.
- A `<header>` with a labeled `<nav>` containing one `NavLink` per page. `NavLink` knows whether it points at the current page, so it can be styled as active. The `end` prop on the Home link stops it from matching every URL.
- A `<main id="main">` containing `<Outlet />`, the placeholder where React Router renders the page that matches the current URL.
- A `<footer>` showing the current year. It also displays the site owner's name.
**`pages/*.tsx`: one component per route**
Each file exports a single component that renders the content of one page. Right now each is a placeholder that shows a heading. These will become the real pages (About content, cooking posts, and so on).
 
**`index.css`: global styles**
Minimal styling so the layout is readable: resets the body margin, sets a system font, lays the nav out as a row, constrains `main` to a readable width, and hides the skip link off-screen until it is focused. This will be replaced by design tokens and dark mode.
 
**`data/`**
Reserved for mock content (sample cooking posts, games, and interviews). Pages will read from here until the real API exists, then these calls will be swapped for network requests.
 
**`schemas/`**
Reserved for Zod schemas describing each content type. They start as living drafts that change as the UI shows what data is needed, and will later move into a shared package.
 
> Git does not track empty folders. Until `data/` and `schemas/` contain files, add an empty `.gitkeep` file to each so they appear on GitHub.
 
## How it works end to end
 
### In development
 
1. You run `npm run dev` from the root. npm forwards it to `apps/web` and starts the Vite dev server.
2. You open `http://localhost:5173`. The browser requests `/`, and Vite responds with `index.html`.
3. The HTML loads `/src/main.tsx` through its script tag. Vite compiles the TypeScript and JSX on the fly and serves it as a JavaScript module, along with everything it imports.
4. `main.tsx` mounts the React app into `<div id="root">` inside `BrowserRouter`.
5. `App.tsx` looks at the current URL and picks the matching route. Because every route sits inside the `Layout` route, `Layout` renders first, and the matching page renders inside its `<Outlet />`.
6. When you click a nav link, React Router intercepts the click, updates the URL using the browser's History API, and swaps the page component in the outlet. **The browser never requests a new HTML page**, so navigation feels instant and the header and footer stay mounted.
7. When you edit and save a file, Vite pushes the change to the browser and updates only the affected modules (hot module replacement), usually without losing state.
### In production
 
1. `npm run build` type-checks the code with TypeScript, then Vite bundles everything into static files in `apps/web/dist`: one HTML file plus minified, hashed JavaScript and CSS.
2. Those static files can be hosted anywhere. The plan for this project is S3 behind CloudFront.
3. Because this is a single-page app, the server must return `index.html` for any URL (such as `/cooking`) and let React Router handle the path. Without that, refreshing on a non-root URL returns a 404. On CloudFront this is configured with a custom error response that maps 404/403 to `/index.html`.