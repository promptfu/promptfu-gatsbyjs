---
author: mhassel
categories: ["ai", "promptfoo", "developer tools", "cheat sheet"]
created: 2026-03-26 10:30:00 -0500
feature: true
image: null
show: true
tags: ["promptfoo", "prompt foo", "promptfoo.com", "ai testing", "llm evaluation", "cheat sheet", "cli", "prompt engineering"]
title: "Promptfoo Cheat Sheet: CLI Commands, Config, and Assertions Reference"
updated: 2026-03-26 10:30:00 -0500
---

# Promptfoo Cheat Sheet

A quick reference for the **promptfoo** AI prompt testing framework — CLI commands, config syntax, assertion types, and provider configuration. Bookmark this page for daily use.

## Installation

```bash
# Global install
npm install -g promptfoo

# One-off without install
npx promptfoo@latest

# Initialize a new project
npx promptfoo@latest init
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `promptfoo init` | Create a starter `promptfooconfig.yaml` |
| `promptfoo eval` | Run evaluations |
| `promptfoo eval -c config.yaml` | Run with specific config file |
| `promptfoo eval --no-cache` | Skip LLM response cache |
| `promptfoo eval --watch` | Re-run on file changes |
| `promptfoo view` | Open results in browser UI |
| `promptfoo share` | Share results via link |
| `promptfoo redteam init` | Set up red-team config |
| `promptfoo redteam run` | Run adversarial red-team tests |
| `promptfoo cache clear` | Clear cached LLM responses |

## Config File Structure

```yaml
# promptfooconfig.yaml

# Prompt templates (use {{variable}} syntax)
prompts:
  - "Summarize this text: {{text}}"
  - file://prompts/system.txt  # load from file
  - id: my-prompt
    raw: "You are {{persona}}. Answer: {{question}}"

# LLM providers to test against
providers:
  - openai:gpt-4o
  - openai:gpt-4o-mini
  - anthropic:claude-3-5-sonnet-20241022
  - google:gemini-1.5-pro

# Test cases
tests:
  - vars:
      text: "The quick brown fox..."
    assert:
      - type: contains
        value: "fox"
      - type: not-contains
        value: "ERROR"

# Default assertions applied to all tests
defaultTest:
  assert:
    - type: latency
      threshold: 10000  # ms
```

## Providers Quick Reference

```yaml
providers:
  # OpenAI
  - openai:gpt-4o
  - openai:gpt-4o-mini
  - openai:o1-mini

  # Anthropic
  - anthropic:claude-3-5-sonnet-20241022
  - anthropic:claude-3-haiku-20240307

  # Google
  - google:gemini-1.5-pro
  - google:gemini-1.5-flash

  # Local/Ollama
  - ollama:llama3.1
  - ollama:mistral

  # Azure OpenAI
  - azureopenai:deployment-name

  # With config overrides
  - id: openai:gpt-4o
    config:
      temperature: 0.0
      max_tokens: 500
      system: "You are a helpful assistant."
```

## Assertion Types

### String Matching

```yaml
assert:
  # Output contains string
  - type: contains
    value: "expected phrase"

  # Output does NOT contain string
  - type: not-contains
    value: "bad phrase"

  # Output contains ANY of these
  - type: contains-any
    value: ["option1", "option2", "option3"]

  # Output contains ALL of these
  - type: contains-all
    value: ["must have this", "and this"]

  # Exact string match
  - type: equals
    value: "exact expected output"

  # Starts with
  - type: starts-with
    value: "The answer is"

  # Regex match
  - type: regex
    value: "\\d{4}-\\d{2}-\\d{2}"  # date pattern
```

### JSON Validation

```yaml
assert:
  # Output is valid JSON
  - type: is-json

  # JSON matches schema
  - type: is-json
    value:
      type: object
      required: ["name", "age"]
      properties:
        name:
          type: string
        age:
          type: number

  # JSON path has expected value
  - type: javascript
    value: "JSON.parse(output).status === 'success'"
