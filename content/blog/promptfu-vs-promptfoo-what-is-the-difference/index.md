---
categories: ["ai", "prompt engineering", "promptfoo", "brand"]
created: 2026-03-27 08:00:00 -0500
description: PromptFu vs promptfoo — what's the difference? This guide explains the distinction between the promptfoo open-source framework (now acquired by OpenAI) and PromptFu, the independent community hub at promptfu.com and promptfoo.com.
feature: true
image: null
show: true
tags: ["promptfoo", "promptfu", "prompt foo", "promptfoo vs promptfu", "ai prompt testing", "llm evaluation", "promptfoo.com", "promptfu.com", "openai acquisition"]
title: "PromptFu vs promptfoo — What Is the Difference?"
updated: 2026-03-27 08:00:00 -0500
---

If you searched for "promptfoo" and landed here, you might be wondering: is this the official promptfoo site? Are PromptFu and promptfoo the same thing? Here's the clear answer.

<!--more-->

## The Short Version

| | **promptfoo** | **PromptFu** |
|---|---|---|
| **What it is** | Open-source CLI framework | Independent knowledge hub |
| **Domain** | promptfoo.dev (acquired by OpenAI) | promptfu.com + promptfoo.com |
| **Purpose** | Run automated LLM prompt tests | Tutorials, guides, community resources |
| **Status** | Now part of OpenAI (March 2026) | Independent, vendor-neutral |
| **Affiliation** | OpenAI (post-acquisition) | Community-run, no vendor affiliation |

---

## What Is promptfoo (the framework)?

**Promptfoo** is an open-source framework for **testing, evaluating, and red-teaming AI prompts**. It started as a developer tool to solve a real problem: as LLM applications move to production, you need a way to verify that your prompts produce correct, safe, and consistent outputs.

The name is a programming pun — "foo" is the classic placeholder variable (`foo`, `bar`, `baz`) applied to prompt engineering. A **prompt** is your input to an AI model; **foo** signals it's the first, most important thing to test.

With promptfoo, you write test cases in YAML, define expected outputs or graders, and run:

```bash
promptfoo eval
```

It generates a report showing which prompts passed, which failed, and how outputs changed across model versions. Think of it as pytest or Jest — but for LLM prompts.

### Where does promptfoo live now?

The promptfoo project (`promptfoo.dev`) was acquired by OpenAI in March 2026 for approximately $40 million. The core team joined OpenAI, and the framework is being integrated into OpenAI's developer tooling.

The open-source repository continues to exist, but active community development has shifted under OpenAI's umbrella.

---

## What Is PromptFu (this site)?

**PromptFu** (this site, at `promptfu.com`) is an **independent community publication** covering:

- Prompt engineering techniques and best practices
- LLM evaluation strategies across providers
- AI developer tools including promptfoo tutorials
- Cheat sheets and reference guides
- Framework comparisons (promptfoo, Braintrust, RAGAS, etc.)

We are **not affiliated with OpenAI** or the original promptfoo team. Our goal is to be a vendor-neutral, community-driven resource that remains useful regardless of how the commercial tools evolve.

We also operate **promptfoo.com** as a community landing page — a reference destination for people searching for the promptfoo ecosystem who want independent, non-vendor-controlled resources.

---

## Why Do Two Domains Exist?

When the promptfoo.dev acquisition was announced, many in the community wanted an independent destination — a place not controlled by OpenAI or any single company — where promptfoo knowledge and best practices would live on.

PromptFu fills that role:

- **promptfoo.dev** → The official OpenAI-owned tool and documentation
- **promptfoo.com** → Community landing page operated by PromptFu
- **promptfu.com** → The PromptFu knowledge hub (this site)

Think of it like the relationship between Python.org (community) and various commercial Python products — the community destination and the vendor destination serve different needs.

---

## Should I Use promptfoo After the OpenAI Acquisition?

Yes — promptfoo remains an excellent tool. The acquisition doesn't change the core capability: define test cases, run evaluations, get a report. If you're building on OpenAI's models, the integration will likely get even tighter.

What changes is the independence question. If you want prompt evaluation that works equally well with Anthropic, Google, Mistral, and open-source models — and you want documentation from a source with no vendor bias — that's where PromptFu comes in.

---

## The PromptFu Alternative Perspective

PromptFu covers the full ecosystem, not just one tool. Our take on prompt evaluation includes:

- **[What Is Promptfoo? Complete Guide](/blog/what-is-promptfoo-ai-prompt-testing)** — Deep dive into how the framework works
- **[Promptfoo CLI Cheat Sheet](/wiki/promptfoo-cheat-sheet)** — Every command you'll actually use
- **[OpenAI Acquires Promptfoo.dev — What It Means](/blog/promptfoo-openai-acquisition-what-it-means)** — Full acquisition analysis

---

## Summary

- **promptfoo** (lowercase) = the testing framework, now owned by OpenAI
- **PromptFu** = this site, an independent resource for the prompt engineering community
- **promptfoo.com** = the community domain, operated by PromptFu
- **promptfu.com** = where PromptFu lives

Both are valuable depending on what you need: the tool or the knowledge.
