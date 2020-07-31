---
author: mhassel
categories: ["linux"]
created: 2018-02-02 00:00:00 -0600
feature: false
image:
show: true
tags: ["command line", "linux"]
title: lsof
updated:
---
# Summary

The command 'lsof' is used and short for list open files.

# Usage Examples

## List all network connections

```sh
# lsof -i
```

## List all processes listening on a particular port

```sh
# lsof -i :80
COMMAND   PID   USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
httpd   37813   root    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37826 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37827 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37828 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37829 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37830 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37831 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37832 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
httpd   37833 apache    4u  IPv4 3609901      0t0  TCP *:http (LISTEN)
```

## List all TCP or UDP connections

```sh
 # lsof -i tcp
 # lsof -i udp
```

## List all IPv4 or IPv6 network files

```sh
# lsof -i 4
# lsof -i 6
```

## List all network files using TCP port ranges from 1-1024

```sh
# lsof -i TCP:1-1024
```

## List all network files in use by a specific process

```sh
# lsof -i  -a -p <pid>
```

## List active connections

```sh
# lsof -LnPTqs
# lsof -LnPTqs | grep -i 10.100
```

## List reads and writes of a directory

```sh
# lsof <path> | grep -e "[[:digit:]]\+r\|[[:digit:]]\+w"
```

## List NFS files

```sh
# lsof -N
```

# Sysctl Help

## List count of file descriptors in kernel memory

```sh
# sysctl fs.file-nr
fs.file-nr = 26360	0	16401474
```

# Scenario Based Examples

## Process holding open (deleted) files

A process may be unable to write to a given directory and may state there is no space left on the
device, but the ouput of [`df`](/wiki/df/) shows there is plenty of space left. In this scenario,
it may be likely that the process is holding a lock on file(s) that have been 'deleted', and `lsof`
can help determine if that is the case.

Reviewing the output of the lsof command, take note of lines with '(deleted)' in them. The '(deleted)'
string means the file has been deleted, but it could not be removed because it is locked by a running
process. To resolve this issue, the process holding the files opened would need to be stopped to
release the file locks, freeing up disk space.

**BONUS**
If in a bind and the process cannot be stopped, it is possible to track down file descriptor(s)
in `/proc/<pid>/fd/` and zero the 'deleted' file. That process may look something like the below:

```sh
# > /proc/<pid>/fd/4
```

_Referenced commands:_ [`df`](/wiki/df)