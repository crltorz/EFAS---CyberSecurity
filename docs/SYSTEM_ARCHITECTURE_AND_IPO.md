# EFAS — System Architecture & IPO Diagrams

**Electronic Fraud Awareness System (EFAS)**  
**Version:** Client SPA (React 18 + Vite 5)  
**Deployment:** Static hosting (e.g. Vercel) + Groq Cloud API

This document describes the **system architecture** and **Input–Process–Output (IPO)** models for capstone documentation, defense slides, and technical reports.

---

## 1. System Context (High-Level)

EFAS is a **browser-based** cybersecurity awareness application. Most processing runs **in the user’s browser**. Athena conversational replies optionally call the **Groq LLM API** over HTTPS. Content (articles, alerts, contacts, rubric, spam corpus) is **bundled at build time**—there is no EFAS-owned backend database.

```mermaid
flowchart TB
  subgraph Users["Users"]
    U[Filipino end users / students / LGU]
  end

  subgraph Client["EFAS Client (SPA)"]
    WEB[React + Vite Application]
  end

  subgraph Host["Hosting"]
    VERCEL[Vercel CDN / Static Files]
  end

  subgraph External["External Services"]
    GROQ[Groq API — Llama 3.3 70B]
    AGENCIES[Official agency websites — citations only]
  end

  U -->|HTTPS| VERCEL
  VERCEL -->|serves dist/| WEB
  U -->|interacts| WEB
  WEB -->|chat completions| GROQ
  U -.->|opens source links| AGENCIES
```

---

## 2. Layered System Architecture

```mermaid
flowchart TB
  subgraph Presentation["Presentation Layer"]
    PAGES[Pages: Home, Articles, ScamAlerts, FactCheck, Athena, Emergency, Quiz, About]
    UI[Shared UI: Layout, TopNav, Badges, CitationCard, CategoryImage]
  end

  subgraph Application["Application / Service Layer"]
    ATH[services/athena/*]
    RT[routing · classifier · verification]
    FMT[formatters · geminiAthena parse/polish]
    GROQ_C[groqClient]
    FC[riskRubric.analyze]
    PW[passwordStrength]
  end

  subgraph Data["Data Layer (static modules)"]
    ART[articles + articleEnhancements]
    ALERTS[scamAlerts]
    CORPUS[testCorpus / SPAM_SMS]
    RUBRIC[riskRubric indicators]
    CONTACTS[contacts + nationalHotlines]
    QUIZ_D[quiz]
    AUTH[authorities · knowledge]
    MEDIA[topicMedia · categoryMedia]
  end

  subgraph External["External"]
    API[Groq REST API]
  end

  PAGES --> UI
  PAGES --> ATH
  PAGES --> FC
  PAGES --> GROQ_C
  PAGES --> ART
  PAGES --> ALERTS
  PAGES --> CONTACTS
  PAGES --> QUIZ_D
  ATH --> RT
  ATH --> FMT
  ATH --> GROQ_C
  RT --> FC
  RT --> CORPUS
  RT --> RUBRIC
  GROQ_C --> API
  ATH --> AUTH
  ATH --> MEDIA
```

### 2.1 Module map (repository)

| Layer | Path | Responsibility |
|--------|------|----------------|
| Presentation | `src/pages/*` | Route-level screens and user flows |
| Presentation | `src/components/*` | Reusable UI (nav, citations, images) |
| Application | `src/services/athena/*` | Athena routing, verification, formatting |
| Application | `src/data/groqClient.ts` | Groq HTTP client + system prompt |
| Data | `src/data/*.ts` | Curated content, rubric, corpus, quiz |
| Data | `src/docs/SPAM_SMS.csv` | Spam SMS reference corpus (source data) |
| Cross-cutting | `src/lib/analytics.ts` | Client-side event logging (dev/debug) |

---

## 3. Deployment Architecture (Vercel)

```mermaid
flowchart LR
  DEV[Developer] -->|git push| GH[GitHub Repository]
  GH -->|webhook| VC[Vercel Build]
  VC -->|npm run build| DIST[dist/ static assets]
  DIST --> CDN[Vercel Edge CDN]
  CDN --> USER[End-user browser]
  USER -->|VITE_GROQ_API_KEY bundled| GROQ[Groq API]
```

**Note:** `VITE_GROQ_API_KEY` is injected at **build time** into the client bundle. For production hardening, a future version could proxy Groq calls through a serverless function.

---

## 4. Athena — Processing Flow (Sequence)

