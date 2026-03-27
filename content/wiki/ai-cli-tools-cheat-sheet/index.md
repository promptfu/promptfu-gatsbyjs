---
author: mhassel
categories: ["ai", "developer tools"]
created: 2025-10-20 14:00:00 -0500
feature: true
image: ai-cli-tools-cheat-sheet.jpg
show: true
tags: ["ai", "cli", "chatgpt", "github copilot", "command line", "cheat sheet"]
title: AI CLI Tools Cheat Sheet
updated: 2025-10-20 14:00:00 -0500
---

# Quick Reference: Essential AI Command Line Tools

A fast reference guide for the most useful AI-powered CLI tools for developers and DevOps engineers.

## GitHub Copilot CLI

### Installation
```bash
# Install GitHub CLI
brew install gh

# Install Copilot extension
gh extension install github/gh-copilot

# Authenticate
gh auth login
```

### Essential Aliases
```bash
# Add to ~/.bashrc or ~/.zshrc
alias '??'='gh copilot suggest'
alias 'explain'='gh copilot explain'
```

### Common Commands
```bash
# Get command suggestions
?? find all files larger than 100MB

# Explain a command
explain "tar -czf backup.tar.gz --exclude='node_modules' ."

# Git operations
?? show commits by author in last week

# Docker cleanup
?? remove all stopped containers

# Process management
?? what process is using port 3000
```

### Cost
- $10/month (individual)
- $19/user/month (business)
- Includes IDE Copilot + CLI + Chat

---

## ShellGPT

### Installation
```bash
pip install shell-gpt

# Set API key
export OPENAI_API_KEY="your-key-here"
```

### Usage Patterns
```bash
# Ask questions
sgpt "how do I list all docker containers"

# Generate scripts
sgpt "bash script to backup mysql database"

# Explain commands
sgpt --explain "awk '{s+=$1} END {print s}'"

# Generate code
sgpt --code "python function to parse JSON"

# Execute mode (use with caution)
sgpt --shell "compress all log files"
```

### Configuration
```bash
# Use GPT-3.5 for cost savings
sgpt --model gpt-3.5-turbo "your query"

# Use GPT-4 for complex tasks
sgpt --model gpt-4 "your query"
```

### Cost
- Pay-per-use OpenAI API
- GPT-3.5: ~$0.002 per query
- GPT-4: ~$0.03 per query
- Average: $2-10/month

---

## Warp Terminal

### Installation
```bash
# macOS
brew install --cask warp

# Linux beta - check warp.dev
```

### AI Features

**Command Search** - `Cmd+K` (macOS) / `Ctrl+K` (Linux)
```
Type natural language:
"compress this folder"
"find python files modified today"
"check port 8080"
```

**Workflows** - Save reusable commands
```yaml
name: Docker Cleanup
commands:
  - docker container prune -f
  - docker image prune -f
  - docker volume prune -f
```

**AI Command Completion** - Automatic suggestions as you type

### Cost
- Free for individuals
- Teams plan: $15/user/month

---

## Aider - AI Pair Programming

### Installation
```bash
pip install aider-chat

# Set API key
export OPENAI_API_KEY="your-key"
```

### Usage
```bash
# Start aider with files
aider src/app.py src/utils.py

# Chat commands
> Add error handling to database connections
> Refactor to use async/await
> Add unit tests for UserService
> Create a new function to validate emails

# Git integration
> /commit  # Commits with AI-generated message
> /diff    # Show changes
> /undo    # Undo last change
```

### Best Practices
```bash
# Be specific
aider --message "Add type hints to all functions in utils.py"

# Use with git
aider --auto-commits  # Auto-commit each change

# Specify model
aider --model gpt-4  # For complex refactoring
```

### Cost
- Free software, pays OpenAI API costs
- GPT-4: ~$0.03-0.06 per change
- Average: $5-15/month

---

## k8sgpt - Kubernetes Troubleshooting

### Installation
```bash
# macOS
brew tap k8sgpt-ai/k8sgpt
brew install k8sgpt

# Linux
curl -sL https://github.com/k8sgpt-ai/k8sgpt/releases/latest/download/k8sgpt_linux_amd64.tar.gz | tar xz
sudo mv k8sgpt /usr/local/bin/
```

### Setup
```bash
# Add backend (OpenAI)
k8sgpt auth add openai

# Configure
export K8SGPT_MODEL=gpt-3.5-turbo
```

### Common Commands
```bash
# Analyze cluster
k8sgpt analyze

# Analyze with explanations
k8sgpt analyze --explain

# Analyze specific namespace
k8sgpt analyze --namespace production

# Filter by issue type
k8sgpt analyze --filter Pod,Service

# Output as JSON
k8sgpt analyze --output json
```

### Example Output
```bash
$ k8sgpt analyze --explain

- Pod api-server is CrashLooping
  Reason: Container exited with code 137 (OOMKilled)
  Solution: Increase memory limits:
    resources:
      limits:
        memory: "512Mi"  # Increase from current value
```

### Cost
- Free software
- OpenAI API costs: ~$0.01-0.05 per analysis

---

## Mods - Simple ChatGPT CLI

### Installation
```bash
brew install charmbracelet/tap/mods
```

### Usage
```bash
# Ask questions
mods "explain kubernetes ingress"

# Pipe input
git diff | mods "summarize these changes"

# Generate content
mods -f "write terraform module for S3 bucket"

# Continue conversation
mods -c "tell me more about that"

# Use different model
mods -m gpt-4 "complex query here"
```

