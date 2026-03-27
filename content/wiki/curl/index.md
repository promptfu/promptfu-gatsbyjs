---
author: mhassel
categories: ["linux"]
created: 2026-03-27 00:00:00 -0600
description: curl transfers data to or from a server using any of its supported protocols — the universal Swiss Army knife for HTTP, APIs, and AI services.
feature: false
image: colorful-colourful-lan-large.jpg
show: true
tags: ["command line", "linux", "http", "api", "networking"]
title: curl
updated: 2026-03-27 00:00:00 -0600
---
# Summary

`curl` transfers data to or from a server. It supports dozens of protocols — HTTP, HTTPS, FTP, WebSocket,
and more — but its killer use case is driving HTTP APIs from the command line. If you're working with REST
services, AI APIs, or webhooks, `curl` is the tool you reach for first.
<!--more-->

# Usage

```shell
curl [options] <url>
```

By default, `curl` sends a GET request and prints the response body to stdout.

# Examples

## Basic GET request

```shell
curl https://httpbin.org/get
```

## Follow redirects

```shell
curl -L https://example.com
```

`-L` (or `--location`) follows HTTP redirects automatically.

## Send a POST request with a JSON body

```shell
curl -X POST https://api.example.com/messages \
  -H "Content-Type: application/json" \
  -d '{"text": "hello"}'
```

`-H` adds a header; `-d` sets the request body and implies POST.

## Pass an API key in a header

```shell
curl https://api.example.com/v1/data \
  -H "Authorization: Bearer $API_KEY"
```

Environment variable expansion keeps secrets out of shell history.

## Call the Anthropic Claude API

```shell
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Explain curl in one sentence."}]
  }'
```

## Save response to a file

```shell
curl -o output.json https://api.example.com/data
```

`-o` writes the response body to a file instead of stdout.

## Download a file (show progress bar)

```shell
curl -# -o archive.tar.gz https://example.com/archive.tar.gz
```

`-#` shows a simple `#`-based progress bar.

## Silent mode (suppress progress meter)

```shell
curl -s https://api.example.com/health | jq .
```

`-s` suppresses the progress meter so the raw output pipes cleanly into [`jq`](/wiki/jq).

## Show response headers only

```shell
curl -I https://example.com
```

`-I` (or `--head`) sends a HEAD request and prints headers.

## Show both headers and body

```shell
curl -i https://api.example.com/status
```

## Pass form data (multipart)

```shell
curl -F "file=@report.pdf" -F "title=Q1 Report" https://api.example.com/upload
```

## Set a timeout

```shell
curl --max-time 10 https://slow.example.com/endpoint
```

Fail after 10 seconds if no response is received.

## Retry on failure

```shell
curl --retry 3 --retry-delay 2 https://flaky.example.com/api
```

## Use a config file to store common flags

```shell
# ~/.curlrc
silent
header = "Authorization: Bearer $MY_TOKEN"
```

Then just run `curl https://api.example.com/data` — flags from `~/.curlrc` apply automatically.

## Stream server-sent events (SSE)

```shell
curl -N -H "Accept: text/event-stream" https://api.example.com/stream
```

`-N` disables output buffering so streaming responses arrive in real time — useful for AI streaming APIs.

# Common Flags Quick Reference

| Flag | Meaning |
|------|---------|
| `-X <method>` | HTTP method (GET, POST, PUT, DELETE…) |
| `-H <header>` | Add a request header |
| `-d <data>` | Request body (implies POST) |
| `-o <file>` | Write output to file |
| `-O` | Write to a file named after the remote file |
| `-s` | Silent mode (no progress meter) |
| `-S` | Show errors even in silent mode |
| `-L` | Follow redirects |
| `-I` | HEAD request (headers only) |
| `-i` | Include response headers in output |
| `-v` | Verbose — show full request/response exchange |
| `-u user:pass` | HTTP basic auth |
| `--max-time N` | Abort if request takes longer than N seconds |
| `--retry N` | Retry on transient failure up to N times |
| `-N` | Disable output buffering (streaming) |

---

## See Also

- [jq](/wiki/jq) — parse and filter the JSON that curl returns
- [grep](/wiki/grep) — search through curl response bodies
- [tcpdump](/wiki/tcpdump) — capture the packets curl sends when debugging tricky connections
