---
author: mahssel
categories: ["windows"]
created: 2016-10-25 00:00:00 -0600
description: putty
feature: false
image:
show: true
tags: ["linux", "windows", "command line"]
title: putty
updated:
---
# Export Putty Registry Settings

This includes settings for putty and any session information:

```sh
regedit /e "%userprofile%\Desktop\putty.reg" HKEY_CURRENT_USER\Software\SimonTatham
```

# Color Scheme

  * Default Foreground: 255/255/255
  * Default Background: 51/51/51
  * ANSI Black: 77/77/77
  * ANSI Green: 152/251/152
  * ANSI Yellow: 240/230/140
  * ANSI Blue: 205/133/63
  * ANSI Blue Bold 135/206/235
  * ANSI Magenta: 255/222/173 or 205/92/92
  * ANSI Cyan: 255/160/160
  * ANSI Cyan Bold: 255/215/0
  * ANSI White: 245/222/179

