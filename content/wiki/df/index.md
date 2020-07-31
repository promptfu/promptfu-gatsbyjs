---
author: mhassel
categories: ["linux"]
created: 2017-02-02 00:00:00 -0600
feature: false
image:
show: true
tags: ["command line", "linux"]
title: df
updated:
---
# Summary

The `df` command may be used to check disk space.

# Usage Examples

## Display the output of df command in human readable format

The below command will print the sizes of a machine's disks in human
readable format (e.g. 1K, 234M, 2G)

```sh
# df -h
```

## Display ouput in human readable format for local storage only (no remote storage such as NFS)

```sh
# df -h -l
```
## Display inode information of the file system

```sh
# df -i
```

## Find the top 20 inode consumers (of var):

```sh
# find /var -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -nr | head -n 20
```

## List disk usage of all the file systems using '-a'

```sh
# df -a
```

## Print file system type of all mounted file systems

```sh
# df -T
```

## Print disk usage of file systems in block-size

```sh
# df -k
```
