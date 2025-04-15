---
title: "One-key keyboard"
date: 2023-02-20
draft: false
description: "One key keyboard for a Cyberdeck Cafe's contest"
tags: ["Arduino", "keyboard", "Open Source"]
summary: This is yet another project made for a contest hosted by Cyberdeck Cafe. The objective was to create a keyboard that, as the name suggests, has only one button.
showHero: true
heroStyle: "background"
showTaxonomies: True
authors:
  - "anulab"
  - "glinekNormal"
---


{{< alert >}}
**Warning!** This project is no longer developed    
{{< /alert >}}     
{{< github repo="Glinek/One-key-keyboard" >}}
* [Cyberdeck Cafe's website](https://cyberdeck.cafe/)
* [Cyberdeck Cafe's discord](https://discord.com/invite/JK76KBsfuR)

## Creation process
This project took a few weeks which is relatively quick considering the fact that It was built after school and other activities. Tbh I don't know why I have decided to make It, I have never actually used it besides while testing it for the contest. 

## How it works
One-key keyboard (or okk. for short) works by measuring how much light is emitted by the LED onto a photoresistor, while the `key` is not pressed, the LED is not covered so all the light can shine onto the photoresistor. But when it is pressed by some amount, the `key` starts blocking some of the light so the photoresistor's resistance changes. And when this photoresistor is connected with another one, and voltage divider is created by them. You can measure this resistance difference (or, to be more accurate, now a voltage drop) with arduino's analog pin. The code can be as short as just a few lines. Additionally I have added another screen, cause It makes okk. look better and also everything nowadays has to have a screen.

## Make your own
Why would you even want to make your own version? Never mind... Good-ish documentation can be found on okk.'s github page. Link above.

## Gallery
{{< gallery >}}
  <img src="gallery/1.jpg" class="grid-w33" />
  <img src="gallery/2.jpg" class="grid-w33" />
  <img src="gallery/3.jpg" class="grid-w33" />
  <img src="gallery/4.jpg" class="grid-w33" />
  <img src="gallery/5.jpg" class="grid-w33" />
  <img src="gallery/6.jpg" class="grid-w33" />
  <img src="gallery/7.jpg" class="grid-w33" />
{{< /gallery >}}

**Happy making**\
**~Simon**