```

### LLM-as-Judge

```yaml
assert:
  # Grade output using another LLM
  - type: llm-rubric
    value: "The response is concise, under 100 words, and directly answers the question"

  # Model-graded with score threshold
  - type: model-graded-closedqa
    value: "Is the capital of France Paris?"
    threshold: 0.9

  # Factual consistency check
  - type: factuality
    value: "The Eiffel Tower is in Paris, France"
```

### Performance

```yaml
assert:
  # Response time under threshold (ms)
  - type: latency
    threshold: 5000

  # Token count under threshold
  - type: cost
    threshold: 0.01  # dollars

  # Token count
  - type: token-count
    threshold: 200
```

### Custom Assertions

```yaml
assert:
  # JavaScript expression (output is the string)
  - type: javascript
    value: "output.length > 10 && output.includes('answer')"

  # Python script
  - type: python
    value: "grade_response.py"

  # External webhook
  - type: webhook
    value: "https://your-api.com/grade"
```

## Variables and Templates

```yaml
tests:
  - vars:
      name: "Alice"
      topic: "machine learning"
    # {{name}} and {{topic}} replaced in prompts

  # Load vars from CSV
  - file://tests.csv

  # Load vars from JSONL
  - file://tests.jsonl
```

**tests.csv format:**
```csv
question,expected_answer
"What is 2+2?","4"
"Capital of France?","Paris"
```

## Environment Variables

```bash
# API Keys
export OPENAI_API_KEY=sk-...
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_AI_API_KEY=...

# Or in .env file
OPENAI_API_KEY=sk-...
```

## Red-Teaming

```bash
# Initialize red-team config
promptfoo redteam init

# Run attack suite
promptfoo redteam run

# View red-team results
promptfoo redteam report
```

```yaml
# redteam config section
redteam:
  plugins:
    - harmful:violence
    - harmful:hate
    - prompt-injection
    - jailbreak
    - pii-leak
  strategies:
    - jailbreak
    - prompt-injection
  numTests: 25  # tests per plugin
```

## CI/CD Integration

```yaml
# .github/workflows/eval.yml
name: Prompt Evaluation
on: [push, pull_request]
jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install -g promptfoo
      - run: promptfoo eval --ci
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Output Formats

```bash
# JSON output (for CI)
promptfoo eval --output results.json

# CSV output
promptfoo eval --output results.csv

# Table in terminal (default)
promptfoo eval

# Open browser UI
promptfoo view
```

## Caching

```bash
# Enable cache (default: ~/.promptfoo/cache)
promptfoo eval

# Skip cache for fresh results
promptfoo eval --no-cache

# Clear cache
promptfoo cache clear

# Custom cache directory
PROMPTFOO_CACHE_PATH=/path/to/cache promptfoo eval
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `OPENAI_API_KEY not set` | `export OPENAI_API_KEY=sk-...` |
| Assertion always fails | Check output with `promptfoo view`, may need `--no-cache` |
| Slow evaluations | Use `--max-concurrency` or smaller provider list |
| JSON parse errors in config | Validate YAML syntax at yaml-online-parser.appspot.com |
| Rate limit errors | Add `delay` to provider config |

## Further Reading

- [What is Promptfoo? Complete Guide](/blog/what-is-promptfoo-ai-prompt-testing)
- [OpenAI Acquires Promptfoo.dev — What It Means](/blog/promptfoo-openai-acquisition-what-it-means)
- [Prompt Engineering Patterns](/wiki/prompt-engineering-patterns)
- [AI CLI Tools Every Developer Should Know](/blog/ai-powered-command-line-tools-2025)

---

*This cheat sheet covers promptfoo as of early 2026. Check the [promptfoo GitHub repo](https://github.com/promptfoo/promptfoo) for the latest updates.*
