---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
description: apropos
feature: false
show: true
tags: ["linux"]
title: apropos
updated:
---
# Summary

This command is used to search a keyword for string phrases across man pages, and will return the command, count of
the keywords, and a brief description of the command.

An example command usage is below:
```shell
$ apropos partition
addpart              (8)  - simple wrapper around the add partition ioctl
cfdisk               (8)  - Curses based disk partition table manipulator for Linux
delpart              (8)  - simple wrapper around the del partition ioctl
fdisk                (8)  - Partition table manipulator for Linux
GNU Parted [parted]  (8)  - a partition manipulation program
iostat               (1)  - Report Central Processing Unit (CPU) statistics and input/output statistics for devices, partitions and network filesystems (NFS)
kpartx               (8)  - Create device maps from partition tables
partprobe            (8)  - inform the OS of partition table changes
partx                (8)  - telling the kernel about presence and numbering of on-disk partitions
pvcreate             (8)  - initialize a disk or partition for use by LVM
pvresize             (8)  - resize a disk or partition in use by LVM2
sfdisk               (8)  - Partition table manipulator for Linux
```

_Referenced commands:_ [`man`](/wiki/man)
