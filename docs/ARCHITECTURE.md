# System Architecture Specification

## 1. System Context

Baseera is an evaluation client designed for the **Erasmus+ VirtuallyEDU** project. It addresses impulsive content sharing and media misinformation by introducing a friction step: multimodal AI evaluation paired with a mandatory reflective pause.

---

## 2. Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Presentation Layer                    │
│                                                             │
│   SplashScreen ──► OnboardingScreen ──► Login / Signup      │
│                            │                                │
│                            ▼                                │
│                       HomeScreen                            │
│                      /    │    \                            │
│           PrivacyScan  Reports  ShareScreen                 │
│                                     │                       │
│                                     ▼                       │
│                             ProcessingScreen                │
│                                     │                       │
│                                     ▼                       │
│                                ResultScreen                 │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Services                   │
│                                                             │
│   AuthService ────────► localStorage (session persistence)  │
│   AnalysisStore ──────► In-Memory Singleton / Cache         │
│   AIProvider ─────────► LiteLLM Proxy / OpenAI Gateway      │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                     │
│                                                             │
│   LiteLLM Gateway (config/litellm_config.yaml)              │
│   Providers: Groq Cloud / Gemini / OpenAI                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Data Flow: Content Evaluation Lifecycle

1. **Submission**: User supplies a URL or uploads an image attachment via `ShareScreen`.
2. **Staging**: Content and optional media attachment are staged in `AnalysisStore`.
3. **Execution**: `ProcessingScreen` coordinates the evaluation lifecycle:
   - Validates user payload.
   - Dispatches multimodal or text payload to `AIProvider.analyzeContent()`.
   - Records observation entry into `AnalysisStore`.
4. **AI Gateway & Parsing**:
   - `AIProvider` constructs standard OpenAI-compatible completions payload.
   - If image is present, Strategy 1 executes with base64 data URI in multimodal message block.
   - If vision fails or times out, Strategy 2 executes using context prompt from filename.
   - If offline or unreachable, deterministic Socratic fallback generates baseline evaluation.
   - Strict JSON validation cleans markdown code fences and Qwen `<think>` tokens.
5. **Reflection**: `ResultScreen` presents:
   - Evaluated Emotional Bias Gauge (0–100%).
   - Content-specific Socratic reflection prompt.
   - Verification references.
   - 20-second countdown enforcing critical pause.

---

## 4. LiteLLM Proxy Integration

To decouple client code from proprietary provider APIs, Baseera supports LiteLLM proxy integration:

- **Standard Interface**: Adheres to the OpenAI `/v1/chat/completions` protocol.
- **Provider Agnostic**: The proxy can map `baseera-default` and `baseera-vision` to any underlying model (Groq Qwen, Google Gemini, OpenAI GPT, or self-hosted Ollama).
- **Configuration**: Managed in `config/litellm_config.yaml`.
- **Environment Driven**: Client points to the gateway using `VITE_AI_BASE_URL`.

---

## 5. Security & Privacy Guarantees

- **No Remote User Data Persistence**: Analysis observations and authentication sessions are retained locally in the client (`localStorage`).
- **Secret Separation**: API keys are injected via environment variables; no credentials are baked into client bundles.
- **Input Neutrality**: Prompts explicitly instruct the LLM not to issue binary true/false verdicts, but to provide inquiry prompts that encourage media literacy.
