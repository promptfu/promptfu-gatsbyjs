---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
feature: false
image:
show: true
tags: ["command line", "linux"]
title: lshw
updated:
---
# Summary

The command `lshw` is the list hardware command. The tool can be used to extract
detailed information on the hardware configuration of the machine. It can
report on memory configuration, firmware version, and a lot more.

# Usage Examples

## Query System for Network Interfaces

The below command will display a 'short' list of the hardware (less info) of
the class, "-c", net or network.

```sh
# lshw -short -c net
```

Additional class that lshw could query are (to list a few):

  * cpu
  * pci
  * bank
  * cache
  * disk
  * volume
