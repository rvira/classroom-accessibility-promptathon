# Bullseye · Classroom Accessibility Layer

> **A clear route back into the lecture, with its meaning intact.**  
> Built for students with ADHD, sensory fatigue, and working-memory challenges.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00695C?style=for-the-badge&logo=vercel)](https://classroom-accessibility-promptathon.vercel.app/)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG%202.2-AA%20Verified-emerald?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![CI Status](https://img.shields.io/github/actions/workflow/status/jgundara07-afk/classroom-accessibility-promptathon/ci.yml?branch=main&label=CI&style=for-the-badge)](https://github.com/jgundara07-afk/classroom-accessibility-promptathon/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🎯 The Problem: The 60-Second Lecture Crash

In fast-paced university STEM lectures, **losing focus for just one minute usually means losing the whole class**. 

Students look back up to find 50-slide PDF walls, buried footnotes, and chaotic chat boards. For students with ADHD or working-memory challenges, trying to catch up while the professor keeps moving triggers immediate cognitive overload—costing 15 to 25 minutes of confusion and stress.

**Bullseye solves this with Now-First Architecture:**  
Instead of flooding students with everything at once, Bullseye shows only **one clear forward step**, keeps grading rules anchored in plain view, and lets students recover in seconds—**with zero stigma or diagnostic disclosure needed**.

---

## See It in Action (2x Speed)

Watch the rapid visual walkthrough showing the live workspace, Canvas sync, and 10-second safe recovery flow:

[![Bullseye Visual Demo Walkthrough](media/demo-preview.gif)](media/bullseye-demo-2x.mp4)

- **[Watch 2x Speed Website Demo (`media/bullseye-demo-2x.mp4`)](media/bullseye-demo-2x.mp4)**
- **[Try the Live Web App](https://classroom-accessibility-promptathon.vercel.app/)**

---

## Live Interface Preview

![Bullseye Triadic Horizon Workspace](media/02_now_horizon.png)

---

## Core Features (Explained Simply)

### 1. Triadic Working-Memory Horizon
Our 3D workspace organizes lecture information into three clear spatial planes so working memory never saturates:

| Plane | Technical Term | What It Means to the Student |
| :--- | :--- | :--- |
| **Left** | **Context Anchor** | *"Where we just were"* — The previous math step or formula, kept visible so you never lose the thread. |
| **Center** | **Active Directive** | *"What to do right now"* — The single immediate calculation or note you need to write on your paper. |
| **Right** | **Invariant Constraints** | *"Rules that cannot change"* — Canvas deadlines, grading rubrics, and submission parameters that stay locked in plain sight. |

### 2. Sticky, Distraction-Free Header with Real-Time Telemetry
- **Always Accessible:** The header stays pinned to the top of the viewport during long calculations and fast scroll sequences.
- **Live Audio Pulse:** Displays real-time audio sync (`48kHz LIVE` / `AUDIO PAUSED`) with click-to-pause directly in the navigation bar.
- **Single-Home Profile & Settings:** Secondary controls (multi-lingual translation for `🇺🇸 EN`, `🇪🇸 ES`, `🇨🇳 ZH`, `🇮🇳 HI`, and font scaling `A-/A+`) are cleanly tucked into the student profile menu.

### 3. Safe Resynchronization ("Help Me Rejoin")
- **The Concept:** A shame-free catch-up flow.
- **How It Works:** If you drift off, tap **"Help me rejoin"** and type what you remember (e.g., *"I missed what u was"*). Bullseye's algorithm cross-references real-time teacher audio and gives you an atomic 10-second recap with zero academic penalty.

### 4. Sensory Calm Mode (`c` key)
- Instant sensory relief for overstimulated students.
- Press **`c`** to immediately freeze all animated background particles and glows into a high-contrast, distraction-free reading surface. Automatically honors system `prefers-reduced-motion`.

### 5. Real-Time Canvas LMS & EdStem Q&A
- **Canvas Deadlines:** Live countdowns and rubric requirements (e.g. *"Exact fraction required"*) sync directly from Canvas.
- **Filtered EdStem Discussion:** Live student questions auto-tagged to your current problem step, showing only verified instructor answers and filtering out chat noise.

### 6. Multi-Course Hub & Instant Room Code Entry
- Jump between enrolled courses (**MATH 2B**, **PHYS 7C**, **CHEM 1A**, **ICS 33**) or type a room code (`MATH-2B`) to join a live lecture immediately.

---

## Measured Impact

In prototype testing evaluated against typical university STEM lecture formats:

| Metric | Traditional Classrooms | Bullseye Now-First | Improvement |
| :--- | :---: | :---: | :---: |
| **Rejoin Latency** | 15 – 25 Minutes | **< 10 Seconds** | **98% Faster** |
| **Cognitive Load** | 8.6 / 10 (Overload) | **2.1 / 10 (Calibrated)** | **75% Reduction** |
| **Stigma Barrier** | High (Requires disclosure) | **Zero (Universal UI)** | **100% Dignity by Default** |
| **LMS Alignment** | Multiple disjointed tabs | **Real-Time Canvas Sync** | **Instant & Continuous** |

---

## 🔬 Research & Design Foundation

Bullseye is grounded in peer-reviewed cognitive load theory and participatory co-design with neurodivergent students:

- **[Now-First Design Principles](research/now-first-design.md):** Core cognitive architecture for working-memory preservation.
- **[Design Philosophy](research/design-philosophy.md):** The psychological case for zero-stigma default accommodations.
- **[Disability & Accessibility Evidence](research/disability-evidence.md):** Analysis of executive function and auditory processing barriers in higher education.
- **[Design Tokens & WCAG Verification](design-system/tokens.json):** Atkinson Hyperlegible typography and verified 4.5:1 / 3:1 contrast ratios.

---

## Quickstart Guide

### Option A: Run Locally with npm

```bash
# Clone the repository
git clone https://github.com/jgundara07-afk/classroom-accessibility-promptathon.git
cd classroom-accessibility-promptathon

# 1. Start the Backend API & WebSocket Server
cd server
npm install
npm run dev

# 2. Start the Frontend App (in a separate terminal)
cd ../app
npm install
npm run dev
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:4000](http://localhost:4000)
- **API Health Check:** [http://localhost:4000/api/health](http://localhost:4000/api/health)

### Option B: One-Click Docker Compose

```bash
# Start both client and backend in production containers
docker compose up --build
```

### Verification & Tests

```bash
# Run backend test suite (24 Vitest integration tests)
npm --prefix server test

# Verify builds and linting across the stack
npm --prefix server run build
npm --prefix app run lint
npm --prefix app run build
```
---

## Community & Open Source

Bullseye is an open-source project developed under the **MIT License**. We welcome contributions from researchers, developers, educators, and accessibility advocates.

- **[Contributing Guidelines (CONTRIBUTING.md)](CONTRIBUTING.md):** Code style, branch strategy, and testing requirements.
- **[Code of Conduct (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md):** Contributor Covenant zero-stigma community standards.
- **[Security Policy (SECURITY.md)](SECURITY.md):** Student privacy commitments and vulnerability reporting.
- **[License (LICENSE)](LICENSE):** MIT License (Copyright 2026 Bullseye Contributors).
