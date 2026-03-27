---
author: Matthew Hassel
categories: ["raspberry pi"]
created: 2013-08-02 22:09:00 -0500
description:
feature: false
image: raspberry-pi-push-button-plus-one-led-original.jpg
show: true
tags: ["raspberry pi"]
title: "Raspberry Pi: Push-button + One(1) LED"
updated: 2026-03-26 00:00:00 -0500
---
This was my first attempt at getting a push-button to turn on an LED light with my Raspberry Pi w/Pi Cobbler setup.

I had a lot of fun putting the bits and pieces together, and I hope you enjoy reading about it!

<!--more-->

## What You Will Need

This project uses the **Raspberry Pi GPIO** (General Purpose Input/Output) pins — the row of pins on the board that lets you connect physical components like buttons, LEDs, sensors, and motors directly to the Pi. This is what makes the Raspberry Pi so compelling for hardware projects: you can write Python code and have it control real-world electronics.

For this project, I used:

- A **Raspberry Pi** (any model with GPIO pins will work — I used a Model B)
- An **Adafruit Pi Cobbler** — a breakout board that makes it easy to connect the GPIO pins to a standard breadboard
- A **breadboard**
- One **LED** (any color)
- One **push-button**
- **Resistors** (a 220Ω for the LED, and ideally a pull-down resistor for the button)
- **Jumper wires**

## Understanding GPIO Pins

The Pi Cobbler labels each pin with its GPIO number, which maps to the `GPIO.BCM` numbering mode used in the code. There are two numbering schemes for the GPIO:

- **BCM mode** (`GPIO.BCM`) — uses the Broadcom chip numbering, which is what most tutorials reference
- **Board mode** (`GPIO.BOARD`) — uses the physical pin numbers on the board

For this project I used **BCM mode**, with:
- **Pin 4** — connected to the push-button (input)
- **Pin 25** — connected to the LED (output)

***Note:*** Never use the 5v power coming off the Raspberry Pi Cobbler for an input back to the Cobbler. The Pi is only designed to accept 3.3v of power.

## Wiring It Up

1. Connect one leg of the push-button to a 3.3v GPIO pin and the other leg to **GPIO pin 4** through a pull-down resistor (this ensures the pin reads LOW when the button is not pressed, preventing "floating" input).
2. Connect the **anode** (+) of the LED to **GPIO pin 25** through a 220Ω resistor.
3. Connect the **cathode** (−) of the LED to a ground (GND) pin.

## The Code

I did a lot of Google searching to find a good example ([Reading and writing from GPIO ports from Python](http://raspberry.io/projects/view/reading-and-writing-from-gpio-ports-from-python/ "Reading and writing from GPIO ports from Python")).
I followed the instructions to help with the wiring and used interactive python to test the wiring setup. The one
problem with the tutorial is that the python is missing a few bits. When creating the python function, `my_callback()`.
The function is missing the ever so important `my_callback(self)`. Feel free to check out my code later on in this post.

The code below is very CPU intensive because of the while loop. There is such a thing as `GPIO.wait_for_edge(CHANNEL)`, but
if you add an event, such as I did with `GPIO.add_event_detect(CHANNEL, GPIO.BOTH, callback=my_callback)`, the script
will not run because it does not like both of those methods being used together.

To decrease the amount of CPU usage, linux has a `nice` command that you can set the priority of the script. For example,
`nice 18 ./raspi-push-button.py` will run the script at a run priority of 18. Run priority levels are from -20 to 19.
The lower the nice value means the higher priority; so -20 is the highest priority, and positive 19 is the lowest run priority.

```python
#!/usr/bin/env python

import RPi.GPIO as GPIO

def my_callback(self):
    GPIO.output(25, GPIO.input(4))

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(25, GPIO.OUT, initial=GPIO.LOW)
GPIO.add_event_detect(4, GPIO.BOTH, callback=my_callback)
run = 1
while (run != 0):
    try:
        pass
    except KeyboardInterrupt:
        run = 0
        GPIO.cleanup()
        print 'KeyboardInterrupt caught'
        break
GPIO.cleanup()
print 'EXITED!'
```
Also available here, [raspi-push-button](https://github.com/xpros/raspberry-pi-examples/blob/master/raspi-push-button/raspi-push-button.py).

`youtube: https://youtu.be/VQKLXp-1IQU`

## A Note on Python 3

The code above was written in 2013 and uses Python 2 syntax — notably `print 'KeyboardInterrupt caught'` without parentheses. In Python 3 (now the standard), this becomes `print('KeyboardInterrupt caught')`. The `RPi.GPIO` library itself works the same in both Python 2 and Python 3, so the GPIO calls are still valid.

If you are running a modern Raspberry Pi OS (Bullseye or later), Python 3 is the default. You can install the GPIO library with:

```shell
pip3 install RPi.GPIO
```

Or on newer Raspberry Pi OS releases, consider using the **gpiozero** library, which offers a simpler API for beginner projects:

```python
from gpiozero import LED, Button
from signal import pause

led = LED(25)
button = Button(4)

button.when_pressed = led.on
button.when_released = led.off

pause()
```

This achieves the same result as the script above but with far less boilerplate. `gpiozero` handles the GPIO setup, cleanup, and event loop internally.

## Troubleshooting

**LED not lighting up?**
- Double-check the LED polarity — the longer leg (anode) goes toward the resistor and GPIO pin, the shorter leg (cathode) goes to GND.
- Make sure the resistor value is right. Too high a resistance and the LED will be dim or off; no resistor at all risks burning out the LED.

**Button not registering?**
- Check your pull-down wiring. Without a pull-down resistor, the input pin floats between states and may read HIGH randomly.
- Try the software pull-down: `GPIO.setup(4, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)` is already in the code above, which enables the Pi's internal pull-down resistor.

**Permission denied?**
- Run with `sudo` on older OS versions: `sudo python3 raspi-push-button.py`
- On newer Raspberry Pi OS releases, your user may already have GPIO access via the `gpio` group.

## What I Learned

This project taught me the fundamentals of GPIO on the Raspberry Pi:

1. **Output pins** can be set HIGH or LOW to power components like LEDs
2. **Input pins** read the state of external signals like button presses
3. **Event detection** (`add_event_detect`) is the right tool for responding to button changes — much better than polling in a tight loop
4. **Callbacks** run in a separate thread, so `my_callback(self)` is the correct signature for GPIO callbacks
5. The `nice` command is a quick way to deprioritize a CPU-heavy Python loop on a resource-constrained Pi

From here I went on to the two-LED toggle project — check it out below!

---

## See Also

- [Raspberry Pi: Push-button + Two LEDs Toggle](/blog/raspberry-pi-push-button-plus-two-leds-toggle) — next step: extend this project to toggle between two LEDs
- [Raspberry Pi I2C Setup](/wiki/raspiberrypi-i2c-setup) — set up I2C communication for sensors and displays on the Pi

