---
categories: ["raspberry pi"]
created: 2013-10-20 12:00:00 -0500
description:
feature: false
image: push-button-plus-one-led-original.jpg
show: true
tags: ["raspberry pi"]
title: "Raspberry Pi: Push-button + One(1) LED"
updated: 2020-04-26 13:16:00 -0500
---
This was my first attempt at getting a push-button to turn on an LED light with my Raspberry Pi w/Pi Cobbler setup.

I had
a lot of fun putting the bits and pieces together, and I hope you enjoy reading about it!

<!--more-->

I did a lot of Google searching to find a good example ([Reading and writing from GPIO ports from Python](http://raspberry.io/projects/view/reading-and-writing-from-gpio-ports-from-python/ "Reading and writing from GPIO ports from Python")).
I followed the instructions to help with the wiring and used interactive python to test the wiring setup. The one
problem with the tutorial is that the python is missing a few bits. When creating the python function, `my_callback()`.
The function is missing the ever so important `my_callback(self)`. Feel free to check out my code later on in this post.

***Note:*** Never use the 5v power coming off the Raspberry Pi Cobbler for an input back to the Cobbler. The Pi is only designed to
accept 3.3v of power. I used pins 25 and 4. Pin 4 is used for the input for when the button is pressed,
and 25 is used to provide the LED with power.

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
Also available here, [raspi-push-button](https://github.com/xpros/raspberrypi-examples/blob/master/raspi-push-button/raspi-push-button.py).

`youtube: https://youtu.be/VQKLXp-1IQU`

