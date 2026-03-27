---
author: Matthew Hassel
categories: ["AI"]
created: 2026-03-19 10:00:00 -0500
description: Practical Claude API tips for developers. Learn how to use system prompts, streaming, tool use, caching, and model selection to build reliable AI-powered applications with Anthropic's Claude.
show: true
tags: ["claude", "anthropic", "API", "AI", "developer-tools", "llm"]
title: "Claude API Tips for Developers"
updated: 2026-03-19 10:00:00 -0500
---

Anthropic's Claude API is among the most capable and well-documented AI APIs available, but there are patterns that separate applications that work from applications that are reliable, cost-effective, and maintainable. This guide covers the practical tips that matter most when building with Claude.

<!--more-->

## 1. Pick the Right Model for the Job

As of 2026, Anthropic offers a tiered model lineup. Choosing correctly is the first optimization:

| Model | Best For |
|---|---|
| claude-opus-4-6 | Complex reasoning, nuanced writing, difficult code tasks |
| claude-sonnet-4-6 | Balanced quality and speed — the default choice for most production apps |
| claude-haiku-4-5 | High-volume, low-latency tasks: classification, extraction, triage |

A common mistake is defaulting to Opus for everything. For tasks like extracting structured data from text, classifying support tickets, or generating short summaries, Haiku delivers nearly the same quality at a fraction of the cost and latency. Reserve Opus for tasks where the quality delta actually matters to your users.

---

## 2. System Prompts Are Not Optional

The system prompt is your primary tool for controlling Claude's behavior. Treat it like application configuration, not an afterthought.

A well-structured system prompt for a developer assistant:

```javascript
const systemPrompt = `You are a senior engineer assistant for a TypeScript/Node.js backend team.

Rules:
- Answer only questions about code, architecture, and debugging.
- Use TypeScript in all code examples unless the user specifies otherwise.
- Prefer explicit error handling over try/catch-all patterns.
- When suggesting packages, confirm they are widely maintained (npm weekly downloads > 100k).
- If the user's question is ambiguous, ask one clarifying question before answering.

Output format:
- Code blocks must include the language identifier.
- Keep explanations concise. Use bullet points for lists of more than two items.
- If you are uncertain, say so explicitly.`;
```

Keep system prompts in version control. They are part of your application's behavior and should go through the same review process as code.

---

## 3. Use Streaming for Better UX

For any user-facing text generation, enable streaming. Users perceive streamed responses as faster even when total latency is identical, because they see output immediately rather than waiting for the complete response.

```javascript
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()

const stream = client.messages.stream({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Explain async/await in JavaScript." }],
})

for await (const event of stream) {
  if (
    event.type === "content_block_delta" &&
    event.delta.type === "text_delta"
  ) {
    process.stdout.write(event.delta.text)
  }
}
```

For server-sent events in a web app, pipe the stream to your response:

```javascript
// Express route
app.post("/api/chat", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: req.body.messages,
  })

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
    }
  }

  res.write("data: [DONE]\n\n")
  res.end()
})
```

---

## 4. Tool Use (Function Calling) Done Right

Claude's tool use feature lets you define functions it can call, making it possible to build agents that interact with your systems. The key insight: **Claude decides when to call a tool, you decide what happens when it does.**

```javascript
const tools = [
  {
    name: "get_user",
    description: "Fetch a user record by ID from the database.",
    input_schema: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          description: "The UUID of the user to fetch.",
        },
      },
      required: ["user_id"],
    },
  },
]

const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools,
  messages: [{ role: "user", content: "What is the email for user abc-123?" }],
})

// Check if Claude wants to call a tool
if (response.stop_reason === "tool_use") {
  const toolUse = response.content.find((b) => b.type === "tool_use")
  const result = await getUser(toolUse.input.user_id) // your function

  // Send the result back in the next turn
  const finalResponse = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools,
    messages: [
      { role: "user", content: "What is the email for user abc-123?" },
      { role: "assistant", content: response.content },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          },
        ],
      },
    ],
  })
}
```

Tool descriptions are critical. Claude uses the `description` field to decide whether to call a tool—vague descriptions lead to missed calls or incorrect tool selection.

---

## 5. Prompt Caching to Reduce Costs

Anthropic supports prompt caching, which reuses the KV cache for repeated prompt prefixes. This is particularly valuable when you have a large system prompt or document that remains constant across many requests.

```javascript
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: yourLargeSystemPrompt, // 10k+ tokens
      cache_control: { type: "ephemeral" },
    },
  ],
  messages: [{ role: "user", content: userMessage }],
})
```

Cached tokens are charged at roughly 10% of the normal input token rate after the initial caching write. For applications with consistent system prompts, this can reduce API costs significantly. Cache lifetime is approximately five minutes and resets on each cache hit.

---

## 6. Handle Rate Limits Gracefully

The Claude API enforces rate limits by requests per minute (RPM) and tokens per minute (TPM). Build retry logic from day one:

```javascript
async function callClaude(params, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await client.messages.create(params)
    } catch (err) {
      if (err.status === 429 && attempt < retries - 1) {
        const delay = Math.pow(2, attempt) * 1000 // exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }
      throw err
    }
  }
}
```

Also monitor your `x-ratelimit-remaining-requests` and `x-ratelimit-remaining-tokens` response headers to proactively throttle before hitting the limit.

---

## 7. Structured Output via Tool Use

When you need JSON output, do not rely on prompting Claude to "respond in JSON." Use a tool definition as a schema enforcer instead:

```javascript
const extractionTool = {
  name: "extract_metadata",
  description: "Extract structured metadata from the provided text.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      author: { type: "string" },
      published_date: { type: "string", format: "date" },
      topics: { type: "array", items: { type: "string" } },
    },
    required: ["title", "topics"],
  },
}

const response = await client.messages.create({
  model: "claude-haiku-4-5",
  max_tokens: 512,
  tools: [extractionTool],
  tool_choice: { type: "tool", name: "extract_metadata" }, // force tool use
  messages: [{ role: "user", content: articleText }],
})

const extracted = response.content.find((b) => b.type === "tool_use").input
```

Setting `tool_choice` to a specific tool guarantees structured output. This pattern is more reliable than parsing free-form JSON responses.

---

## 8. Context Window Management

Claude Sonnet 4.6 supports a 200k token context window. For document-heavy applications, this is generous—but it is not infinite. Common gotchas:

- **Conversation history grows unbounded.** Implement a sliding window or summarization strategy for long conversations.
- **Large file pastes waste tokens.** Extract only the relevant sections rather than pasting entire files.
- **Token counting before sending.** Use the `count_tokens` endpoint to verify payload size before large requests.

```javascript
const tokenCount = await client.messages.countTokens({
  model: "claude-sonnet-4-6",
  messages: conversationHistory,
})

if (tokenCount.input_tokens > 150000) {
  conversationHistory = summarizeOldMessages(conversationHistory)
}
```

---

## Further Reading

The PromptFu wiki has a [prompt engineering patterns cheat sheet](/wiki/prompt-engineering-patterns) with reusable patterns that translate directly to Claude API prompts. If you are evaluating Claude against other models, the [promptfoo cheat sheet](/wiki/promptfoo-cheat-sheet) covers systematic prompt testing workflows.

---

Building reliable Claude-powered applications comes down to the same fundamentals as any API integration: handle errors gracefully, monitor usage, structure your inputs carefully, and test your prompts the same way you test your code. The tips above give you the foundation to do all of that.
