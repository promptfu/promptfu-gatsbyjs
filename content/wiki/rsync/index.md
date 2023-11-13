---
author: mhassel
categories: ["linux"]
created: 2021-11-04 09:28:00 -0600
description: rsync
feature: true
image: colorful-colourful-lan-large.jpg
show: true
tags: ["command line", "linux"]
title: rsync
updated:
---
Rsync between hosts, using a jump host's ssh keys as the intermediary:

```shell
cat raw.old.new.list | awk '{ print( " ssh " $1 " \x27 " "rsync -avP /app/users " $2 ":/app \x27 ") }'
# and to run it...
cat raw.old.new.list | awk '{ system( " ssh -A " $1 " \x27 " "rsync -avP /app/users " $2 ":/app \x27 ") }'
```
