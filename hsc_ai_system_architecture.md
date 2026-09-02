# Systems Architecture Specification: HSC AI Study Intelligence System
## End-to-End Computational Pipeline, Component Specifications, and Failure Engineering

**Author / Lead Engineer:** Farhan (Md Farhan Hossain)  
**Curriculum Domain:** Bangladesh National Curriculum & Textbook Board (NCTB) — HSC Science Stream  
**Core Technologies:** React 19, TypeScript 5, Node.js, KaTeX 0.16, Google Gemini 2.0 Flash, Capacitor 8  
**Document Classification:** Technical Architecture Whitepaper & Scholarship Portfolio Specification  

---

## 1. End-to-End System Pipeline

```
+----------------------------------------------------------------------------------------------------+
|                                      GLOBAL END-TO-END PIPELINE                                    |
|                                                                                                    |
|  [1. USER ACTION]                                                                                  |
|   • Student initiates diagnostic session, Socratic query, or submits handwritten solution.         |
|         │                                                                                          |
|         ▼                                                                                          |
|  [2. FRONTEND PRESENTATION LAYER] (React 19 + Tailwind CSS 4)                                      |
|   • Captures input events, optimistic UI state, and camera image streams.                          |
|         │                                                                                          |
|         ▼                                                                                          |
|  [3. APPLICATION LOGIC & STATE ORCHESTRATION] (Zustand Domain Stores)                             |
|   • Compiles current user mastery index, recent mistake telemetry, and active chapter target.     |
|         │                                                                                          |
|         ▼                                                                                          |
|  [4. KNOWLEDGE & QUESTION DATASTORE] (Relational In-Memory NCTB Graph)                             |
|   • Resolves `Subject → Paper → Chapter → Topic → Concept` relational node.                        |
|         │                                                                                          |
|         ▼                                                                                          |
|  [5. CONTEXT RETRIEVAL & PROMPT COMPILATION]                                                       |
|   • Injects authorized NCTB formulas, official board question patterns, and negative constraints.  |
|         │                                                                                          |
|         ▼                                                                                          |
|  [6. AI INFERENCE LAYER] (Google Gemini 2.0 Flash Cascade via `@google/genai`)                     |
|   • Non-deterministic token generation constrained by strict JSON schema contracts.                |
|         │                                                                                          |
|         ▼                                                                                          |
|  [7. STRUCTURED OUTPUT EXTRACTION]                                                                 |
|   • Parses raw model response tokens into typed TypeScript interfaces.                             |
|         │                                                                                          |
|         ▼                                                                                          |
|  [8. DETERMINISTIC VALIDATION & PREPROCESSING]                                                     |
|   • `mathPreprocessor.ts` repairs LaTeX delimiters; JSON Schema verifies parameter bounds.        |
|         │                                                                                          |
|         ▼                                                                                          |
|  [9. USER FEEDBACK & DYNAMIC VISUALIZATION]                                                        |
|   • KaTeX renders formulas; Recharts updates radar graphs; Socratic hints display progressively.   |
|         │                                                                                          |
|         ▼                                                                                          |
|  [10. MASTERY & MISTAKE STATE COMMIT]                                                              |
|   • Commits updated mastery scalar ($M$) and classified error tags to `MistakeVault` (Local/Sync). |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Granular Subsystem Architectural Specifications

---

### Component 1: Frontend Architecture

- **Responsibility:** Provides the reactive user interface, manages optimistic UI state transitions, renders mathematical equations at 60fps, and routes client views.
- **Input:** User tap/keyboard events, camera image uploads, streaming AI tokens, and LocalStorage cache data.
- **Processing:**
  - Component tree modularized into distinct workspaces: `StudyDashboard`, `ExamSimulator`, `AIStudyLab`, `CollegeHub`, and `MistakeVault`.
  - State managed across isolated Zustand slices (`useTaxonomyStore`, `useSessionStore`, `useMistakeVaultStore`) preventing global re-render cascades.
  - Mathematical strings parsed into localized KaTeX DOM fragments with error boundaries.
- **Output:** Rendered HTML5 Canvas, SVG visual charts (Recharts), KaTeX mathematical layouts, and JSON event dispatches.
- **Dependencies:** `React 19`, `TypeScript 5.8`, `Tailwind CSS 4`, `Framer Motion`, `Lucide Icons`, `KaTeX 0.16`, `Recharts 2`.
- **Failure Modes:**
  - *DOM Hydration/Render Crash:* Unhandled syntax errors in raw LaTeX formulas. *Mitigation:* Wrapped inside `MathRenderer.tsx` with try-catch fallback rendering raw text in red.
  - *Memory Leak on Extended Sprints:* Large SVG charts accumulating in DOM. *Mitigation:* Strict component unmounting and chart memoization.

---

### Component 2: Backend Architecture & Validation Service

- **Responsibility:** Provides stateless schema validation, proxy API key security, and offline verification scripts for synthesized content.
- **Input:** Incoming client HTTP/HTTPS requests with user payloads or offline CLI test runner invocations.
- **Processing:**
  - Validates client request payloads against JSON Schema specifications.
  - Proxies requests to third-party AI provider endpoints, injecting rate-limiting headers.
  - Runs offline validation test suites (`scripts/verify_solutions.ts`).
- **Output:** Validated JSON responses, sanitized mathematical objects, and HTTP status telemetry.
- **Dependencies:** `Node.js 20+`, `Express`, `TypeScript`, `Zod` / JSON Schema.
- **Failure Modes:**
  - *Network Timeout:* Cloud API latency exceeding client threshold. *Mitigation:* 8-second circuit breaker triggering secondary fallback model.
  - *CORS / Protocol Mismatch:* Blocked requests on native webview containers. *Mitigation:* Explicit CORS whitelist and Capacitor Android bridge scheme (`https://`).

