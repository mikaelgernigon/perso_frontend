<!-- Copilot / AI agent guidance for the perso_frontend repository -->
# Copilot Instructions — perso_frontend

Purpose: give AI coding agents the minimal, concrete context they need to be productive in this Angular frontend repository.

- **Big picture:** This is an Angular (v20) single-page application that serves as a frontend for a backend API. Routing is defined in `src/app/app.routes.ts`. The app is bootstrapped using `src/app/app.config.ts` which wires up providers such as PrimeNG, HTTP interceptors and Keycloak.

- **Auth & API integration:** Authentication uses `keycloak-angular`. Keycloak configuration and provider are in `src/app/keycloak.config.ts` (realm, url, clientId). The app uses `includeBearerTokenInterceptor` (see `app.config.ts`) to send bearer tokens to API endpoints; the token-interceptor config is tuned for localhost/backend patterns inside that file.

- **Where to find HTTP logic:** API methods and HTTP utilities live in `src/app/service/` (notably `api.service.ts`). When adding API calls, follow existing patterns (HttpClient injection, pipe/catchError handling). Keep errors formatted using existing `formatErrors` pattern.

- **Assets & runtime config:** Static runtime JSON configs are under `src/assets/config/` (e.g. `config.json`, `config.development.json`). The `angular.json` assets block copies `src/assets` into the build. When changing runtime values, prefer updating these JSON files rather than hardcoding values.

- **Dev / build commands:** Use the scripts in `package.json`:
  - `npm install` — install dependencies
  - `npm start` — runs `ng serve -o --host 0.0.0.0 --port 4200` (development server)
  - `npm run build` — production build (`ng build`)
  - `npm test` — runs Karma unit tests

- **Dev-server details to be aware of:** `angular.json` defines a `serve` configuration that references `proxy.config.json` and has `ssl: true` with certificate paths used in the original host deployment. Locally, you can run `npm start` (explicit flags override some angular.json defaults), or pass flags such as `--ssl false` if you don't have the certs.

- **Third-party libs to watch:** `keycloak-angular`, `primeng` / `primeicons`, `ngx-owl-carousel-o`, `@angular/material`, and a few legacy jQuery scripts are included via `angular.json` `scripts`. Be careful when editing global JS under `src/assets/js/` — those are loaded globally and can impact components.

- **Routing & patterns:** The `about` section uses named outlets and nested children (see `app.routes.ts` — `outlet:'about'`). When adding routes, keep the same structure and import components at the top of the file.

- **Styling conventions:** Global styles live in `src/assets/css/`. Some component CSS is injected explicitly via `angular.json` (profil and upload-image CSS). Follow existing CSS placement when adding styles — avoid putting large global styles directly into component files unless scoped.

- **Where to register DI providers:** `src/app/app.config.ts` uses the standalone `ApplicationConfig` approach and registers providers (PrimeNG, Http interceptors, Keycloak provider, custom services). When adding app-wide providers, add them here rather than scattering in `main.ts`.

- **Tests & CI:** Unit tests use Karma/Jasmine (`npm test`). There is a `Jenkinsfile` in the repo — CI may expect `ng build` and `ng test`. Keep testable units small and avoid hard dependency on Keycloak in unit tests; mock Keycloak providers where possible.

- **Common pitfalls for contributors:**
  - Don't assume local SSL certs exist — `angular.json` may reference server certs for hosted deployment.
  - `proxy.config.json` is used for API proxying in dev — check before changing backend host/ports.
  - Keycloak's interceptor config allows a localhost pattern — if adding new local-only endpoints, update `keycloak.config.ts` accordingly.

- **Examples (quick references):**
  - Routing: `src/app/app.routes.ts` (nested `about` routes)
  - Bootstrapping & providers: `src/app/app.config.ts`
  - Auth config: `src/app/keycloak.config.ts`
  - API helpers: `src/app/service/api.service.ts` and other files in `src/app/service/`
  - Runtime config files: `src/assets/config/config.json`, `src/assets/config/config.development.json`

If something here is unclear or you'd like additional detail (testing notes, commit rules, or examples of common PRs), tell me which area to expand and I'll iterate.
