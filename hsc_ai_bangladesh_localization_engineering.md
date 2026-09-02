# Engineering for the Periphery: Adapting Foundation Models to the Bangladesh HSC Educational Ecosystem

**Author / Developer:** Farhan (Md Farhan Hossain)  
**Curriculum Domain:** Bangladesh National Curriculum and Textbook Board (NCTB) — Higher Secondary Certificate (HSC)  
**Core Problem Statement:** *How do you adapt general-purpose foundation AI models to a low-resource, linguistically complex, and structurally rigid national examination ecosystem?*  
**Document Classification:** Localized Engineering Whitepaper & Academic Scholarship Submission  

---

## 1. The Core Engineering Challenge: Foundation Models vs. Localized Educational Reality

Global educational AI platforms (such as Khanmigo, Photomath, or unconstrained ChatGPT) are architected around Western pedagogical norms: single-step question-and-answer patterns, standard ASCII/English mathematical notation, Latin-script OCR, and flexible argumentative essay formats.

When deployed directly in Bangladesh's Higher Secondary Certificate (HSC) ecosystem, these generic systems break down across three fundamental vectors:

```
+---------------------------------------------------------------------------------------+
|                               TRI-FOLD LOCALIZATION BREAKDOWN                         |
|                                                                                       |
|  [1. COMPUTATIONAL & LINGUISTIC]     [2. PEDAGOGICAL & STRUCTURAL]                    |
|   • Tokenizer fragmentation in        • 4-tier Creative Question (CQ) schema          |
|     Bengali Unicode.                    (ক, খ, গ, ঘ) unmodeled by generic LLMs.      |
|   • Delimiter collision with LaTeX.   • Rigid NCTB mark allocation rubrics.           |
|   • Complex conjunct handwriting.     • Prohibition of non-syllabus methods.          |
|                                                                                       |
|  [3. INFRASTRUCTURAL & SOCIO-ECONOMIC]                                                |
|   • High latency on unstable 3G/4G cellular connections.                              |
|   • Low-memory Android hardware (< 3GB RAM).                                          |
|   • Economic barrier of recurring cloud database and API subscriptions.               |
+---------------------------------------------------------------------------------------+
```

The **HSC AI Study Intelligence System** is an engineering effort to bridge this gap: building deterministic parsing layers, structured taxonomy graphs, and rubric guardrails that constrain general-purpose AI models to function accurately within Bangladesh's NCTB framework.

---

## 2. Granular Localization Dimensions: Challenges, Implemented Solutions, and Future Work

---

### Dimension 1: Bengali Language Tokenization & Unicode Script Dynamics

#### The Engineering Problem:
- Standard Byte-Pair Encoding (BPE) tokenizers used by foundation models (e.g., TikToken, SentencePiece) are heavily biased toward English. A single English word typically consumes $1–1.3\text{ tokens}$, whereas a single Bengali word with complex conjuncts (*যুক্তবর্ণ*) often fragments into $4–8\text{ sub-word byte tokens}$.
- This creates severe token inflation: API latency increases by $300–400\%$, operational API cost per query quadruples, and multi-turn context windows fill up rapidly.

#### What HSC AI Implements:
- **Concise System Prompt Normalization:** Prompts are engineered with minimal token redundancy, instructing the model to generate concise, highly information-dense Bengali responses.
- **Client-Side Unicode Normalization:** Implements Unicode NFC/NFD normalization on input strings before transmission, preventing duplicate tokens for identical Bengali glyphs.

#### What Remains Future Work:
- Deploying a domain-specific Bengali sub-word tokenizer and vocabulary merge table optimized specifically for NCTB science textbooks.

---

### Dimension 2: Standardized Bengali Educational Terminology

#### The Engineering Problem:
- Scientific Bengali is strictly standardized by the NCTB. Generic LLMs often produce:
  - Dialectal variations from West Bengal, India (WBCHSE terminology), such as using *‘বলবিদ্যুৎ’* instead of Bangladesh NCTB standard *‘তড়িৎপ্রকৌশল / স্থির তড়িৎ’*.
  - Direct machine transliterations of English phrases that do not correspond to authorized textbook definitions (e.g., transliterating "Carnot cycle" rather than using *‘কার্নো চক্র’*).
- In public board examinations, deviating from official NCTB terminology can cause examiners to deduct marks on Part-(ক) definitions.

