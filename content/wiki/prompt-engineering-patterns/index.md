---
author: mhassel
categories: ["ai", "prompt engineering"]
created: 2025-11-05 15:00:00 -0600
feature: true
image: prompt-engineering-patterns.jpg
show: true
tags: ["ai", "prompt engineering", "chatgpt", "claude", "best practices", "patterns"]
title: Prompt Engineering Patterns - Quick Reference
updated: 2025-11-05 15:00:00 -0600
---

# Essential Prompt Engineering Patterns

A quick reference guide of proven prompt patterns that work consistently across ChatGPT, Claude, GitHub Copilot, and other LLMs.

## Pattern 1: Specification-First

**When to use:** Building new features, generating code, creating content

**Template:**
```
I need to [objective]. Here are the requirements:

**Tech Stack:** [languages, frameworks]
**Functionality:**
- [requirement 1]
- [requirement 2]

**Constraints:**
- [constraint 1]
- [constraint 2]

**Output Format:** [desired format]

Provide [level of detail].
```

**Example:**
```
I need to implement rate limiting for my API. Here are the requirements:

**Tech Stack:** Node.js, Express, Redis
**Functionality:**
- Limit to 100 requests per minute per IP
- Return 429 status when exceeded
- Include retry-after header

**Constraints:**
- Must work across multiple server instances
- Should be reusable middleware

**Output Format:** Complete Express middleware code with comments

Provide production-ready code with error handling.
```

---

## Pattern 2: Role-Based

**When to use:** Need specialized expertise or perspective

**Template:**
```
You are a [role] with expertise in [domain].

[Context and situation]

[Specific question or task]

[Expected output format]
```

**Example:**
```
You are a senior DevOps engineer with 10 years of Kubernetes experience.

I'm seeing OOMKilled errors on my production pods. Here's my deployment:

[paste deployment.yaml]

Diagnose the issue and provide:
1. Root cause analysis
2. Immediate fix
3. Long-term solution
4. Monitoring recommendations
```

---

## Pattern 3: Chain-of-Thought

**When to use:** Complex problems requiring logical reasoning

**Template:**
```
Think through this step by step:

1. First, [step 1]
2. Then, [step 2]
3. Finally, [step 3]

[Problem description]
```

**Example:**
```
Think through this step by step:

1. First, analyze what makes this query slow
2. Then, identify optimization opportunities
3. Finally, provide the optimized query

Query:
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.created_at > '2024-01-01'
ORDER BY o.total DESC

Database: PostgreSQL 15, 10M rows
```

---

## Pattern 4: Few-Shot Learning

**When to use:** Want consistent style/format across multiple outputs

**Template:**
```
Follow this pattern:

Example 1:
[input] → [output]

Example 2:
[input] → [output]

Now do the same for:
[new inputs]
```

**Example:**
```
Generate error handlers following this pattern:

Example 1:
NotFoundError → { status: 404, message: 'Resource not found' }

Example 2:
ValidationError → { status: 400, message: 'Invalid input', errors: [...] }

Now create handlers for:
- DatabaseError
- AuthenticationError
- RateLimitError
```

---

## Pattern 5: Context Stacking

**When to use:** Working within a specific project/environment

**Template:**
```
Project context:
- Type: [project type]
- Tech: [stack]
- Structure: [architecture]

Current state:
[describe current implementation]

Task:
[what you need to do]

Consider:
[specific constraints or preferences]
```

**Example:**
```
Project context:
- Type: E-commerce REST API
- Tech: Python FastAPI, PostgreSQL, Redis
- Structure: Microservices with event-driven architecture

Current state:
We have user authentication working with JWT tokens

Task:
Add password reset functionality

Consider:
- Must send reset emails asynchronously
- Token should expire in 1 hour
- Should rate-limit reset requests
```

---

## Pattern 6: Iterative Refinement

**When to use:** First output wasn't quite right

**Template:**
```
[Previous output wasn't perfect]

Improve this by:
- [specific change 1]
- [specific change 2]
- [specific change 3]

[Context if needed]
```

