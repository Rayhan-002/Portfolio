import type { CaseStudy } from '@/lib/data'

export const companyPolicyAssistantCaseStudy: CaseStudy = {
  tagline:
    'A RAG knowledge assistant for company policy questions that proves its retrieval and generation quality with a real benchmark — not just a demo you have to take on faith.',
  stats: [
    { label: 'Recall@10 (hybrid + reranking)', value: '94.9%' },
    { label: 'Recall@5 lift from reranking', value: '+26 pts' },
    { label: 'Answer faithfulness (LLM-judge)', value: '92.3%' },
  ],
  sections: [
    {
      heading: 'Overview',
      body: [
        'Company Policy Assistant is a production-oriented retrieval-augmented generation (RAG) system for answering company policy questions — grounded strictly in an internal knowledge base, with citations, for a fictional company (Nexora Technologies) built as a portfolio project.',
        'The premise is eval-driven RAG engineering end to end: hybrid retrieval, reranking, and grounded generation, with a benchmark that proves each stage\'s actual contribution rather than a demo that just has to be taken on trust.',
      ],
    },
    {
      heading: 'The Problem',
      body: [
        'Most "RAG chatbot" portfolio projects show a demo and ask you to take their word for it. This one inverts that: the corpus is deliberately engineered to contain the failure modes real company knowledge bases actually have — conflicting policies (contractors vs. full-time employees), stale cross-references, ambiguous terminology, superseded document versions — and a 39-question benchmark measures whether the pipeline actually handles them, stage by stage.',
      ],
    },
    {
      heading: 'Architecture',
      body: [
        'Documents are parsed and chunked with structure-aware, section/subsection-aware chunking that preserves metadata. From there, two retrieval paths run in parallel — dense embeddings (BAAI/bge-small-en-v1.5, CPU) into a FAISS index, and a BM25 sparse index — fused via Reciprocal Rank Fusion into a single hybrid ranking. That ranking is then reranked with a cross-encoder (also CPU-only) before being handed to generation.',
        'Generation runs behind a provider-agnostic LLMProvider interface (Groq or Gemini), swappable via a single environment variable with no pipeline code changes — answers and their citations come from the retrieved context, not from the model\'s own claims. A FastAPI backend (POST /chat, GET /documents) serves a Next.js + Tailwind chat frontend on top.',
        'The whole stack is free-tier only, by design: no paid APIs, no GPU dependency for serving.',
      ],
    },
    {
      heading: 'Measured Results',
      body: [
        'Reranking is the single highest-leverage stage in the pipeline. On the 39-question benchmark, hybrid retrieval alone (dense + BM25 + RRF) reaches 55.1% Recall@5 and 73.1% Recall@10; adding cross-encoder reranking on top lifts that to 81.0% Recall@5 and 94.9% Recall@10 — a ~26-point jump in Recall@5 from reranking alone.',
        'Generation quality is scored with an LLM-judge: 92.3% of answers are faithful (they don\'t invent facts outside the retrieved context) and 82.1% are correct against reference answers. Worth being explicit about the methodology here — the same model that generates answers also judges them, so this is a directional signal, not an unbiased score. All 3 deliberately out-of-scope questions in the benchmark (e.g. "does the company offer stock options?") were correctly declined rather than hallucinated.',
      ],
      bullets: [
        'Hybrid retrieval only — Recall@5 55.1%, Recall@10 73.1%, MRR 48.5%, nDCG@5 46.5%',
        '+ Cross-encoder reranking — Recall@5 81.0%, Recall@10 94.9%, MRR 71.7%, nDCG@5 70.9%',
      ],
    },
    {
      heading: 'Known Limitations',
      body: [
        'Being upfront about what\'s still broken is part of the point of an eval-driven build — each of these has a documented root-cause investigation behind it, not just a symptom description, and the next iteration targets them specifically, measured against the same benchmark before and after.',
      ],
      bullets: [
        'Applicability-conflict queries (e.g. "I\'m a contractor, how many leave days do I get?") — the reranker sometimes ranks a generic policy chunk above the specific exclusion that actually answers the question. Root-caused, not yet fixed.',
        'Paraphrased/indirect queries — a question about "relaxing in Dubai next month" fails to retrieve the international remote-work policy, because BM25 confidently matches on literal wording ("work remotely") rather than the implied meaning. This needs query understanding/rewriting, not retrieval tuning.',
        'Version-delta queries sit at 60% recall regardless of reranking — the weakest category in the benchmark.',
      ],
    },
  ],
}
