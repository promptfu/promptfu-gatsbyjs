---
author: mhassel
categories: ["raspberrypi"]
created: 2020-04-25 13:31:00 -0600
feature: false
show: true
tags: ["raspberrypi", "i2c"]
title: Raspberry Pi I2C Setup
updated:
---
The following packages need to be installed:

```shell
$ sudo apt-get install python-smbus
$ sudo apt-get install i2c-tools
```

Make sure i2c-dev and i2c-bcm2708 are added to /etc/modules file; check `lsmod` for these modules.

Then run the following command:

```shell
root@raspberrypi:~# i2cdetect -y 1
0 1 2 3 4 5 6 7 8 9 a b c d e f
00: -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: 70 -- -- -- -- -- -- --
```

**NOTE: If the above output is not observed, try `modprobe i2c-dev` to make sure the module is enabled.

---

## See Also

- [Raspberry Pi: Push-button + One LED](/blog/raspberry-pi-push-button-plus-one-led) — GPIO basics with Python and the RPi.GPIO library
- [Raspberry Pi: Push-button + Two LEDs Toggle](/blog/raspberry-pi-push-button-plus-two-leds-toggle) — extend GPIO projects with event detection and LED toggling

