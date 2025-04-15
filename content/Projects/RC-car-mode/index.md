---
title: "RC car mode"
date: 2024-06-15
draft: false
description: "An RC car mode"
tags: ["Other"]
sumarry: A mod for RC. Completely new remote based on LoRa, new and stronger battery, better H-Bridge.
showHero: true
heroStyle: "background"
authors:
  - "anulab"
  - "glinekNormal"
---

{{< alert >}}
**Warning!** This project is not well documented. 
{{< /alert >}}     
{{< github repo="A-N-Ulab/RC_car-LoRa_driven" >}}

## Story
This project is another simple-ish build but more time than I would like to admit. It all started when my cousin asked me to repair his RC car bc It's not working anymore. So I did. I added a 12V battery, better H-bridge and LoRa communication between this car and the remote. There were a few problems. There got to be some problems. As I learned, classic Arduino Uno is sometimes the best. ESP 32 is 3v3 based so controlling the H-bridge had to be done via transistors, way too complicated. Arduino pro micro has too small memory capacity and don't even get me started on connecting LoRa modules to them. It was a nightmare. That's why sometimes It's better to go with the classic, especially when you don't need so much CPU power.

## Make your own
to make your own, visit its github page (Link above). There might not be any instructions, I want to forget about this project. But the code, and cad files are available. If you have any questions, just contact me and I will try to answer them as good as I possibly can.

## Last words
As every project, this one also taught me a lot. Was It easy? No... Would I do It again? I don't want to. But remember that every project, no matter how challenging will teach you something. This one taught me LoRa. Keep that in mind when something is not working for you.\
**Stay persistant**\
**~Simon**



