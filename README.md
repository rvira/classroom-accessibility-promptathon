# Classroom Accessibility — Prompt-a-thon

Signal is a React + TypeScript + Vite classroom-accessibility prototype. The current working direction is Now-First Design: a synthetic Math 2B activity with an inline, prewritten catch-up recap. It is not live AI or a validated accessibility product.

See [UI reconciliation](research/ui-reconciliation.md) for the chosen design direction, superseded alternatives and implementation scope.

## Run locally

```sh
cd app
npm install
npm run dev
```

Run `npm run build` inside `app` to check the production build. See `brief.md` for the project workflow and `AGENTS.md` for collaboration guidelines.

## UI and presentation reference

Use the [Signal UI and slide standard](research/ui-standard.md) and [visual reference](design-system/reference.html) when designing screens or slides. Shared values live in [design-system/tokens.json](design-system/tokens.json). See the [competitor review](research/ui-competitor-review.md) for evidence and limits.
