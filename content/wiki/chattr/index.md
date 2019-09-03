---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
feature: false
show: true
tags: ["command line", "linux"]
title: chattr
updated:
---
# Summary

`chattr` is use to change file attributes on a Linux file system.

The format of a symbolic mode is +-=[acdeijstuADST].

The operator ‘+’ causes the selected attributes to be added to the existing attributes of the files; ‘-’ causes them
to be removed; and ‘=’ causes them to be the only attributes that the files have.

The letters ‘acdeijstuADST’ select the new attributes for the files:
- append only (a)
- compressed (c)
- no dump (d)
- extent format (e)
- immutable (i)
- data journalling (j)
- secure deletion (s)
- no tail-merging (t)
- undeletable (u)
- no atime updates (A)
- synchronous directory updates (D)
- synchronous updates (S)
- top of directory hierarchy (T).

# Usage

## Make a file immutable

Making a file immutable means it cannot be changed.

```shell
$ chattr +i <filename>
```

## Remove file immutable

```shell
$ chattr -i <filename>
```