#### What HSC AI Implements:
- **Curriculum Context Injection:** Ground-truth NCTB terminology dictionaries are injected into the context window for the active chapter, enforcing authorized terms (e.g., *‘মহাকর্ষীয় বিভব’*, *‘পয়সনের অনুপাত’*, *‘সম্পৃক্ত বাষ্পচাপ’*).

#### What Remains Future Work:
- Automated post-generation glossary validation using an exact-match NCTB terminology blacklist/whitelist filter.

---

### Dimension 3: Bengali Handwriting Recognition & Script Complexity

#### The Engineering Problem:
- Bengali script features a horizontal continuous top line (*মাত্রা*), complex multi-character vertical conjuncts (*যুক্তবর্ণ*, e.g., ক্ষ, ষ্ণ, ক্ত, ঙ্গ), and attached vowel diacritics (*কার, ফলা*).
- Under timed examination pressure, students write rapidly in cursive with overlapping character strokes, causing off-the-shelf vision OCR models to experience high Character Error Rates (CER).

#### What HSC AI Implements:
- **Targeted Multi-Modal Extraction Prompts [STATUS: EXPERIMENTAL]:** Uses multi-modal vision prompts with explicit instructions to isolate line boundaries and separate Bengali prose from mathematical equations.
- **Client-Side Image Bounding & Resizing:** Preprocesses camera uploads to $1920 \times 1080$ to optimize visual stroke contrast without exceeding mobile upload bandwidth.

#### What Remains Future Work:
- Fine-tuning an open-source vision transformer (e.g., TrOCR or Donut) specifically on a curated dataset of Bangladeshi student exam scripts.

---

### Dimension 4: Mixed Bengali-LaTeX Mathematical Notation

#### The Engineering Problem:
- HSC Science examinations are inherently bilingual: question stems and explanations are written in Bengali prose, while mathematical expressions use English variable names ($v, u, a, t, \vec{F}$), Latin/Greek indices ($\theta, \omega, \eta, \lambda$), and LaTeX equations.
- Non-deterministic LLM token streams frequently generate un-escaped LaTeX brackets (`\[ ... \]`), omit whitespace between Bengali characters and dollar delimiters (`$`), or break fraction formatting, causing standard React DOM renderers to crash.

#### What HSC AI Implements:
- **The `mathPreprocessor.ts` Engine [STATUS: IMPLEMENTED]:** A deterministic regex normalization pipeline executing prior to DOM rendering:
  ```typescript
  // Converts raw model output into stable KaTeX tokens:
  // Converts \[ ... \] -> $$ ... $$
  // Converts \( ... \) -> $ ... $
  // Inserts non-breaking word boundaries: [Bengali Unicode]$ -> [Bengali Unicode] $
  ```
- **Isolated KaTeX Error Boundaries:** `MathRenderer.tsx` isolates individual equations with local try-catch blocks to ensure that a single malformed formula does not crash the application view.

#### What Remains Future Work:
- Building an AST-based parser to handle deeply nested mathematical matrices and chemical reaction equations without regex overhead.

---

### Dimension 5: Creative Question (CQ / সৃজনশীল) 4-Part Structure

#### The Engineering Problem:
- In 2008, Bangladesh transitioned from traditional rote-memorization exams to the Creative Question (CQ / *সৃজনশীল প্রশ্ন*) system based on Bloom's Cognitive Taxonomy. Every CQ consists of a shared stem (*উদ্দীপক*) and 4 rigidly structured sub-questions:
  - **Part (ক) Knowledge (জ্ঞানমূলক - 1 Mark):** Direct recall.
  - **Part (খ) Comprehension (অনুধাবনমূলক - 2 Marks):** Theoretical reasoning.
  - **Part (গ) Application (প্রয়োগমূলক - 3 Marks):** Mathematical computation from stem data.
  - **Part (ঘ) Higher-Order Analysis (উচ্চতর দক্ষতা - 4 Marks):** Comparative evaluation, hypothesis testing, or validity analysis.
- Generic AI chatbots do not understand this four-part cognitive progression, often combining all parts into a generic monolithic answer.

#### What HSC AI Implements:
- **Strict JSON Schema Contracts [STATUS: IMPLEMENTED]:** Uses `@google/genai` structured generation with explicit Zod schema interfaces that force the model to output distinct, typed keys for `stem`, `partA`, `partB`, `partC`, and `partD` with exact mark weights ($1+2+3+4 = 10$).

#### What Remains Future Work:
- Multi-modal stem generator creating SVG circuit diagrams and projectile trajectory graphs dynamically alongside text stems.

---

### Dimension 6: Board Examination Recurrence & Pattern Intelligence

