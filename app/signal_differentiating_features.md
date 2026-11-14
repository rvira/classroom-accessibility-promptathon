# Signal · Differentiating Features

Status: Future product specification (2026-11-14), not implemented capabilities. The current UI is a synthetic Math 2B sample with a fixed recap; it has no teacher verification, adaptive AI or saved progress. See [UI reconciliation](../research/ui-reconciliation.md). Aligned with **Now-First Design** principles and the `design/now-first` visual direction.

**Core Value Proposition:** Help students rejoin an active classroom task without losing constraints, exceptions, or source context. Unlike general task splitters (Goblin Tools) or reading aids (Immersive Reader), Signal anchors every action to verified teacher instructions and surfaces classroom ambiguity rather than guessing.

---

## 1. Unresolved Ambiguity Flagging (Anti-Hallucination Guardrail)
* **What it does:** Detects vague or missing information in teacher instructions (e.g., *"upload to the usual place"*) and surfaces an explicit **`Clarify with instructor`** warning badge instead of inventing a destination, deadline, or rule.
* **Problem solved:** Prevents students with working-memory or executive-function barriers from stalling on hidden assumptions or following hallucinated AI directions.
* **Design rule:** Pair warning icon and explicit text (`Question: What is the "usual place"?`); never rely on color alone.

---

## 2. Constraint-Anchored "Why This Step?" Source Links
* **What it does:** Connects every generated step and **`What matters`** rule directly to the exact highlighted text span inside the collapsible **`Original teacher words`** disclosure.
* **Problem solved:** Eliminates black-box AI distrust. Students can verify hard constraints (e.g., *"no outside sources"*, *"cite two details from paragraphs 2–3"*) in one click without re-reading a dense wall of text.
* **Design rule:** Keep essential constraints visible on the primary card; use progressive disclosure (`Radix Accordion`) only for full source verification.

---

## 3. Zero-Friction "Help Me Rejoin" Context Card
* **What it does:** Provides a dedicated mid-activity recovery state (*"Welcome back. You were on Step 2 of 4"*) structured into three stable anchors:
  1. **`WHERE WE ARE`** — One-sentence orientation of current class context.
  2. **`DO THIS NEXT`** — One prominent, verb-led action.
  3. **`WHAT MATTERS`** — Hard constraints, deadlines, and exceptions.
* **Problem solved:** Allows students who zoned out, experienced sensory overload, or stepped away to re-enter the activity immediately without shame, countdown timers, or streak penalties.
* **Design rule:** Persist step progress locally in the browser and prompt the student to check **`All steps`** in case the class moved forward while they were away.

---

## 4. Inline Exception & Conditional Toggles
* **What it does:** Surfaces branching classroom rules as interactive state toggles directly on the active step (e.g., switching between **`Working in a pair`** and **`My partner is absent`**).
* **Problem solved:** Standard linear checklists flatten conditional logic. Toggling an exception dynamically updates downstream constraints (e.g., changing *"Submit 1 response per pair"* to *"Work alone; submit 1 individual response"*).
* **Design rule:** Keep conditional states explicit, reversible, and grounded in exact source exceptions.

---

## 5. Instructor "Pre-Flight" Verification & Diff View
* **What it does:** Displays a side-by-side audit screen for instructors after pasting activity text—comparing **Original Teacher Instructions** against the **Extracted Student Plan** and highlighting unresolved ambiguities before publishing.
* **Problem solved:** Solves the classroom adoption bottleneck by letting teachers verify in seconds that no requirements were omitted or distorted before students rely on the output.
* **Design rule:** Require explicit instructor confirmation or resolution of flagged ambiguities before marking a plan as verified.

---

## Feature Summary Matrix

| Feature | Target User | Core Differentiator vs. Existing Tools |
| :--- | :--- | :--- |
| **Unresolved Ambiguity Flagging** | Student | Surfaces missing classroom context instead of hallucinating answers |
| **Constraint-Anchored Source Links** | Student | Proves summary accuracy via exact highlighted teacher wording |
| **"Help Me Rejoin" Context Card** | Student | Neutral, low-load recovery flow without timers or gamification |
| **Inline Exception Toggles** | Student | Dynamically adapts rules for branching conditions (e.g., solo vs. pair) |
| **Instructor Pre-Flight View** | Educator | Side-by-side verification audit builds teacher trust before class use |