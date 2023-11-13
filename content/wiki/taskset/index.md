---
author: mhassel
categories: ["linux"]
created: 2021-10-31 22:35:00 -0600
feature: true
image: black-and-white-factory-industrial-plant-large.jpg
show: true
tags: ["command line", "linux"]
title: taskset
updated:
---
# Summary

`taskset` is used to affine an application to a specific set of CPU cores; usally taking into account NUMA architecture.

CPU/memory affinity can improve performance of workloads that are performance-critical and/or that may be
network-heavy.

Affining closely related applications on the same NUMA node can improve memory access latencies, and newtork-heavy
workloads can take advantage of affining applications by scheduling network I/O on the same NUMA node as the NIC card to
reduce the latency between the CPU and PCIe.
<!--more-->

#  Usage

## Find out how a process is affined

```shell
taskset -s -p <pid>
```

As an added bonus, here is how to find out a process's affinity is set using `ps`:

```shell
ps -o pid,psr,comm -p <pid>
```