---

### Component 3: AI Intelligence Layer & Provider Cascade

- **Responsibility:** Executes prompt-engineered inference for Socratic tutoring, rubric grading, question generation, and vision OCR.
- **Input:** Structured system prompts, few-shot exemplars, student response text, and base64 image strings.
- **Processing:**
  - Primary dispatch to Google Gemini 2.0 Flash API via `@google/genai`.
  - Enforces `responseSchema` parameters for strict JSON structured output.
  - If Gemini returns HTTP 429 (Rate Limit) or HTTP 503 (Overloaded), automatically cascades to secondary provider (Llama 3.3 70B / Gemini Lite via OpenRouter).
- **Output:** Structured JSON objects or streaming text tokens containing mixed Bengali prose and LaTeX formulas.
- **Dependencies:** `@google/genai` SDK, OpenRouter REST API, `src/lib/ai/provider.ts`.
- **Failure Modes:**
  - *API Token Depletion:* Out of credits or rate limit hit. *Mitigation:* Graceful degradation to pre-compiled offline question banks.
  - *Hallucinated Model Output:* Model generates non-JSON preamble. *Mitigation:* Regex JSON extractor isolates `{ ... }` blocks from raw response strings.

---

### Component 4: Knowledge Representation & Curriculum Taxonomy

- **Responsibility:** Maintains the formal relational graph of the NCTB HSC curriculum across all 14 Science papers.
- **Input:** Normalized subject codes (`physics`, `chemistry`, `higher_math`, `biology`, `ict`) and chapter numbers.
- **Processing:**
  - Traverses the 5-tier relational tree: $\text{Subject} \rightarrow \text{Paper} \rightarrow \text{Chapter} \rightarrow \text{Topic} \rightarrow \text{Concept}$.
  - Computes historical board exam frequency weighting ($F_{\text{board}}$) and maps learning outcomes (*শিখনফল*).
  - Calculates dynamic student mastery score:
    $$M = 0.5 \cdot C_{\text{accuracy}} + 0.2 \cdot T_{\text{completion}} + 0.3 \cdot (1.0 - E_{\text{error}})$$
- **Output:** Typed `ConceptNode` metadata objects with prerequisite links and board priority weights.
- **Dependencies:** `src/data/curriculumData.ts`, `src/types/curriculum.ts`.
- **Failure Modes:**
  - *Syllabus Version Drift:* Discrepancies between older 2018 syllabi and current 2024–2025 revised curriculum. *Mitigation:* Hardcoded explicit NCTB 2024 chapter revisions.

---

### Component 5: Retrieval-Augmented Generation (RAG) Pipeline

- **Responsibility:** Injects authorized textbook formulas, board question patterns, and NCTB marking boundaries into the LLM context window.
- **Input:** Student search query, active concept ID, or selected chapter node.
- **Processing:**
  - Classifies query to identify target subject paper and chapter.
  - Retrieves pre-indexed NCTB textbook definitions and approved formulas.
  - Injects negative constraints (e.g., *"Do not use university-level Hamiltonian mechanics; restrict exclusively to Newtonian mechanics per NCTB 1st Paper Ch-04"*).
