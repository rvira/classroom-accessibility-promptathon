# Contributing to Bullseye

Welcome! We are thrilled that you are interested in contributing to **Bullseye** — the real-time classroom accessibility layer designed for students with ADHD, sensory fatigue, working-memory constraints, and diverse cognitive processing styles.

Whether you are fixing a bug, adding new classroom integrations, improving accessibility semantics, or refining documentation, your contributions help ensure that no student gets permanently disoriented during fast-paced university lectures.

---

## 🧭 Project Vision & Core Principles

Bullseye is not just another note-taking app or classroom dashboard. It is an assistive cognitive buffer rooted in three non-negotiable core principles:

1. **Now-First Architecture:**  
   When an attention lapse occurs, a student should not face a wall of 50 slides or chaotic chat threads. The system elevates **exactly one immediate forward action**, anchors prior context, and keeps invariant academic constraints visible.
2. **Zero Stigma (Dignity by Default):**  
   Accommodations must be built directly into the default experience. A student rejoining a lecture must never be forced into awkward disclosure ceremonies, separate "special" UI modes, or public requests for assistance.
3. **WCAG 2.2 AA Conformance:**  
   Every component must meet or exceed WCAG 2.2 AA standards:
   - Minimum **4.5:1 text contrast** for standard text and **3:1** for graphical elements / user interface boundaries.
   - Distinct, unclipped **3px focus rings** with 3:1 contrast against adjacent backgrounds.
   - Comprehensive keyboard navigability without mouse dependence.
   - Motion control: automatic compliance with `prefers-reduced-motion` and one-key sensory freezing (`c` key).
   - Clear semantic landmarks and ARIA status regions for screen readers.

---

## 🏗️ Repository Architecture

The repository is organized into distinct, modular subsystems:

```
classroom-accessibility-promptathon/
├── .github/                  # CI/CD workflows, issue/PR templates
├── app/                      # Frontend Single Page Application
│   ├── src/                  # React 19 + TypeScript source
│   │   ├── components/       # Accessible UI widgets, cards, modals
│   │   ├── assets/           # Media, fonts (Atkinson Hyperlegible), icons
│   │   ├── App.tsx           # Main application shell & horizon coordinator
│   │   └── App.css           # Token-driven accessibility layout rules
│   ├── public/               # Static assets & web manifest
│   ├── vite.config.ts        # Vite build configuration
│   └── package.json          # Frontend dependencies & scripts
├── server/                   # Backend API & Classroom Sync Service
│   ├── src/                  # Node.js + Express + TypeScript source
│   │   ├── routes/           # Canvas LMS, EdStem Q&A, Session sync
│   │   └── index.ts          # Server entry point & health check
│   ├── tsconfig.json         # TypeScript server configuration
│   └── package.json          # Backend dependencies & scripts
├── design-system/            # Accessibility token pipeline
│   ├── tokens.json           # Canonical source of color, type & spacing tokens
│   ├── tokens.css            # Generated CSS custom properties
│   ├── build_tokens.py       # Deterministic WCAG contrast verification & build script
│   └── contrast-report.md    # Automated contrast ratio verification report
├── research/                 # Classroom barriers research & UI standards
├── Dockerfile                # Multi-stage container build
├── docker-compose.yml        # Orchestration for fullstack local development
└── LICENSE                   # MIT License
```

---

## 💻 Local Development Environment Setup

### Prerequisites

Ensure you have the following installed locally:
- **Node.js**: v18.0.0 or higher (v20+ recommended, v26 supported)
- **npm**: v9.0.0 or higher
- **Python 3**: For validating design system tokens (`python3`)
- **Docker & Docker Compose** *(Optional, for containerized development)*: Docker v24+

### Quick Start with Docker (Recommended)

To spin up both the frontend client and backend server with a single command:

```bash
# Clone the repository
git clone https://github.com/jgundara07-afk/classroom-accessibility-promptathon.git
cd classroom-accessibility-promptathon

# Copy sample environment variables
cp .env.example .env
cp server/.env.example server/.env

# Start containerized services
docker compose up --build
```

- **Frontend Client:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **API Health Check:** http://localhost:4000/api/health

### Manual Development Setup

If you prefer developing directly on your host machine:

#### 1. Setup Frontend (`app/`)

```bash
cd app
npm install
npm run dev
```
The Vite development server will start at `http://localhost:5173`.

#### 2. Setup Backend Server (`server/`)

Open a new terminal window:

