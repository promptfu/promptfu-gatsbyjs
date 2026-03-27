---
author: Matthew Hassel
categories: ["raspberry pi"]
created: 2013-08-06 21:16:00 -0500
description:
feature: false
image: raspberry-pi-push-button-plus-two-leds-toggle-original.jpg
show: true
tags: ["raspberry pi"]
title: "Raspberry Pi: Push-button + Two(2) LEDs that Toggle"
updated: 2026-03-26 00:00:00 -0500
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

## What You Will Need

This project builds directly on the [push-button + one LED](/blog/raspberry-pi-push-button-plus-one-led/) project. You will need the same setup with one addition:

- A **Raspberry Pi** with Pi Cobbler and breadboard
- **Two LEDs** — I used one red and one blue
- One **push-button**
- **Resistors** (220Ω for each LED)
- **Jumper wires**

The GPIO pin assignments for this project:
- **Pin 4** (`SWITCH_IN`) — push-button input
- **Pin 25** (`RED_LED`) — red LED output
- **Pin 24** (`BLUE_LED`) — blue LED output

## The Challenge: Button Bouncing

With this project, I learned I need to have a better understanding around detecting events with the GPIO. I found myself
modifying "bouncetime" to achieve the desired result, but it is not optimal.

**Button bounce** is a real hardware phenomenon. When you press a mechanical button, the physical contacts don't make a clean single connection — they "bounce" and rapidly open and close many times before settling. Without debouncing, each press can register as multiple events. The `RPi.GPIO` library's `bouncetime` parameter (in milliseconds) tells the library to ignore further events for that duration after the first event fires. I set it to 900ms here, which is quite long — you press the button once and have to wait nearly a second before the next press registers.

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

## What I Learned

Despite the inconsistent behavior, this project taught me several valuable lessons about GPIO event detection:

### Bouncetime is Tricky

The `bouncetime=900` value was arrived at through trial and error. Too short and the button registers multiple events per press; too long and the button feels unresponsive. A more robust solution uses software debouncing: track the time of the last event and ignore events that arrive too quickly.

### GPIO.RISING vs GPIO.BOTH

In the one-LED project I used `GPIO.BOTH` to detect both button presses and releases. Here I switched to `GPIO.RISING` — this triggers only when the button goes from LOW to HIGH (i.e., when pressed), which maps more cleanly to the "toggle on press" behavior I wanted.

### Event Detection vs Polling

The polling approach from the first project (`while (run != 0): if GPIO.event_detected(4):`) has a race condition: if a button press happens between iterations of the while loop, you can miss it. `GPIO.add_event_detect` with a callback solves this, but mixing both methods (as the code attempts) causes issues — you can use one or the other, not both.

### A Cleaner Approach with gpiozero

On modern Raspberry Pi OS, the **gpiozero** library handles debouncing and toggling elegantly:

```python
from gpiozero import LED, Button
from signal import pause

red = LED(25)
blue = LED(24)
button = Button(4, bounce_time=0.1)

red.on()   # Start with red on
blue.off()

def toggle():
    if red.is_lit:
        red.off()
        blue.on()
    else:
        red.on()
        blue.off()

button.when_pressed = toggle

pause()
```

This version handles debouncing automatically (via `bounce_time=0.1` — 100ms), is more readable, and does not have the polling/event-detection conflict.

## Python 3 Note

The original code uses Python 2 `print` syntax (`print led`). In Python 3, this should be `print(led)`. The GPIO library itself works fine in Python 3 — just update the print statements and install dependencies with `pip3`.

## Further Reading

I continued exploring the Raspberry Pi platform with an I2C sensor setup project. If you want to connect more complex sensors (temperature, distance, display modules) to the Pi, check out the [Raspberry Pi I2C Setup](/wiki/raspiberrypi-i2c-setup) guide.

---

## See Also

- [Raspberry Pi: Push-button + One LED](/blog/raspberry-pi-push-button-plus-one-led) — start here if you are new to GPIO: the single LED project that precedes this one
- [Raspberry Pi I2C Setup](/wiki/raspiberrypi-i2c-setup) — next step: connecting I2C sensors and modules to the Pi

