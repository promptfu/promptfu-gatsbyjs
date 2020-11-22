---
author: mhassel
categories: ["linux"]
created: 2020-11-19 19:48:00 -0600
description: rpm
feature: false
image:
show: true
tags: ["command line", "linux"]
title: rpm
updated:
---
# Summary

The rpm command is used to install/uninstall package.

# Usage

## Test install rpm package

At times you want to perform a test run of a packages installation.

```sh
# rpm -ivh --test <package>.rpm
```

## Install rpm package only

To just install a package which does not include upgrading an already
installed package:

```sh
# rpm -ivh kernel-<kernel_version>.<arch>.rpm
```

The above example is great for when upgrading kernels. Best practice is to
install the second kernel along side the existing kernel in case there are
issues with installing the new kernel. With both installed, it makes it easy
to rollback the changes.

## Install an old rpm package

```sh
# rpm -ivh --oldpackage kernel-<kernel_version>.<arch>.rpm
```

## Install/Upgrade rpm package

To upgrade/install a package, log in as root and type the following command at
a shell prompt:

```sh
# rpm -Uvh foo-1.0-1.i386.rpm
```

## Uninstall rpm package

```sh
# rpm -e <package>.rpm
```

## Reinstall rpm package

```sh
# rpm -iv --replacepkgs <package>.rpm
```

## List config files of package

```sh
# rpm -q --configfiles <package>.rpm
```

## List contents of an uninstalled rpm

```sh
# rpm -qpl <rpm>.rpm
```

Viewing the contents of an uninstalled package may be useful when building your own rpms with `rpmbuild`.

## Check if config files have been modified from the default

```sh
# rpm -V <package>.rpm
```

## Modify the output of rpm using queryformat parameters

Query formats are modified versions of printf. The format is made up of static strings of allowed tag surrounded by %{}.

### View available tags

```sh
# rpm --querytags
```
### Print only the name of pakcages
Print only the names of the packages queried, you could use %{NAME} as the format string.

```sh
# rpm -qa --qf "%{NAME}\n"
```

_Referenced commands:_ [`rpmbuild`](/wiki/rpmbuild)