#### The Engineering Problem:
- The HSC examination is administered across 9 General Education Boards (Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Dinajpur, Cumilla, Mymensingh).
- Board examiners follow historical recurrence patterns: certain high-yield topics (e.g., Carnot Engine in Physics, Hybridization in Chemistry, Projectile Motion in Math) appear in $> 70\%$ of board exam cycles, while other topics appear rarely. Students without access to elite coaching lack visibility into these yield distributions.

#### What HSC AI Implements:
- **Board Frequency Analytics Engine [STATUS: IMPLEMENTED]:** Indexes 2018–2024 board exam occurrences ($F_{\text{board}}$) and calculates a real-time Priority Score:
  $$P = \min\left(99,\, \text{round}\left( F_{\text{board}} \cdot 2.8 + W_{\text{student}} \cdot 0.4 \right)\right)$$
- **All-Board Filterable Repository:** Allows students to filter questions by specific board and year.

#### What Remains Future Work:
- Multi-year regression model predicting next-year board topic probabilities based on cyclic board rotation patterns.

---

### Dimension 7: NCTB Curriculum Alignment & Scope Boundaries

#### The Engineering Problem:
- Public board examiners strictly penalize solutions that employ university-level methods not explicitly introduced in authorized NCTB textbooks (e.g., using L'Hôpital's Rule on limits where algebraic factoring is required, or using tensor notation in vector problems).

#### What HSC AI Implements:
- **Negative Prompt Guardrails [STATUS: IMPLEMENTED]:** Injects explicit negative constraints prohibiting the model from utilizing advanced university calculus or out-of-syllabus physics frameworks.

#### What Remains Future Work:
- Automated method validator checking student and AI solution steps against an indexed AST of authorized algebraic operations.

---

### Dimension 8: Local Examination Rubrics & Granular Step Marking

#### The Engineering Problem:
- In HSC board evaluations, marks for mathematical questions (Part-গ, 3 Marks) are allocated in atomic steps:
  - Formula Statement: $1.0\text{ Mark}$
  - Variable Substitution & Unit Conversion: $1.0\text{ Mark}$
  - Final Arithmetic & Unit: $1.0\text{ Mark}$
- Generic grading systems assign binary pass/fail or arbitrary holistic scores, failing to provide actionable diagnostic feedback.

#### What HSC AI Implements:
- **Rubric-Aware Grading Engine [STATUS: IMPLEMENTED]:** Deconstructs evaluation into a 3-tier criterion decision table with explicit mark deductions for missing units (e.g., failing to convert Celsius to Kelvin) or incomplete deductions.

#### What Remains Future Work:
- Multi-rater calibration study measuring inter-rater reliability ($\kappa$) between AI scores and official board head-examiner marks.

---

### Dimension 9: Authoritative Textbook Grounding

#### The Engineering Problem:
- In Bangladesh, each subject has standard authorized textbook authors (Dr. Shahjahan Tapan and Dr. Giasuddin Ahmad for Physics, Haradhan Nag and Sanjit Kumar Guha for Chemistry, S.U. Ahamed and K.T. Kitab Uddin for Higher Mathematics).
- Students require explanations and constant values that match their specific textbook editions.

#### What HSC AI Implements:
- **Structured Knowledge Graph [STATUS: IMPLEMENTED]:** Grounded directly on NCTB authorized textbook learning outcomes, formulas, and canonical definitions.

#### What Remains Future Work:
- Multi-textbook variation selector allowing students to toggle between specific author conventions (e.g., Tapan vs. Pramanik in Physics).

---

### Dimension 10: Top College Test Paper Curation

#### The Engineering Problem:
- Premier colleges in Dhaka (Notre Dame College, Viqarunnisa Noon College, Dhaka College, Rajuk Uttara Model College, Ideal School & College) set rigorous pre-board test examinations containing advanced, multi-concept problems that prepare students for university admission tests (BUET, Medical).
- Outside Dhaka, rural students have limited access to these test papers.

#### What HSC AI Implements:
- **Curated Test Paper Hub [STATUS: IMPLEMENTED]:** Categorizes, typesets, and provides structured solutions for curated test examinations from premier institutions.

#### What Remains Future Work:
- Optical layout parsing pipeline to ingest full test paper PDF books automatically at the start of each academic season.

---

### Dimension 11: Socio-Economic Accessibility & Coaching Disparity

#### The Engineering Problem:
- Commercial coaching centers in Dhaka charge $3,000–5,000\text{ BDT/month}$ per student. This creates massive socio-economic educational inequality between urban students and rural or lower-income students.