- **Output:** Contextually grounded system prompt bundle.
- **Dependencies:** In-memory structured curriculum datastore, `src/services/ragService.ts`.
- **Failure Modes:**
  - *Context Boundary Leakage:* Cross-chapter collision on shared mathematical terms (e.g., "Momentum" in Vectors vs. Dynamics). *Mitigation:* Mandatory parent chapter ID scoping before retrieval.

---

### Component 6: Multi-Modal OCR & Vision Pipeline

- **Responsibility:** Extracts printed text, Bengali handwriting, and LaTeX mathematical expressions from camera image uploads.
- **Input:** Base64-encoded JPEG/PNG images from mobile camera or file picker.
- **Processing:**
  - Client-side image canvas resizing to a maximum bounding box of $1920 \times 1080$ to minimize bandwidth.
  - Dispatches multi-modal vision prompt to Gemini Vision API requesting structured extraction into separate `bengali_text` and `latex_equations` keys.
  - Routes raw LaTeX strings through `mathPreprocessor.ts` to normalize delimiters.
- **Output:** Clean, editable JSON payload containing transcribed text and compilable LaTeX formulas.
- **Dependencies:** HTML5 Canvas, Capacitor Camera Plugin, `@google/genai` Vision.
- **Failure Modes:**
  - *Low-Contrast Handwriting Degradation:* Faint pencil text misread or skipped. *Mitigation:* UI prompts student to adjust lighting or contrast if character confidence is low.

---

### Component 7: Dynamic Question Generation Pipeline

- **Responsibility:** Synthesizes syllabus-compliant, 10-mark Creative Questions (CQs) and Multiple Choice Questions (MCQs) on demand.
- **Input:** Target Subject, Chapter, Concept ID, and Difficulty Tier (`foundational` | `intermediate` | `advanced`).
- **Processing:**
  - Dispatches structured prompt requiring strict NCTB 4-part CQ schema:
    - Part (ক) [1 Mark]: Knowledge recall
    - Part (খ) [2 Marks]: Conceptual explanation
    - Part (গ) [3 Marks]: Mathematical application
    - Part (ঘ) [4 Marks]: Higher-order comparative analysis
  - Executes post-generation physics constraint verification (`verify_physics_constraints.ts`) ensuring non-negative temperatures, $0 < \eta < 1$, and valid mathematical roots.
- **Output:** Validated `CreativeQuestion` or `MultipleChoiceQuestion` JSON object.
- **Dependencies:** `src/services/questionSynthesizer.ts`, `src/utils/mathPreprocessor.ts`.
- **Failure Modes:**
  - *Physical Constraint Violation:* LLM generates impossible physics values ($T_{\text{sink}} > T_{\text{source}}$). *Mitigation:* Deterministic constraint validator rejects invalid questions and triggers an automatic re-synthesis pass.

---

### Component 8: HSC Rubric-Based Grading Pipeline

- **Responsibility:** Evaluates student CQ answer submissions against atomic NCTB marking rubrics with granular mark allocation.
- **Input:** Question stem data, official mark scheme, and student response text/scan.
- **Processing:**
  - Decomposes grading into atomic criteria:
    1. Formula Selection ($1.0\text{ Mark}$)
    2. Unit Conversion & Parameter Substitution ($1.0\text{ Mark}$)
    3. Final Arithmetic & Unit Notation ($1.0\text{ Mark}$)
  - Generates diagnostic feedback explaining exact reasons for mark deductions.
- **Output:** `GradingResult` object with numerical score ($0.0–10.0$), sub-part breakdown, and remedial feedback text.
- **Dependencies:** `@google/genai`, Socratic prompt engine.
- **Failure Modes:**
  - *Alternative Valid Solution Penalization:* Student solves problem using valid alternative method not in standard prompt rubric. *Mitigation:* System prompt explicitly directs model to accept any mathematically and physically sound derivation.

---

### Component 9: Mistake Classification Pipeline

- **Responsibility:** Categorizes student errors into an 8-category cognitive failure taxonomy to guide targeted revision.
- **Input:** Question context, correct solution, and student's incorrect answer string.
- **Processing:**
  - Evaluates error against the 8-category taxonomy:
    - `ERR_CALC`: Arithmetic evaluation error
    - `ERR_FORM`: Formula recall failure
    - `ERR_CONC`: Fundamental conceptual violation
    - `ERR_METHOD`: Indeterminate solution strategy
    - `ERR_REASON`: Incomplete logical deduction in Part-(ঘ)
    - `ERR_UNIT`: Missing or un-converted units ($cm \rightarrow m$)
    - `ERR_SIGN`: Coordinate or sign convention error
    - `ERR_DIAG`: Diagram or circuit polarity error
