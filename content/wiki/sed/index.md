---
author: mhassel
categories: ["linux"]
created: 2015-10-30 00:00:00 -0600
feature: true
image: binoculars-black-equipment-large.jpg
show: true
tags: ["command line", "linux"]
title: sed
updated: 2020-11-02 08:09:00 -0600
---
# Summary

`sed` is a stream editor. A stream editor is used to perform basic text transformations on an input stream (a file or
input from a pipeline). While in some ways similar to an editor which permits scripted edits (such as `ed`), `sed`
works by making only one pass over the input(s), and is consequently more efficient. But it is `sed`’s ability to
filter text in a pipeline which particularly distinguishes it from other types of editors.
<!--more-->

#  Usage

## Delete a line from file

```shell
$ sed -e '/<pattern>/d' -i <input file>"
```

## Commenting or uncommenting a pattern matched line

```shell
$ sed -e '/<pattern>/s/^/#/g' -i <input file> # (to comment out)
$ sed -e '/<pattern>/s/^#//g' -i <input file> # (to uncomment)
```

# Examples

## Deleting a line from a file

Below is an `ls` of the test file's directory and its  file content. The file has four lines, and the third line should
be removed from the file. This file is very important and may require a rollback. To ensure a backup is made, to ease
the rollback process, an extra option, `-i<SUFFIX>`, will be utilized. The extra option allows editing the file in
place, and creates a backup file in case a rollback is required.

```shell
$ ls
test
```

```shell
$ cat test
This is my first line
This is my second line
This is my third line - delete me
This is my last line
```

```shell
$ sed -e '/delete me/d' -i.backup test
```

Below is an `ls` of the test file's directory and its file content after the line has been removed, and a `diff` of the
edited and backup file.

```shell
$ ls
test  test.backup
```

```shell
$ cat test
This is my first line
This is my second line
This is my last line
```

```shell
$ diff test test.backup
2a3
> This is my third line - delete me
```

_Referenced commands:_ `cat`, `diff`, `ed`, `ls`
