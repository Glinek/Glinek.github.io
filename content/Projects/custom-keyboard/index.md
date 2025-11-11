---
title: "My custom keyboard"
date: 2025-09-20
draft: false
tags: ["Keyboard", "Other", "Calculator", "Arduino"]
heroStyle: "background"
summary: My custom mechanical keyboard with numpad on the left and an integrated calculator built into it.
showTaxonomies: True
---

## Overview
After almost a year of parts sitting in my closet I’ve finally made my own keyboard. This is also one of the projects made out of necessity. It was mainly created to improve my experience while working in various CAD softwares. Hence the numpad on the left though I’m right-handed. While using CAD I use my mouse almost for everything except for inputting dimensions. While I had my numpad on the right I had to swap between using a mouse or a numpad (left hand was useless, SO INEFFICIENT). Now I can comfortably use both at the same time.
Features
I have already mentioned one of the features. Numpad on the left. But some might notice that there is also a small display and a weird power switch. That’s bc this numpad is also a CALCULATOR. And that rocker switch is used to change between calculator and numpad.

## Hardware components
| Component | Description | Quantity | Notes |
|------------|--------------|-----------|-------|
| Keyboard | A keyboard, 75% works best for me, you can make one yourself or by one like I did | 1x | I bought my keyboard from [Baigel Labs on Tindie](https://www.tindie.com/products/baigel/minimilistic-mechanical-keyboard/) and it’s great! |
| Raspberry Pi Pico | A microcontroller used to make the numpad/calculator combo | 1x | I just love Pi Picos, they are great and work as HID without any issues |
| I2C OLED display | To display the calculator stuff | 1x | I am using [0.91 inch oled for arduino](https://pl.aliexpress.com/item/1005006365845676.html) |
| Buttons and switches | Used to make the numpad/calculator | 1x rocker switch, 19x mx brown | Make sure that the rocker switch has 3 pins! |
| USB stuff | Things used to connect all of it together, USB hub, USB C cables, USB C port | 1x usb hub, 2x usb cables, 1x usb port | I am using USB 2.0 HUB |
| 3D printed case | Self explanatory | 1x | I also have an acrylic sheet as a base plate |
| Keycaps | Any keycaps that suit you | 1x | Make sure to buy a set with some extra ones. I bought a set of 109ish |


## Software and Tools
- Arduino IDE - my IDE of choice for programming Arduinos/Picos
- FreeCAD/other CAD - to design the case, anything that works for you
- Soldering stuff - you still need to do some soldering, especially on the numpad.

And that’s it, it is not very difficult project but takes patience to make it right and make it visually pleasing.

**Have a great day and keep making stuff**   
**~Simon**