#### What HSC AI Implements:
- **Free, Open Web Architecture [STATUS: IMPLEMENTED]:** Runs as a free client-side web application hosted on Vercel with zero subscription paywalls for core learning tools.
- **Extremely Low Token Unit Economics:** Optimized prompt tokens keep AI inference costs to $< 1\text{ BDT}$ per study sprint.

#### What Remains Future Work:
- Community-hosted model endpoints or sponsored API grants to guarantee permanent zero-cost access for underprivileged students.

---

### Dimension 12: Mobile-First Engineering & Network Resilience

#### The Engineering Problem:
- Most Bangladeshi students access the internet via budget Android smartphones with limited RAM ($2–4\text{GB}$) and fluctuating mobile cellular connections (3G/4G with packet drops).
- Heavy client-side bundles or server architectures requiring continuous websocket connections fail in this environment.

#### What HSC AI Implements:
- **Lightweight Native Mobile Packaging [STATUS: IMPLEMENTED]:** Built with Capacitor 8 (`com.farhan.hscai`), producing a native Android APK with an optimized bundle size ($index.js \approx 397\text{ kB}$).
- **Offline-First Persistence [STATUS: IMPLEMENTED]:** Taxonomy graph, session state, and mistake logs are persisted in browser `LocalStorage`, allowing full question browsing and exam timers to operate without active internet access.
- **Graceful Network Degradation:** Transient network drops trigger automatic fallback to cached exemplar questions.

#### What Remains Future Work:
- Integrating lightweight, quantized on-device Small Language Models (SLMs) via WebGPU/ONNX Runtime to enable basic Socratic tutoring completely offline without cellular data.

---

## 3. Localization Architectural Summary Matrix

| Localization Dimension | Generic Global AI Failure Mode | HSC AI Engineered Strategy | Implementation Status |
| :--- | :--- | :--- | :--- |
| **Bengali Tokenization** | High token inflation & slow streaming | Prompt minification & Unicode NFC normalization | **[IMPLEMENTED]** |
| **STEM Terminology** | Non-NCTB dialects & Indian Bengali terms | Curriculum context injection of NCTB terms | **[IMPLEMENTED]** |
| **Bengali Handwriting** | High CER on hurried exam cursive | Vision prompt structuring & contrast resizing | **[EXPERIMENTAL]** |
| **Mixed Math Notation** | Corrupted LaTeX delimiters & DOM crashes | Deterministic `mathPreprocessor.ts` engine | **[IMPLEMENTED]** |
| **CQ 4-Part Structure** | Monolithic unstructured text answers | Zod JSON Schema ($1+2+3+4 = 10\text{ Marks}$) | **[IMPLEMENTED]** |
| **Board Patterns** | Unweighted, random practice sets | Board Frequency recurrence scoring formula ($P$) | **[IMPLEMENTED]** |
| **Curriculum Scope** | Unauthorized university calculus methods | Negative prompt constraints on out-of-syllabus math | **[IMPLEMENTED]** |
| **Granular Rubric** | Vague holistic grading | 3-tier criterion step scoring (Formula, Sub, Unit) | **[IMPLEMENTED]** |
| **Textbook Grounding** | Inconsistent physical constants | Hardcoded NCTB constants ($g = 9.8\text{ ms}^{-2}$) | **[IMPLEMENTED]** |
| **Top College Papers** | Lack of localized model tests | Curated repository (NDC, VNC, Dhaka College) | **[IMPLEMENTED]** |
| **Economic Access** | Expensive commercial coaching fees | Free web deployment + $< 1\text{ BDT}$ compute cost | **[IMPLEMENTED]** |
| **Mobile & Network** | Heavy bundles crashing on 3G | Capacitor 8 APK + LocalStorage offline caching | **[IMPLEMENTED]** |

---

## 4. Conclusion: Localized Engineering as a Discipline

The **HSC AI Study Intelligence System** demonstrates that building effective educational technology for emerging economies is fundamentally an **applied systems engineering and localization challenge**, rather than simply calling a foundation model API.

By identifying the exact boundary constraints of Bangladesh's national curriculum—linguistic token dynamics, mixed-script mathematical parsing, 4-tier CQ cognitive schemas, and mobile network constraints—this project shows how general-purpose artificial intelligence can be disciplined and engineered into a reliable, syllabus-grounded academic tool.

---
*Localized Systems Engineering Whitepaper • HSC AI Study Intelligence System • Built by Farhan*
