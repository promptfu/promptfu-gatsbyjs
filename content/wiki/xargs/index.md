---
author: Matthew Hassel
categories: ["linux"]
created: 2019-08-27 12:01:00 -0500
description: xargs is a pretty cool command.
feature: false
image: black-and-white-factory-industrial-plant-large.jpg
show: true
tags: ["command line", "linux"]
title: xargs
updated: 2019-08-27 12:01:00 -0500
---
`xargs` is a pretty cool command. Lets say you have a sweet one-liner that returns a list of files you want to do
something with; for example, like coping files from one directory to another. You can do this with just `cp` by itself, I am sure, but I would
rather be safe and pipe to my hearts desires until I get exactly what I want. In this case, and with `xargs`, you can
do just that...
<!--more-->

# Usage

Let me explain the usage example below as it was my first experience using `xargs`. I wanted to put together a kernel
upgrade package, and I wanted to pull all the kernel files for a specific version into a central location so I could
work from there and not mess with anything in my repo. The below command was used to `grep` for the files I wanted:

```shell
$ ls | grep '2.6.32-358.23' | grep -v 'python'
kernel-2.6.32-358.23.2.el6.x86_64.rpm
kernel-debug-2.6.32-358.23.2.el6.x86_64.rpm
kernel-debug-devel-2.6.32-358.23.2.el6.x86_64.rpm
kernel-devel-2.6.32-358.23.2.el6.x86_64.rpm
kernel-firmware-2.6.32-358.23.2.el6.noarch.rpm
kernel-headers-2.6.32-358.23.2.el6.x86_64.rpm
perf-2.6.32-358.23.2.el6.x86_64.rpm
```

Yeah, yeah... not extremely sophisticated; I am sure many know how to `grep` and `-v grep`. At this point I was
like, great... I have my list of files, and now I want to copy them somewhere so I can begin to work with them safely
separated from my repo.

`xargs` command can be used to run a command from standard input. To copy the list of files above to the `/tmp`
directory:

```shell
$ ls | grep '2.6.32-358.23' | grep -v 'python' | xargs -I -t cp {} /tmp
cp kernel-2.6.32-358.23.2.el6.x86_64.rpm /tmp
cp kernel-debug-2.6.32-358.23.2.el6.x86_64.rpm /tmp
cp kernel-debug-devel-2.6.32-358.23.2.el6.x86_64.rpm /tmp
cp kernel-devel-2.6.32-358.23.2.el6.x86_64.rpm /tmp
cp kernel-firmware-2.6.32-358.23.2.el6.noarch.rpm /tmp
cp kernel-headers-2.6.32-358.23.2.el6.x86_64.rpm /tmp
cp perf-2.6.32-358.23.2.el6.x86_64.rpm /tmp
```

Lets talk about the `-I` and `-t` option briefly passed as arguments above...

The `-I` option by default replaces `{}` with the output, one line at a time, in its place, and the `-t` option prints
the output rather than executing the command.

**ls of temp**

```shell
$ ls /tmp | grep '2.6.32-358.23'
kernel-2.6.32-358.23.2.el6.x86_64.rpm
kernel-debug-2.6.32-358.23.2.el6.x86_64.rpm
kernel-debug-devel-2.6.32-358.23.2.el6.x86_64.rpm
kernel-devel-2.6.32-358.23.2.el6.x86_64.rpm
kernel-firmware-2.6.32-358.23.2.el6.noarch.rpm
kernel-headers-2.6.32-358.23.2.el6.x86_64.rpm
perf-2.6.32-358.23.2.el6.x86_64.rpm
```

_Referenced commands:_ `cp`, [`grep`](/wiki/grep)