```mermaid
sequenceDiagram
  actor User
  participant UI as Athena.tsx
  participant RT as routing / classifier
  participant VER as verification.ts
  participant RUB as riskRubric
  participant CORP as corpusMatch
  participant GROQ as groqClient
  participant API as Groq Cloud

  User->>UI: Send message
  UI->>RT: detectLanguage, off-topic, password, shouldRunVerification

  alt Password check
    UI->>UI: evaluatePassword → formatPasswordReply
    UI->>User: Strength report (local)
  else Off-topic
    UI->>User: Redirect message (local)
  else Verification path
    UI->>VER: runVerification(text)
    VER->>RUB: analyze(text)
    VER->>CORP: matchSpamCorpus(text)
    VER->>UI: formatVerificationReport
    UI->>GROQ: chatWithGroq + rubricContext
    GROQ->>API: POST /chat/completions
    API-->>GROQ: analyst note
    GROQ-->>UI: parseAthenaReply + merge citations
    UI->>User: Technical report + Analyst note
  else General / emergency chat
    UI->>GROQ: chatWithGroq (emergency context if matched)
    GROQ->>API: POST /chat/completions
    API-->>GROQ: reply
    GROQ-->>UI: parseAthenaReply
    UI->>User: Conversational answer + citations
  end
```

---

## 5. Fact Check — Processing Flow

```mermaid
flowchart TD
  IN[User pastes SMS / text or URL string]
  TAB{Input tab?}
  OCR[Toast: OCR not available]
  VAL{Empty input?}
  AN[analyze from riskRubric.ts]
  SCORE[Compute score 0–100 and band: low / caution / high]
  UI[Display indicators, actions, rubric panel]
  OUT[Risk score + triggered indicators + recommended actions + sources]

  IN --> TAB
  TAB -->|image| OCR
  TAB -->|text or link| VAL
  VAL -->|empty| ERR[Error toast]
  VAL -->|ok| AN
  AN --> SCORE
  SCORE --> UI
  UI --> OUT
```

---

## 6. System-Level IPO Diagram

### 6.1 IPO block diagram

```mermaid
flowchart LR
  subgraph INPUT["INPUTS"]
    I1[User messages & prompts]
    I2[Suspicious SMS / email / link text]
    I3[Quiz answer selections]
    I4[Search & filter queries]
    I5[Navigation / page requests]
    I6[Environment: VITE_GROQ_API_KEY]
    I7[Static knowledge base at build time]
  end

  subgraph PROCESS["PROCESSES"]
    P1[Route & render SPA pages]
    P2[Heuristic risk rubric scoring]
    P3[URL / link pattern analysis]
    P4[Spam corpus similarity match]
    P5[Intent classification & routing]
    P6[Password strength evaluation]
    P7[LLM chat via Groq API]
    P8[Parse citations & format reports]
    P9[Enhance articles/alerts metadata]
    P10[Filter contacts & quiz scoring]
  end

  subgraph OUTPUT["OUTPUTS"]
    O1[Athena chat replies + citations]
    O2[Verification / analyst reports]
    O3[Fact Check risk score & band]
    O4[Articles & scam alerts display]
    O5[Emergency hotlines & call links]
    O6[Quiz score & recommendations]
    O7[Topic-themed visuals SVG]
  end

  I5 --> P1
  I7 --> P1
  I1 --> P5
  P5 --> P2
  P5 --> P3
  P5 --> P4
  P5 --> P6
  P5 --> P7
  I6 --> P7
  P2 --> P8
  P7 --> P8
  P8 --> O1
  P8 --> O2
  I2 --> P2
  P2 --> O3
  I3 --> P10
  P10 --> O6
  I4 --> P10
  I7 --> P9
  P9 --> O4
  P1 --> O4
  P1 --> O5
  P9 --> O7
```

### 6.2 System-level IPO table

| **Input** | **Process** | **Output** |
|-----------|-------------|------------|
| User navigates to `/`, `/articles`, `/scam-alerts`, etc. | React Router loads page; static data modules imported | Rendered UI with verified content and images |
| User pastes suspicious text in **Fact Check** | `analyze()` applies weighted indicators from `riskRubric.ts` | Risk score (0–100), band (low/caution/high), triggered rules, action checklist |
| User sends message in **Athena** | Classify intent → optional `runVerification()` → optional Groq completion | Chat bubble: education, verification report, or emergency steps with agency links |
| User completes **Quiz** | Compare selected index to `correctAnswer`; aggregate score | Percentage score, tier message, links to articles / Athena / Emergency |
| User searches **Emergency** directory | Filter `contacts` by category + search string | Filtered cards with `tel:` links, citations, copy hotline |
| Curated JSON/TS content at build | `enhanceArticles()`, `getAlertImageUri()`, topic SVG generation | Articles with specific `sourceUrl`, alert cards, themed thumbnails |
| Groq API key (env) | HTTPS POST to Groq chat completions | Natural-language analyst note (when online) |

---

## 7. Submodule IPO Diagrams

### 7.1 Athena (conversational agent)

