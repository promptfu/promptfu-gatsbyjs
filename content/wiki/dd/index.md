---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
description: dd
feature: false
show: true
tags: ["linux"]
title: dd
updated:
---
# Summary

The `dd` command stands for (**Convert** and **Copy a file**). This utility can be used to convert and copy a file, and
most of the time is used to copy a iso file (or any other file) to a USB device (or any other location) to make a
‘**Bootlable**‘ USB stick.

```sh
root@example.com:~# dd if=/home/user/Downloads/debian.iso of=/dev/sdb1 bs=512M; sync
```

Note: In the above example the usb device is supposed to be sdb1 (You should verify it using command `lsblk` , otherwise
you will overwrite your disk and OS), use name of disk very cautiously!!!.


The `dd` command takes some time ranging from a few seconds to several minutes in execution, depending on the size and
type of file and read and write speed of USB stick.

_Other references:_
 - [http://www.tecmint.com/useful-linux-commands-for-newbies/](http://www.tecmint.com/useful-linux-commands-for-newbies/)