```bash
cd server
npm install
npm run dev
```
The backend API server will listen on `http://localhost:4000`.

#### 3. Verify Design Tokens & Contrast

```bash
python3 design-system/build_tokens.py
```
This regenerates `design-system/tokens.css` and verifies that all semantic token pairings meet WCAG 2.2 AA contrast thresholds.

---

## 🎨 Coding Standards & Conventions

### 1. TypeScript Strictness
- Write idiomatic TypeScript with strict type checking enabled.
- Avoid using `any`; prefer well-defined union types, generic interfaces, or `unknown` with runtime type narrowing.
- Ensure all components define explicit props interfaces.

### 2. Accessibility & Semantic HTML
- Never use generic `<div>` or `<span>` elements when a native HTML element (`<main>`, `<article>`, `<section>`, `<nav>`, `<button>`, `<details>`, `<summary>`) is appropriate.
- Every interactive element must be keyboard reachable (`Tab`, `Enter`, `Space`, `Escape`).
- Never suppress visible focus rings without supplying an accessible replacement. Use the design token focus style (`--signal-focus`).
- All dynamic status messages (e.g., flash notices, timer triggers, chat arrival) must announce through appropriate `aria-live` or `role="status"` regions without stealing user keyboard focus.

### 3. Styling & Design Tokens
- Do not introduce arbitrary hardcoded hex codes. All colors must reference CSS variables defined in `design-system/tokens.css` (e.g., `var(--signal-action)`, `var(--signal-canvas)`).
- Ensure layouts maintain readable line lengths (maximum 65–75 characters; see `--signal-reading-max`).
- Honor the Atkinson Hyperlegible typeface standard to ensure ambiguous characters (e.g., `1`, `l`, `I`, `0`, `O`) are distinct.

### 4. Linting & Formatting
Before committing your code, run the project linters and typecheckers:

```bash
# Frontend lint & build
npm --prefix app run lint
npm --prefix app run build

# Backend lint & build
npm --prefix server run lint
npm --prefix server run build

# WCAG design token test
python3 design-system/build_tokens.py
```

---

## 🌿 Git Branching Strategy & Commit Conventions

### Branch Naming Strategy

We follow a structured branch naming model:
- `feature/<short-description>`: New functionality or user-facing capability (e.g., `feature/canvas-lms-oauth`)
- `fix/<short-description>`: Bug fixes or accessibility defects (e.g., `fix/focus-ring-contrast`)
- `a11y/<short-description>`: Accessibility-specific enhancements or audits (e.g., `a11y/screen-reader-landmarks`)
- `docs/<short-description>`: Documentation additions or updates (e.g., `docs/quickstart-guide`)
- `refactor/<short-description>`: Code structure improvements without functional change

### Conventional Commits

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <short summary>

[optional body describing the motivation and context]

[optional footer(s) referencing issue numbers]
```

#### Allowed Types:
- `feat`: A new feature or user-facing functionality
- `fix`: A bug fix or patch
- `docs`: Documentation changes only
- `style`: Changes that do not affect the meaning of the code (whitespace, formatting)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Maintenance tasks, dependency updates, CI/CD configuration

#### Examples:
```bash
git commit -m "feat(lms): add real-time Canvas countdown sync"
git commit -m "fix(a11y): restore 3px focus indicator on join modal"
git commit -m "docs(readme): add docker compose quickstart instructions"
```

---

## 🚀 Pull Request & Code Review Process

1. **Fork & Branch:** Create your working branch from the latest `main` branch.
2. **Keep PRs Atomic:** Limit each pull request to a single logical concern or feature.
3. **Verify Locally:** Ensure all automated checks pass locally before opening the PR:
   - `npm --prefix app run lint`
   - `npm --prefix app run build`
   - `npm --prefix server run lint`
   - `npm --prefix server run build`
   - `python3 design-system/build_tokens.py`
4. **Fill out the Pull Request Template:** Provide clear context, screenshots/videos (especially for UI changes), testing instructions, and verify the accessibility checklist.
5. **Continuous Integration (CI):** All automated GitHub Actions CI jobs must pass.
6. **Code Review:** Maintainers will review your PR. Address review feedback constructively. Once approved by at least one core maintainer, your PR will be squash-merged into `main`.

---

## 💬 Community & Questions

- **Issues:** If you find a bug or have a feature idea, search existing issues first. If none exists, file a new issue using our issue templates.
- **Discussions:** For architectural discussions and questions, join our GitHub Discussions board.

Thank you for contributing to an accessible, stigma-free learning future for every student!
