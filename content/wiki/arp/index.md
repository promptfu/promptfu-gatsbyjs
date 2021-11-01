---
author: mhassel
categories: ["linux"]
created: 2015-02-27 00:00:00 -0600
feature: false
show: true
tags: ["linux"]
title: arp
updated:
---
#  Summary

First thing is first, what is ARP? ARP is short for Address Resolution
Protocal. ARP is responsible for resolution of network layer address into link
layer, or IP address into MAC address.

#  Inverse ARP

It is possible, if given a MAC address to find out the IP address and then
finally the hostname with a few useful Linux commands. If you need to find the
IP address of a host given a MAC address, ping the broadcast address for the
given network, and then check the arp tables of the machine you are on via
(arp -a).

