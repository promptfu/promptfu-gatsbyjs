---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
description: quota
feature: false
layout: wiki
show: true
tags: ["linux"]
title: quota
updated:
---
# Summary

The quota command is used to view what quotas a given file system has set.

# Usage

View all quotas:

```sh
$ quota
Disk quotas for user hasselm (uid 39581):
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
uschi12nfs01.matthassel.com:/uschi12nfs01_home0/home0/hasselm
                2605130       0 41943040           14680       0       0
```
