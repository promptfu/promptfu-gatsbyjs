---
author: mhassel
categories: ["linux"]
created: 2021-01-11 00:00:00 -0600
description: veritas
feature: false
image:
show: true
tags: ["command line", "linux", "veritas"]
title: veritas
updated:
---

# Veritas InfoScale 7.4.2 Fundamentals for UNIX/Linux: Administration

Volume Layouts:

* Disk Spanning
* Data Redundancy (parity bit)
  * RAID-5:
    * Great for read heavy workloads
    * If a disk fails, performance is degraded
  * RAID-6: Not Supported
* Data Redundancy with mirroring
  * RAID-1+0 (RAID 10)
    * Performance plus reduandancy

```shell
# vxdisk list
```

The above command will list disks. Disks that are 'online invalid' do not have a private sector and are not under
veritas controll; disks that are 'online' are under vertias control.
