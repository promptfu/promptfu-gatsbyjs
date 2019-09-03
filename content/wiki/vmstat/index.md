---
author: mhassel
categories: ["linux"]
created: 2016-02-25 00:00:00 -0600
feature: false
show: true
tags: ["command line", "linux"]
title: vmstat
updated:
---
# Summary

```shell

     This util is part of the procps package, and can provide lots of useful
           info when diagnosing performance problems.

          	Heres a sample vmstat output on a lightly used desktop:

       procs                      memory    swap          io     system  cpu
     r  b  w   swpd   free   buff  cache  si  so    bi    bo   in    cs  us  sy id
     1  0  0   5416   2200   1856  34612   0   1     2     1  140   194   2   1 97

          	And heres some sample output on a heavily used server:

       procs                      memory    swap          io     system  cpu
     r  b  w   swpd   free   buff  cache  si  so    bi    bo   in    cs  us  sy id
    16  0  0   2360 264400  96672   9400   0   0     0     1   53    24   3   1 96
    24  0  0   2360 257284  96672   9400   0   0     0     6 3063 17713  64  36 0
    15  0  0   2360 250024  96672   9400   0   0     0     3 3039 16811  66  34 0

          	The interesting numbers here are the first one, this is the number of
    	the process that are on the run queue. This value shows how many process are
    	ready to be executed, but can not be ran at the moment because other process
    	need to finish. For lightly loaded systems, this is almost never above 1-3,
    	and numbers consistently higher than 10 indicate the machine is getting
    	pounded.

          	Other interseting values include the "system" numbers for in and cs. The
    	in value is the number of interupts per second a system is getting. A system
    	doing a lot of network or disk I/o will have high values here, as interupts
    	are generated everytime something is read or written to the disk or network.

    	The cs value is the number of context switches per second. A context
    	switch is when the kernel has to take off of the executable code for a program
    	out of memory, and switch in another. It's actually _way_ more complicated
    	than that, but thats the basic idea. Lots of context swithes are bad, since it
    	takes some fairly large number of cycles to performa a context swithch, so if
    	you are doing lots of them, you are spending all your time chainging jobs and
    	not actually doing any work. I think we can all understand that concept.

```

## Field Description For Vm Mode

### (a) procs is the process-related fields are:

  * r: The number of processes waiting for run time.
  * b: The number of processes in uninterruptible sleep.

### (b) memory is the memory-related fields are:

  * swpd: the amount of virtual memory used.
  * free: the amount of idle memory.
  * buff: the amount of memory used as buffers.
  * cache: the amount of memory used as cache.

### (c) swap is swap-related fields are:

  * si: Amount of memory swapped in from disk (/s).
  * so: Amount of memory swapped to disk (/s).

### (d) io is the I/O-related fields are:

  * bi: Blocks received from a block device (blocks/s).
  * bo: Blocks sent to a block device (blocks/s).

### (e) system is the system-related fields are:

  * in: The number of interrupts per second, including the clock.
  * cs: The number of context switches per second.

### (f) cpu is the CPU-related fields are:

These are percentages of total CPU time.

  * us: Time spent running non-kernel code. (user time, including nice time)
  * sy: Time spent running kernel code. (system time)
  * id: Time spent idle. Prior to Linux 2.5.41, this includes IO-wait time.
  * wa: Time spent waiting for IO. Prior to Linux 2.5.41, shown as zero.

```shell
$ vmstat -S M 2
```

_Referenced commands:_ [ Linux Performance Measurements using vmstat ](https://www.thomas-krenn.com/en/wiki/Linux_Performance_Measurements_using_vmstat)