```mermaid
flowchart TB
  subgraph IN_A["Inputs"]
    A1[User natural-language message]
    A2[Chat history]
    A3[Reference library + hotlines]
    A4[Groq API key]
  end

  subgraph PR_A["Processes"]
    B1[Language detection EN/TL]
    B2[Off-topic gate]
    B3[Password pattern extract + zxcvbn-style rules]
    B4[Verification branch: rubric + links + corpus]
    B5[Build system prompt + emergency context]
    B6[Groq API call]
    B7[Parse SOURCES block + polish text]
  end

  subgraph OUT_A["Outputs"]
    C1[Formatted chat reply]
    C2[Citation chips with URLs]
    C3[Verification report sections]
    C4[Offline / fallback messages]
  end

  A1 --> B1 --> B2
  B2 --> B3
  B2 --> B4
  B4 --> B5 --> B6
  A2 --> B6
  A3 --> B5
  A4 --> B6
  B6 --> B7 --> C1
  B7 --> C2
  B4 --> C3
  B6 -.->|failure| C4
```

| Input | Process | Output |
|-------|---------|--------|
| User message | `shouldRunVerification()` | Branch: verify vs chat vs password |
| Suspicious text | `runVerification()` | Rubric + link flags + corpus hits |
| Message + report context | `chatWithGroq()` | Analyst note |
| Any | `formatVerificationReport()` / `polishAthenaText()` | User-readable plain text |

---

### 7.2 Fact Check (message analyzer)

| Input | Process | Output |
|-------|---------|--------|
| SMS/email body text | Match 18+ heuristic indicators with weights | List of triggered / not triggered indicators |
| Same text | Sum weights, cap score, assign band | Score 0–100, low/caution/high |
| Same text | Map band to `bandActions` | Recommended user actions |
| User opens rubric panel | Load `indicators` + methodology copy | Full rubric reference UI |

---

### 7.3 Content modules (Articles & Scam Alerts)

| Input | Process | Output |
|-------|---------|--------|
| Raw article records (`articles.ts`) | `enhanceArticle()`: topic image, `sourceUrl`, `references[]` | Enriched article objects for UI |
| Raw alerts (`scamAlerts.ts`) | `getAlertImageUri()` per alert id | Alert cards with themed SVG + official `sourceUrl` |
| User opens article detail | `dangerouslySetInnerHTML` on trusted HTML body | Rendered guide + authorities + source links |

---

### 7.4 Emergency directory

| Input | Process | Output |
|-------|---------|--------|
| `contacts.ts`, `nationalHotlines.ts` | Category filter + text search | Filtered contact grid |
| User taps Call / Copy | `tel:` URI / clipboard API | Phone dialer or copied number |

---

### 7.5 Quiz

| Input | Process | Output |
|-------|---------|--------|
| User selects option per question | Compare to `correctAnswer`, increment score | Per-question correct/incorrect feedback |
| All questions answered | `(score / total) * 100`, tier rules | Final % + recommendation + deep links |

---

## 8. Data Flow — Knowledge & Trust

```mermaid
flowchart TD
  subgraph Sources["Official sources (human-curated)"]
    PNP[PNP-ACG]
    DICT[DICT / NCERT]
    BSP[BSP]
    SEC[SEC / PhilSys]
    BPI[BPI]
    LGU[LGU / local PIO]
  end

  subgraph EFAS_Data["EFAS static data"]
    ART2[articles + enhancements]
    AL2[scamAlerts]
    RUB2[riskRubric sources]
    CON2[contacts]
  end

  subgraph UI2["User-facing UI"]
    CITE[CitationCard / source links]
    BADGE[VerifiedBadge]
  end

  Sources -->|manual verification| EFAS_Data
  EFAS_Data --> UI2
  UI2 -->|user clicks| Sources
```

---

## 9. Technology Stack Summary

| Component | Technology |
|-----------|------------|
| Frontend framework | React 18 |
| Build tool | Vite 5 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router 6 |
| Animation | Framer Motion |
| LLM provider | Groq (`llama-3.3-70b-versatile`) |
| Hosting | Vercel (static SPA + `vercel.json` rewrites) |
| Icons | Lucide React |

---

## 10. Figure captions (for thesis)

**Figure 1.** System context diagram of EFAS showing the end user, static web client, Vercel hosting, and Groq API.

**Figure 2.** Layered architecture of EFAS (presentation, application services, static data, external API).

**Figure 3.** System-level IPO model illustrating inputs (user content, navigation, environment variables, curated data), processes (routing, heuristics, verification, LLM), and outputs (reports, educational content, emergency contacts).

**Figure 4.** Athena sequence diagram for verification and conversational branches.

**Figure 5.** Submodule IPO for the Fact Check heuristic engine.

---

*Generated from the EFAS codebase structure as of May 2026. Update this document when adding a backend API, database, or changing the LLM provider.*