- **Output:** `MistakeLog` entry with category tag, error snippet, timestamp, and concept ID.
- **Dependencies:** `useMistakeVaultStore`, `src/services/mistakeClassifier.ts`.
- **Failure Modes:**
  - *Compound Error Misclassification:* Student makes both a sign error and a calculation error simultaneously. *Mitigation:* Secondary error tag array (`secondaryTags: string[]`).

---

### Component 10: Remedial Isomorphic Generation Pipeline

- **Responsibility:** Generates isomorphic transfer problems to verify that student has mastered a previously failed concept.
- **Input:** The specific `MistakeLog` entry and the source question object.
- **Processing:**
  - Identifies the underlying mathematical equation topology from the failed question.
  - Generates a new question with identical mathematical structure but altered physical contexts, numbers, and variable symbols.
  - Binds the remedial question to the student's active revision sprint.
- **Output:** Isomorphic `CreativeQuestion` or `MCQ` practice instance.
- **Dependencies:** `src/services/remedialEngine.ts`, `questionSynthesizer.ts`.
- **Failure Modes:**
  - *Trivial Isomorphism:* Model changes only the numbers without creating a fresh physical narrative. *Mitigation:* Prompt enforces new contextual scenario (e.g., changing from a train to an aircraft).

---

### Component 11: Data Validation & Preprocessing Pipeline

- **Responsibility:** Sanitizes and normalizes all non-deterministic strings before client-side rendering.
- **Input:** Raw streaming model output strings containing mixed Bengali script and LaTeX formulas.
- **Processing:**
  - `preprocessMathText` regex engine converts display brackets `\[ ... \]` to `$$ ... $$` and inline `\( ... \)` to `$ ... $`.
  - Normalizes plain slash fractions `a/b` to `\frac{a}{b}`.
  - Enforces word boundary whitespace between Bengali Unicode and dollar delimiters.
  - Validates JSON output structure using Zod schemas.
- **Output:** Cleaned string guaranteed to parse without unhandled exceptions in KaTeX.
- **Dependencies:** `src/utils/mathPreprocessor.ts`, `zod`.
- **Failure Modes:**
  - *Nested Dollar Sign Collision:* Inline currency or chemical symbols misidentified as math delimiters. *Mitigation:* Lookahead regex verification checking for mathematical operators.

---

### Component 12: Fault Tolerance & Error Handling Pipeline

- **Responsibility:** Guarantees zero catastrophic UI crashes, manages offline state transitions, and handles network timeouts.
- **Input:** Uncaught exceptions, HTTP error codes (400, 429, 500, 503), and offline browser network events.
- **Processing:**
  - React Error Boundaries wrap all major UI panels.
  - Dual-provider API fallback cascade intercepts 429/503 errors and redirects to OpenRouter secondary endpoint.
  - Offline detector immediately switches question sourcing to locally cached board question datasets in LocalStorage.
- **Output:** Uninterrupted UI state, non-blocking toast alerts, and automatic telemetry recovery.
- **Dependencies:** `src/lib/ai/provider.ts`, React Error Boundary components.
- **Failure Modes:**
  - *Total Network Blackout:* Device loses all connectivity during active session. *Mitigation:* Full session state persisted to LocalStorage; exam timer continues locally without server dependency.

---

## 3. High-Value Architecture Diagrams for Portfolio Case Study

To make your case study visually compelling to university admissions committees, the following 4 diagrams should be rendered as visual figures:

```
+---------------------------------------------------------------------------------------+
|                       RECOMMENDED PORTFOLIO VISUAL DIAGRAMS                           |
|                                                                                       |
|  [DIAGRAM 1: End-to-End System Pipeline]                                              |
|   • Flowchart showing User -> React 19 UI -> mathPreprocessor -> Gemini -> State.    |
|                                                                                       |
|  [DIAGRAM 2: Mathematical Preprocessing Delimiter State Machine]                     |
|   • Visual before/after showing regex normalization of mixed Bengali Unicode & LaTeX. |
|                                                                                       |
|  [DIAGRAM 3: Socratic vs. Rubric Grading State Machine]                              |
|   • State transition diagram showing hint progression without answer disclosure.      |
|                                                                                       |
|  [DIAGRAM 4: 8-Category Mistake Taxonomy & Remedial Loop]                             |
|   • Circular feedback loop: Student Error -> Classification -> Isomorphic Question.   |
+---------------------------------------------------------------------------------------+
```

---
*This architecture specification represents the verified, implemented design of the HSC AI Study Intelligence System.*
