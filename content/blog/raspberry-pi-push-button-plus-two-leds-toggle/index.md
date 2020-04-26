---
categories: ["raspberry pi"]
created: 2013-08-06 21:16:00 -0500
description:
feature: false
image: raspberry-pi-push-button-plus-two-leds-toggle-original.jpg
show: true
tags: ["raspberry pi"]
title: "Raspberry Pi: Push-button + Two(2) LEDs that Toggle"
updated: 2020-04-26 16:16:00 -0500
---
<center>Got another simple project here for you!</center>
<br />

This project is about adding an additional LED light to the
[Raspberry Pi: Push-button + One(1) LED](/blog/raspberry-pi-push-button-plus-one-led/) post, and having the push-button
toggle the LED lights. I used one red and one blue LED.

The desired result, toggle on/off of the two LEDs with the push of a button; if the red light is on then the blue is
off, and vice versa.

<center>Let's see how this goes...</center>

<!--more-->

<br />

With this project, I learned I need to have a better understanding around detecting events with the GPIO. I found myself
modifying "bouncetime" to achieve the desired result, but it is not optimal.

With the code below, there are times when the lights do not toggle or the light remains on.

Any ideas what I am doing wrong? Let me know in the comment section below.

```python
#!/usr/bin/env python

import RPi.GPIO as GPIO
import time

def on_callback(channel):
    GPIO.output(channel, GPIO.input(4))

def off_callback(channel):
    GPIO.output(channel, False)

GPIO.setmode(GPIO.BCM)
RED_LED = 25
BLUE_LED = 24
SWITCH_IN = 4
GPIO.setup(SWITCH_IN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(RED_LED, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(BLUE_LED, GPIO.OUT, initial=GPIO.LOW)
GPIO.add_event_detect(SWITCH_IN, GPIO.RISING, bouncetime=900)


led = BLUE_LED
nled = RED_LED
run = 1
while (run != 0):
    try:
        if GPIO.event_detected(4):
            print led
            led = BLUE_LED if (led == RED_LED) else RED_LED
            nled = RED_LED if (nled == BLUE_LED) else BLUE_LED

            on_callback(led)
            off_callback(nled)

        pass
    except KeyboardInterrupt:
        run = 0
        GPIO.cleanup()
        print 'KeyboardInterrupt caught'
        break
GPIO.cleanup()
print 'EXITED!'
```
Also available here, [raspi-push-button-led-toggle](https://github.com/xpros/raspberry-pi-examples/blob/master/raspi-push-button-led-toggle/raspi-push-button-led-toggle.py).

`youtube: https://youtu.be/kNPYPkmSMdI`

