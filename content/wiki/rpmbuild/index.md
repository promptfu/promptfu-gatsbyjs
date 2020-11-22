---
author: mhassel
categories: ["linux"]
created: 2020-11-19 20:08:00 -0600
description: rpmbuild
feature: false
image:
show: true
tags: ["command line", "linux"]
title: rpmbuild
updated:
---
#  Summary

To build an rpm, the following packages need to be installed:

```sh
# yum install rpm-build rpmdevtools libpcap-devel
```

Once the packages are installed:

```sh
# rpmdev-setuptree
```

The above command will create an rpmbuild folder in your home director that will have 5 other directories in it (BUILD,
RPMS, SOURCES, SPECS, and SRPMS). This is where the rpm building magic will happen.

The process to build an rpm is as follows:

  1. Download source package
  2. Extract the .spec file
  3. Put the tared source into the SOURCES folder
  4. Put the .spec file in the SPECS folder
  5. Then, run the below command:

```sh
# rpmbuild -ba <program>.spec
```
     
```sh
# rpmbuild --define "_topdir `pwd`" -ba SPECS/project.spec # RHEL5
```

If a spec file is not found, it is possible to create one; and luckily, a template can be generated to help with
getting started.

To create a template run the below command:

```sh
# rpmdev-newspec <spec file name>
```

Once you have the spec file created, run the below command to attempt to build
and fix any errors:

```sh
# rpmbuild -ba <spec file name>
```

#  Building an rpm from a src rpm

These are just great... if done correctly.

```sh
# yum install rpm-build rpmdevtools libpcap-devel
# rpmdev-setuptree
```

The above will need to be complete first, but then...

```sh
# rpmbuild --rebuild <package>.src.rpm
```

The above will create an RPM located in the rpmbuild folder for you to install! To install the rpm package, use the
`rpm` command.


_Other references:_
 - [`How to create a GNU Hello RPM package`](https://fedoraproject.org/wiki/How_to_create_a_GNU_Hello_RPM_package)
 - [`Building Binary RPM Packages from Source RPMs mini-HOWTO`](https://www.redhat.com/archives/rpm-list/2002-February/msg00030.html)

_Referenced commands:_ [`rpm`](/wiki/rpm)