**Example:**
```
The previous function doesn't handle edge cases.

Improve this by:
- Add null/undefined checks
- Handle empty arrays
- Add TypeScript type guards
- Include JSDoc comments

Maintain the same core logic.
```

---

## Pattern 7: Comparative Analysis

**When to use:** Choosing between options or understanding trade-offs

**Template:**
```
Compare [option A] vs [option B] for [use case].

Consider:
- [criterion 1]
- [criterion 2]
- [criterion 3]

Provide:
- Summary table
- Recommendation with reasoning
```

**Example:**
```
Compare PostgreSQL vs MongoDB for a social media application.

Consider:
- Scalability (expected 1M users)
- Query patterns (mostly reads, some complex joins)
- Development speed
- Cost at scale

Provide:
- Feature comparison table
- Recommendation with reasoning
- Migration complexity if we change later
```

---

## Pattern 8: Debug Detective

**When to use:** Troubleshooting errors

**Template:**
```
I'm encountering [issue].

**What I'm trying to do:** [goal]
**What's happening:** [actual behavior]
**What I expected:** [expected behavior]

**Code:**
```[language]
[code snippet]
```

**Error:**
```
[exact error message]
```

**Environment:** [versions, OS]

Diagnose and provide:
1. Root cause
2. Fix
3. Prevention for future
```

---

## Pattern 9: Code Review Request

**When to use:** Getting feedback on code quality

**Template:**
```
Review this [language] code for:
- [aspect 1: security/performance/readability]
- [aspect 2]

```[language]
[code]
```

Provide:
1. Issues (severity: high/medium/low)
2. Specific improvements
3. Refactored version
```

**Example:**
```
Review this Python code for security and best practices:

```python
def login(username, password):
    query = f"SELECT * FROM users WHERE username='{username}'"
    result = db.execute(query)
    return result.fetchone()
```

Provide:
1. Security issues (severity levels)
2. Best practice violations
3. Secure, production-ready version
```

---

## Pattern 10: Test-Driven Prompt

**When to use:** Want implementation that matches specific tests

**Template:**
```
Implement a function that passes these tests:

```[language]
[test cases]
```

Requirements:
- [requirement 1]
- [requirement 2]

Provide the implementation with explanation.
```

**Example:**
```
Implement a function that passes these tests:

```javascript
test('validates email format', () => {
  expect(isValidEmail('user@example.com')).toBe(true);
  expect(isValidEmail('invalid')).toBe(false);
});

test('rejects emails with special chars in domain', () => {
  expect(isValidEmail('user@exam!ple.com')).toBe(false);
});
```

Requirements:
- Use regex
- Include JSDoc comments
- Handle null/undefined gracefully

Provide the implementation with explanation.
```

---

## Quick Reference Table

| Pattern | Best For | Complexity | Output Quality |
|---------|----------|------------|----------------|
| Specification-First | New features | Low | ⭐⭐⭐⭐⭐ |
| Role-Based | Expert advice | Low | ⭐⭐⭐⭐ |
| Chain-of-Thought | Complex logic | Medium | ⭐⭐⭐⭐⭐ |
| Few-Shot Learning | Consistent format | Medium | ⭐⭐⭐⭐⭐ |
| Context Stacking | Project work | Medium | ⭐⭐⭐⭐ |
| Iterative Refinement | Improvements | Low | ⭐⭐⭐⭐ |
| Comparative Analysis | Decision making | Medium | ⭐⭐⭐⭐ |
| Debug Detective | Troubleshooting | Low | ⭐⭐⭐⭐⭐ |
| Code Review | Quality check | Low | ⭐⭐⭐⭐ |
| Test-Driven | TDD approach | High | ⭐⭐⭐⭐⭐ |

---

## Advanced Modifiers

Add these to any pattern for better results:

### Specificity Modifiers
```
Be specific about [aspect]
Include edge cases for [scenario]
Assume [context]
```

