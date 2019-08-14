---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
feature: false
image: binoculars-black-equipment-large.jpg
show: true
tags: ["linux"]
title: grep
updated:
---
The `grep` command searches the given file for lines containing a match to the given strings or words. Search
‘/etc/passwd‘ for ‘mhassel‘ user.

```shell
$ export GREP_COLOR='1;37;41'
$ grep --color='auto' mhassel /etc/passwd
mhassel:x:500:500::/home/mhassel:/bin/bash
```

The search through all the files and directories for a given string such as 'mhassel', use the below command:

```shell
$ grep -r --color='auto' 'mhassel' /tmp/
```
