# Workshop Ideas

- **Date:** June 22, 2026
- **Version:** 1.0
- **Classification:** SoftServe Confidential

## 1. Workshop Objectives

- Give engineers hands-on experience with AI, LLM integration, MCP, RAG, tool calling, and AI security.

- Connect workshop exercises with real integration engineering scenarios: internal APIs, databases, documents, cloud services, messaging, and enterprise workflows.

- Use technology radar evaluation discipline: test tools in a PoC, capture what worked, what did not, and define recommendation boundaries.

- Create reusable workshop formats that can later become playbooks, demos, PoC repositories, or internal enablement material.

## 2. Section 4.5 Analysis

The existing Section 4.5 workshop set covers eight core practical topics. These topics form a logical learning path from basic MCP server creation to release-readiness checks for AI-enabled workflows.

| Existing workshop topic                       | Core outcome                                                                                                                          |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Build a simple MCP server for an internal API** | Engineers learn MCP tools, schemas, resources, and safe execution by wrapping an internal API behind a controlled MCP interface.          |
| **Expose a database schema as MCP resources**     | Engineers learn how to expose context such as database schema and metadata without giving the model unsafe direct database access.        |
| **Design a safe tool-calling workflow**           | Engineers practice authorization, input validation, audit logging, confirmation flows, and side-effect control.                           |
| **RAG mini-project over internal docs**           | Engineers build a small document-grounded assistant and practice chunking, embeddings, retrieval, grounding, and evaluation.              |
| **Prompt injection attack/defense exercise**      | Engineers test prompt injection risks and practice mitigation techniques for AI systems that read external or user-controlled content.    |
| **AI integration design review**                  | Engineers learn what architecture, security, data, and operational questions must be answered before approving an AI-enabled integration. |
| **Spec-driven development exercise**              | Engineers write a specification first, then use AI to generate implementation and tests from clear requirements and acceptance criteria.  |
| **Evaluate an AI feature before release**         | Engineers define quality checks, safety checks, regression examples, and release acceptance criteria for AI workflows.                    |

## 3. Recommended Direction

The workshop program should be structured as a practical enablement track. Each session should combine a short conceptual introduction, a guided demo, a hands-on task, and a short output that can be reused later.

### 3.1 Delivery Model

- Start from a concrete integration scenario rather than a generic AI demo.

- Use small, controlled datasets and internal-style APIs to keep the exercises realistic.

- Include security and operational constraints in every workshop, not only in dedicated security sessions.

- Finish each session with a short decision note: when the approach is useful, risky, or not recommended.

### 3.2 Technology Radar Alignment

The technology radar is a living evaluation mechanism for tools and platforms used by the Custom Integrations team. It organizes technologies by recommendation maturity: Adopt, Trial, Assess, and Hold. For workshops, this model should be used to choose candidate technologies and to document PoC outcomes in a consistent way.

| Radar concept | How it should influence workshops                                                |
|-------------------|--------------------------------------------------------------------------------------|
| **Adopt**         | Use as stable default examples where the team already has confidence.                |
| **Trial**         | Use for deeper workshops where the goal is to validate practical delivery readiness. |
| **Assess**        | Use for exploratory workshops and learning-oriented PoCs.                            |
| **Hold**          | Use only for comparison, risk analysis, or anti-pattern discussions.                 |

## 4. Proposed Workshop Catalog

The following catalog combines the original Section 4.5 ideas with additional workshop proposals aligned with practical integration work and technology radar evaluation.

| No. | Workshop topic                                          | What to show or do                                                                                                                                                               |
|---------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1       | **Simple MCP server for an internal API**                   | Show MCP server structure, tool schemas, resources, and safe execution. Implement a small server that wraps an existing REST API and expose one read-only and one controlled action. |
| 2       | **Database schema as MCP resources**                        | Expose database schema, tables, field descriptions, and metadata as read-only MCP resources. Demonstrate how the model can understand the schema without direct database access.     |
| 3       | **Safe tool-calling workflow**                              | Design a tool-calling flow with authorization, validation, audit logs, confirmation for sensitive actions, and predictable error handling.                                           |
| 4       | **RAG mini-project over internal documents**                | Prepare documents, split them into chunks, create embeddings, store them in a vector index, retrieve relevant context, and evaluate answer quality.                                  |
| 5       | **Prompt injection attack and defense**                     | Run realistic prompt injection attacks against a demo AI workflow. Add mitigations such as input boundaries, tool restrictions, output validation, and human confirmation.           |
| 6       | **AI integration design review**                            | Review an AI-enabled integration design using a checklist: data sources, permissions, tools, observability, failure modes, cost, latency, and release risks.                         |
| 7       | **Spec-driven development with AI**                         | Write a small API or MCP-server specification first. Use AI to generate implementation and tests, then review the result against acceptance criteria.                                |
| 8       | **AI feature release evaluation**                           | Define quality checks, safety checks, golden examples, regression tests, and release acceptance criteria for an AI-enabled workflow.                                                 |
| 9       | **Vector database comparison for RAG**                      | Compare two vector storage options using the same dataset and queries. Measure retrieval quality, metadata filtering, operational complexity, and cost/performance trade-offs.       |
| 10      | **LLM orchestration framework comparison (What language?)** | Implement the same simple RAG or tool-calling flow in two orchestration frameworks. Compare developer experience, testability, extensibility, and MCP integration readiness.         |
| 11      | **Agent-to-Agent workflow prototype**                       | Build two simple agents that exchange tasks and results. Show where A2A is useful and where MCP or direct tool calling is enough.                                                    |
| 12      | **LLM and RAG evaluation framework**                        | Connect an evaluation framework to a RAG workflow. Track answer quality, retrieval relevance, factual consistency, hallucination risk, and regression examples.                      |
| 13      | **Secure cloud tool calling**                               | Build a pipeline from LLM to MCP server to cloud function or API. Apply least privilege, environment separation, secrets management, and audit logging.                              |
| 14      | **Event-driven AI integration**                             | Process messages from a queue or topic, use AI for enrichment or classification, and publish results. Discuss idempotency, retries, dead-letter queues, and observability.           |
| 15      | **LLM provider comparison**                                 | Run the same use case across multiple model providers. Compare latency, cost, structured output support, tool calling, security controls, and vendor lock-in risks.                  |

## 5. Suggested Prioritization

| Priority group                          | Workshops           | Reason                                                                                 |
|---------------------------------------------|-------------------------|--------------------------------------------------------------------------------------------|
| **Phase 1: Foundation hands-on**            | Workshops 1, 2, 3, 4    | Build baseline MCP, tool-calling, and RAG capability.                                      |
| **Phase 2: Security and release readiness** | Workshops 5, 6, 8, 13   | Make AI integrations safe, reviewable, auditable, and production-aware.                    |
| **Phase 3: Technology radar PoCs**          | Workshops 9, 10, 12, 15 | Evaluate tools and providers using consistent PoC evidence.                                |
| **Phase 4: Advanced integration patterns**  | Workshops 11, 14        | Explore agent-to-agent and event-driven AI integration patterns.                           |
| **Cross-cutting practice**                  | Workshop 7              | Use spec-driven development as a standard engineering habit across all technical sessions. |

## 6. Expected Outputs Per Workshop

- A short agenda and facilitator notes.

- A small PoC repository or code sample where applicable.

- A checklist or mini-template that can be reused by engineers.

- A short evaluation note: what worked, what did not, when to recommend, and when not to recommend.

- Follow-up actions for improving the knowledge base or technology radar entry.