### Tricks
```bash
# Code review
git diff main | mods "review this code for bugs and improvements"

# Documentation
cat script.sh | mods "add comments explaining this script"

# Learning
mods "explain async/await in JavaScript with examples"
```

### Cost
- Free software
- OpenAI API costs: ~$0.002-0.03 per query

---

## Comparison Table

| Tool | Best For | Cost/Month | Context Aware | Language |
|------|----------|------------|---------------|----------|
| GitHub Copilot CLI | General purpose | $10 fixed | ✅ | Any |
| ShellGPT | Flexibility | $2-10 usage | Partial | Any |
| Warp | macOS terminal | Free-$15 | ✅ | Any |
| Aider | Code editing | $5-15 usage | ✅ (code) | Code |
| k8sgpt | Kubernetes | $1-5 usage | ✅ (k8s) | YAML |
| Mods | Quick queries | $2-5 usage | ❌ | Any |

---

## Quick Decision Guide

**Choose GitHub Copilot CLI if:**
- You want one tool for everything
- You prefer fixed monthly cost
- You already use Copilot in your IDE

**Choose ShellGPT if:**
- You want maximum flexibility
- You need offline model support
- You want pay-per-use pricing

**Choose Warp if:**
- You're on macOS
- You want the best UI/UX
- You want built-in terminal improvements

**Choose Aider if:**
- You do lots of refactoring
- You want AI to directly edit files
- You work in large codebases

**Choose k8sgpt if:**
- You manage Kubernetes clusters
- You need specialized K8s diagnostics
- You want automated troubleshooting

**Choose Mods if:**
- You want something simple and fast
- You just need quick ChatGPT access
- You prefer minimal setup

---

## Cost Optimization Tips

### 1. Use GPT-3.5 for Simple Tasks
```bash
# ShellGPT
sgpt --model gpt-3.5-turbo "simple query"

# Aider
aider --model gpt-3.5-turbo

# Mods
mods -m gpt-3.5-turbo "query"
```

### 2. Cache Common Queries
```bash
# Create aliases for frequent queries
alias explain-docker='sgpt "explain docker commands"'
alias k8s-help='mods -f k8s-help.txt'
```

### 3. Combine Free + Paid
- Use Copilot CLI ($10/mo fixed) for 80% of tasks
- Use ShellGPT for specialized needs
- Total cost: ~$10-15/month

---

## Pro Tips

### Combine Tools Effectively
```bash
# Use Copilot for command generation
?? find all TypeScript errors

# Use ShellGPT for explanation
sgpt --explain "<paste complex command>"

# Use Aider for code fixes
aider src/app.ts
> Fix the TypeScript errors found
```

### Context is King
```bash
# Bad
?? fix this

# Good
?? fix PostgreSQL connection timeout in Node.js Express app

# Bad
sgpt "optimize"

# Good
sgpt "optimize this PostgreSQL query for a table with 10M rows"
```

### Safety First
```bash
# Always review before executing
?? delete old files
# Review the command before running!

# Use --explain for dangerous commands
explain "rm -rf /"  # Understand before executing!
```

---

## Common Workflows

### 1. Debugging Production Issue
```bash
# Step 1: Diagnose with k8sgpt
k8sgpt analyze --namespace production

# Step 2: Get logs
?? get last 100 lines of failed pod logs

# Step 3: Analyze error
<paste error> | sgpt "explain this error and suggest fix"

# Step 4: Fix code
aider src/api/handler.ts
> Fix the error mentioned in the logs
```

### 2. Learning New Technology
```bash
# Understand concept
mods "explain GraphQL vs REST with examples"

# Generate starter code
sgpt --code "GraphQL server with Apollo"

# Get specific commands
?? set up GraphQL server with Node.js
```

### 3. Daily Development
```bash
# Morning: Check overnight changes
?? summarize git commits from last 24 hours

# During work: Quick lookups
?? regex to match email addresses

# End of day: Commit message
git diff --cached | mods "write clear commit message"
```

---

## Troubleshooting

### API Key Issues
```bash
# Check if key is set
echo $OPENAI_API_KEY

# Set in profile
echo 'export OPENAI_API_KEY="sk-..."' >> ~/.bashrc
source ~/.bashrc
```

### Rate Limits
```bash
# OpenAI rate limits - wait and retry
# Or use GPT-3.5 for higher limits

# GitHub Copilot - no rate limits
```

### Command Not Found
```bash
# Ensure tool is in PATH
which gh
which sgpt
which mods

# Reinstall if needed
pip install --upgrade shell-gpt
```

---

## Resources

- [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- [ShellGPT GitHub](https://github.com/TheR1D/shell_gpt)
- [Warp Terminal](https://www.warp.dev/)
- [Aider Documentation](https://aider.chat/)
- [k8sgpt Project](https://k8sgpt.ai/)
- [Mods GitHub](https://github.com/charmbracelet/mods)

---

## See Also

- [Prompt Engineering Patterns](/wiki/prompt-engineering-patterns) — get better results from every AI CLI tool with proven prompt patterns
- [Promptfoo Cheat Sheet](/wiki/promptfoo-cheat-sheet) — test and evaluate your prompts systematically before committing them
- [AI-Powered Command Line Tools Every Developer Should Know](/blog/ai-powered-command-line-tools-2025) — in-depth guide to the tools listed above

---

*Last updated: November 21, 2025*
