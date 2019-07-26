---
author: Matthew Hassel
categories: ["linux"]
created: 2019-01-17 00:00:00 -0600
feature: false
image: stress-large.jpg
show: true
tags: ["linux"]
title: stress
updated: 2019-06-24 22:16:00 -0500
---
I cannot `stress` it enough... use this utility! It is really convenient for, well..., stressing a system. The utility
has several commandline arguments to target various components.

For example, if you would like to use up a whole mess of RAM:
<!--more-->

```
$ stress -m 1 --vm-bytes 50G --vm-keep
```

More can be found at this great reference => https://www.tecmint.com/linux-cpu-load-stress-test-with-stress-ng-tool/
