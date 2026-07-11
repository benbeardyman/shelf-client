# shelf-client

React frontend for Shelf — a personal library tracker for books and films. Built with Vite and TypeScript.

This is a single-page application. In development it runs its own dev server and proxies API requests to `shelf-api`. In production it is built to static files and served directly by the API.

## Requirements

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
```

## Running locally

Start `shelf-api` first (see its README), then:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

API requests to `/api/*` are proxied to `http://localhost:8000` automatically during development. No CORS or environment configuration is needed.

## Building for production

```bash
npm run build
```

Output is written to `dist/`. This directory is served by `shelf-api` in production — no separate web server is required.

## Project structure

```
shelf-client/
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root component — tab navigation and top-level state
│   ├── App.css                   # Global styles
│   ├── api.ts                    # Typed fetch wrapper for all API calls
│   ├── types.ts                  # TypeScript interfaces — Book, Film
│   └── components/
│       ├── AddBookForm.tsx        # Controlled form for adding a book
│       ├── AddFilmForm.tsx        # Controlled form for adding a film
│       ├── BookList.tsx           # Renders the list of books
│       └── FilmList.tsx          # Renders the list of films
├── public/
├── vite.config.ts                # Vite config — includes /api proxy for dev
├── tsconfig.json
└── package.json
```

## API proxy

During development, Vite proxies all requests matching `/api/*` to `http://localhost:8000`. This is configured in `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
},
```

No environment variables or `.env` files are needed for local development.

## Tech stack

| Package | Purpose |
|---------|---------|
| react | UI framework |
| typescript | Type safety |
| vite | Dev server and build tool |

No UI component library or state management library is used at this stage — the app is intentionally minimal.

## Deployment

The client is built on your development machine and transferred to the Pi as static files. This means the Pi never needs Node.js installed.

From the monorepo root:

```bash
./deploy.sh
```

This builds the client, then rsync's the `dist/` output to the Pi alongside the API code.
