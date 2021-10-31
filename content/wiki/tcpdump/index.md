---
author: mhassel
categories: ["linux"]
created: 2018-10-18 00:00:00 -0600
feature: false
image: binoculars-black-equipment-large.jpg
show: true
tags: ["command line", "linux"]
title: tcpdump
updated: 2019-06-24 15:19:00 -0600
---
# Summary

`tcpdump` is used to dump traffic on a network in real-time.

We use it to interactively watch traffic, but could also capture network
traffic to a file for later analysis.
<!--more-->

Command flags:

```shell
-n – Don’t resolve hostnames

-nn – Don’t resolve hostnames or ports

-X – Show the packet’s contents in hex and ASCII

-v, -vv,-vvv – Increase verbosity of packet information

-S – Print the absolute sequence numbers (vs. relative)

-i <interface> – Capture traffic from specific interface
```

#  Usage

The below usage of tcpdump will display the packet info from the given
interface:

```shell
# tcpdump -i <interface>
```

## Capture N number of packets via a specific interface

```shell
# tcpdump -i <interface> -c <number>
# tcpdump -i eth0 -c 10
```

## Capture tcpdump output to a file and then use for reviewing later

```shell
# tcpdump -w <tcpdump output file>  - writes to file
# tcpdump -r <tcpdump output file> - reads from the file
```

## Traffic can be filtered

```shell
# tcpdump host 10.140.50.83
# tcpdump src 10.140.50.83
# tcpdump dst 10.140.50.83
# tcpdump net 10.140.50.0/24
# tcpdump icmp
# tcpdump port 3389
# tcpdump src port 1234
# tcpdump -nnvvXS port 514 and net 10.140.50.0/24
```

##  Find Cisco switchport info

```shell
# tcpdump -nn -v -i enp0s4 -s 1500 -c 1 'ether proto 0x88cc'
```


## Capture traffic for N seconds

```shell
# tcpdump -G 30 -W 1 -w tcpdump.pcap -i eth0 port 69
```
The above captures network traffic for (-G) thirty seconds for a count (-W) of one.

