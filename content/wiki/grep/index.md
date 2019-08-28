---
author: mhassel
categories: ["linux"]
created: 2019-08-27 12:01:00 -0500
feature: false
image: binoculars-black-equipment-large.jpg
show: true
tags: ["linux", "command line"]
title: grep
updated: 2019-08-27 12:01:00 -0500
---
The `grep` command searches the given file for lines containing a match to the given strings or words. As an example, search ‘./package.json‘ for ‘gatsby-plugin-twitter‘:

```shell
$ export GREP_COLOR='1;37;41'
$ grep --color='auto' gatsby-plugin-twitter package.json
    "gatsby-plugin-twitter": "^2.1.2",
```

To search through all the files and directories for a given string such as 'gatsby-plugin-twitter', pass the `-r` (or `--recursive`) flag:

```shell
$ export GREP_COLOR='1;37;41'
$ grep -r --color='auto' 'gatsby-plugin-twitter' /tmp
/tmp/package.json:    "gatsby-plugin-twitter": "^2.1.2",
```
