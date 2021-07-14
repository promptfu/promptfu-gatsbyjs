---
author: mhassel
categories: ["linux"]
created: 2018-05-09 00:00:00 -0600
feature: false
show: true
tags: ["linux"]
title: apt
updated:
---
#  Summary

Apt is Ubuntu's package manager and it is used to query, install, remove, etc. pacakges. Below are some examples of
how to use apt.

#  List installed packages

In Ubuntu 14.04 and above:

```shell
# apt list --installed
```


Older versions:

```shell
# dpkg --get-selections | grep -i <package>
```

Or simply:

```shell
# dpkg -l
```

#  Show info about a package

```shell
# aptitude show <package>
```

#  Show why a package was installed

```shell
# aptitude why <package>
```

#  Determine what package contains a file

Similar to yum provides, debian also has command line utilities that can determine what package contains a certain file.

```shell
# dpkg -S <filename>
# apt-file update
# apt-file search <filename>
```

#  List the contents of a debian package

```shell
# dpkg -c <package>
# dpkg -c <package>.deb
# dpkg --contents <package>
# apt-file list <package>
```

#  List repos configured

The below method is great for listing which repos are configured and working:

Method #1

```shell
# aptitude update
# aptitude --help | grep -i update
 update       - Download lists of new/upgradable packages.
```

Method #2

```shell
# apt-cache policy
policy [pkg...]
           policy is meant to help debug issues relating to the preferences file. With no arguments it will print out the priorities
           of each source. Otherwise it prints out detailed information about the priority selection of the named package.
```

#  Working with deb packages

##  Download .deb package

```shell
# aptitude download <package>
```

##  Install ar command

The `ar` command is required to extract .deb packages so lets make sure it is
installed.

```shell
# aptitude install binutils
```

##  Extract .deb package user `ar` command

```shell
# ar x <package>
```

##  Extract files from the control.tar.gz and data.tar.gz

```shell
# tar xvf control.tar.gz
# tar xvf data.tar.gz
```

_Refernences_:*[ https://www.cyberciti.biz/faq/how-to-extract-a-deb-file-without-opening-it-on-debian-or-ubuntu-linux/ ](https://www.cyberciti.biz/faq/how-to-extract-a-deb-file-without-opening-it-on-debian-or-ubuntu-linux/)