### Format Modifiers
```
Format as [markdown/JSON/code/table]
Use [language] syntax
Include [comments/types/tests]
```

### Constraint Modifiers
```
Without using [library/approach]
Must be compatible with [version]
Should follow [style guide]
```

### Output Control
```
Keep it concise
Provide detailed explanation
Show examples
Include alternatives
```

---

## Common Mistakes to Avoid

### ❌ Too Vague
```
Write code for authentication
```

### ✅ Specific
```
Write a Node.js Express middleware for JWT authentication that:
- Verifies token from Authorization header
- Returns 401 if invalid
- Attaches user object to req.user
- Handles expired tokens gracefully
```

---

### ❌ No Context
```
Fix this bug
```

### ✅ With Context
```
This React component throws "Cannot read property 'map' of undefined"
when the API returns an empty response. Fix it to:
- Handle null/undefined safely
- Show loading state
- Display error message
```

---

### ❌ Accepting First Output
```
[Takes first response and uses it]
```

### ✅ Iterating
```
Good start, but improve by:
- Adding TypeScript types
- Handling edge case of empty array
- Making it more performant for large datasets
```

---

## Tool-Specific Tips

### ChatGPT / Claude
- Can handle longer, more detailed prompts
- Excels at explanation and teaching
- Good for multi-step tasks

**Example:**
```
Explain microservices architecture, then design one for an
e-commerce platform, then provide implementation for the
user service including API endpoints, database schema, and
Docker configuration.
```

### GitHub Copilot (IDE)
- Works best with comments above code
- Leverages context from open files
- Prefers concise, directive comments

**Example:**
```javascript
// Function that fetches user profile from API,
// caches in localStorage, expires after 1 hour,
// returns null on error
async function getUserProfile(userId) {
```

### GitHub Copilot CLI
- Conversational, natural language
- Context-aware of current directory
- Excellent for command generation

**Example:**
```bash
?? find all JavaScript files that import React but
   don't use hooks, exclude node_modules
```

---

## Prompt Template Library

### API Endpoint Generation
```
Create a [METHOD] endpoint for [purpose] using [framework].

Route: [path]
Request: [body schema]
Response: [response schema]
Auth: [requirements]
Validation: [rules]

Include error handling and logging.
```

### Database Query
```
Write a [SQL/NoSQL] query to [purpose].

Database: [type, version]
Tables/Collections: [schema]
Performance: [requirements]

Optimize for [criterion] and explain indexes needed.
```

### Refactoring
```
Refactor this to [goal]:

```[language]
[original code]
```

Maintain: [what stays same]
Improve: [what changes]
Add: [new features]

Show diff and explain changes.
```

### Documentation
```
Generate [type] documentation for:

```[language]
[code]
```

Include:
- Overview
- Parameters/Props
- Return value
- Examples
- Edge cases

Format: [style]
```

---

## Measuring Prompt Quality

Good prompts have:

✅ **Clear objective** - Know what you want  
✅ **Sufficient context** - Provide background  
✅ **Specific constraints** - Define boundaries  
✅ **Output format** - Specify structure  
✅ **Examples** (when helpful) - Show patterns  

Track your success rate:
- First-try success: aim for 80%+
- Iterations needed: aim for ≤2
- Time saved: measure against manual approach

---

## Pro Tips

**1. Build a personal prompt library**
Save prompts that work well for your common tasks.

**2. Start broad, then narrow**
First get a general solution, then refine with specifics.

**3. Use examples from your codebase**
Show the AI your coding style for consistent output.

**4. Iterate on prompts, not just outputs**
Improve the prompt for next time, not just this time.

**5. Combine patterns**
Mix and match for complex tasks:
```
You are a senior [role-based] with experience in [context].

Think through this step by step [chain-of-thought]:
1. [step 1]
2. [step 2]

[specification-first requirements]
```

---

## Resources

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Learn Prompting](https://learnprompting.org/)
- [Prompt Engineering Guide (DAIR.AI)](https://www.promptingguide.ai/)

---

*Last updated: November 21, 2025*
