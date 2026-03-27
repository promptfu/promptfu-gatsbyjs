---
author: mhassel
categories: ["linux"]
created: 2026-03-27 00:00:00 -0600
description: jq is a lightweight command-line JSON processor — the awk of the API era.
feature: false
image: binoculars-black-equipment-large.jpg
show: true
tags: ["command line", "linux", "json", "api"]
title: jq
updated: 2026-03-27 00:00:00 -0600
---
# Summary

`jq` is a command-line JSON processor. Where [`awk`](/wiki/awk) rules over whitespace-delimited text,
`jq` rules over JSON — the lingua franca of every REST API, AI service, and cloud platform. Pass it
JSON from stdin or a file, write a filter expression, and get structured output back.
<!--more-->

Install on Debian/Ubuntu:

```shell
sudo apt-get install jq
```

Install on macOS:

```shell
brew install jq
```

# Usage

```shell
jq '<filter>' [file]
```

Without a file, `jq` reads from stdin — perfect for piping [`curl`](/wiki/curl) output directly.

# Examples

## Pretty-print JSON

```shell
curl -s https://api.example.com/users | jq .
```

The `.` filter is the identity — it just reformats the input with syntax highlighting and indentation.

## Extract a field

```shell
echo '{"name": "Alice", "age": 30}' | jq '.name'
"Alice"
```

## Extract a nested field

```shell
echo '{"user": {"id": 42, "email": "alice@example.com"}}' | jq '.user.email'
"alice@example.com"
```

## Iterate over an array

```shell
echo '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]' | jq '.[] | .name'
"Alice"
"Bob"
```

## Build a new object from selected fields

```shell
curl -s https://api.example.com/users \
  | jq '[.[] | {id: .id, email: .email}]'
```

## Filter an array by condition

```shell
# Show only users where active is true
jq '[.[] | select(.active == true)]' users.json
```

## Extract raw strings (strip quotes)

```shell
jq -r '.token' response.json
```

`-r` outputs raw strings without JSON quoting — useful when piping values to other commands.

## Use jq output in a shell loop

```shell
for id in $(jq -r '.[].id' users.json); do
  echo "Processing user $id"
done
```

## Construct a JSON payload for an API call

```shell
jq -n --arg model "claude-opus-4-6" --arg prompt "Explain awk in one sentence" \
  '{"model": $model, "messages": [{"role": "user", "content": $prompt}]}'
```

`-n` produces output without reading input; `--arg` injects shell variables safely.

## Parse an AI API response

```shell
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-haiku-4-5-20251001","max_tokens":256,"messages":[{"role":"user","content":"Hello"}]}' \
  | jq -r '.content[0].text'
```

## Slurp multiple JSON lines into an array

```shell
# Many APIs return newline-delimited JSON (ndjson); --slurp wraps them in an array
jq -s '.' stream.ndjson
```

## Combine with grep for quick audits

```shell
cat access.log | grep 'POST /api' | jq -r '.user_id' | sort | uniq -c | sort -rn | head -10
```

# Common Flags

| Flag | Meaning |
|------|---------|
| `.` | Identity — pretty-print input |
| `-r` | Raw string output (no quotes) |
| `-c` | Compact output (single line) |
| `-n` | Null input — build JSON from scratch |
| `-s` | Slurp — read all input into one array |
| `--arg key val` | Bind a shell variable for use in the filter |
| `--argjson key val` | Bind a JSON-typed variable |

---

## See Also

- [curl](/wiki/curl) — fetch JSON from APIs to pipe into jq
- [awk](/wiki/awk) — for non-JSON structured text processing
- [grep](/wiki/grep) — pre-filter log lines before parsing with jq
