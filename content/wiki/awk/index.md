---
author: mhassel
categories: ["linux"]
created: 2026-03-27 00:00:00 -0600
description: awk is a powerful text-processing language for extracting, transforming, and reporting structured data from files and streams.
feature: false
image: binoculars-black-equipment-large.jpg
show: true
tags: ["command line", "linux", "text processing"]
title: awk
updated: 2026-03-27 00:00:00 -0600
---
# Summary

`awk` is a text-processing language designed for structured data. It reads input line by line, splits each line into
fields (separated by whitespace by default), and runs programs against them. Think of it as a programmable [`grep`](/wiki/grep)
that can also compute and reformat output.
<!--more-->

# Usage

The basic invocation pattern is:

```shell
awk 'pattern { action }' file
```

- **pattern** — a condition (or regex) that selects lines; omit it to match every line.
- **action** — what to do with matching lines; omit it to print the whole line.

# Examples

## Print a specific column

`$1`, `$2`, ... refer to whitespace-delimited fields. `$0` is the whole line.

```shell
# Print the second column of /etc/passwd (historically the password hash)
awk -F: '{ print $1, $3 }' /etc/passwd
root 0
daemon 1
bin 2
```

`-F:` sets the field separator to `:`.

## Sum a column of numbers

```shell
ls -l | awk '{ total += $5 } END { print "Total bytes:", total }'
Total bytes: 204800
```

The `END` block runs once after all input is consumed.

## Filter lines by pattern

```shell
# Show only lines where the third field is greater than 1000
awk '$3 > 1000 { print $1, $3 }' /etc/passwd
nobody 65534
```

## Print line count (like wc -l)

```shell
awk 'END { print NR }' /var/log/syslog
```

`NR` is the built-in record (line) counter.

## Reformat CSV output

```shell
# Convert space-separated process list to CSV
ps aux | awk 'NR > 1 { print $1 "," $2 "," $11 }' | head -5
root,1,/sbin/init
root,2,kthreadd
root,3,rcu_gp
```

## One-liner: extract JSON-ish values from logs

```shell
# Pull request IDs out of a log where lines look like: ... requestId=abc123 ...
grep 'requestId' app.log | awk -F'requestId=' '{ print $2 }' | awk '{ print $1 }'
```

## Multi-field conditional

```shell
# Show processes consuming more than 10% CPU
ps aux | awk '$3 > 10 { print $2, $3, $11 }'
```

## BEGIN and END blocks

```shell
awk 'BEGIN { print "PID\tCOMMAND" }
     NR > 1  { print $2 "\t" $11 }
     END     { print "---\nDone." }' <(ps aux)
```

`BEGIN` runs before any input is read; useful for printing headers or initializing variables.

# Common Built-in Variables

| Variable | Meaning |
|----------|---------|
| `NR` | Current line number (total records read) |
| `NF` | Number of fields on the current line |
| `FS` | Input field separator (default: whitespace) |
| `OFS` | Output field separator (default: space) |
| `RS` | Input record separator (default: newline) |
| `$0` | Entire current line |
| `$1`…`$NF` | Individual fields |

---

## See Also

- [grep](/wiki/grep) — filter lines before piping to awk
- [sed](/wiki/sed) — stream editor for line-by-line substitutions
- [xargs](/wiki/xargs) — turn awk output into command arguments
- [jq](/wiki/jq) — awk's JSON-native counterpart for API output
