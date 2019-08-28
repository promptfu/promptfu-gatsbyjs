---
author: Matthew Hassel
categories: ["linux"]
created: 2019-08-27 12:01:00 -0500
feature: false
image: stress-large.jpg
show: true
tags: ["linux", "command line"]
title: stress
updated: 2019-08-27 12:01:00 -0500
---
I cannot `stress` it enough... use this utility! It is really convenient for, well..., stressing a system. The utility
has several commandline arguments to target various components.

For example, if you would like to use up a whole mess of RAM:

```shell
$ stress -m 1 --vm-bytes 50G --vm-keep
```
<!--more-->
