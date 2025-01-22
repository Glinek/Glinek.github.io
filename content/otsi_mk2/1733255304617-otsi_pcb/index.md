---
title: "Otsi's PCB"
date: 2024-12-03
draft: false
description: "PCB's of Otsi mk2"
tags: ["Otsi", "mk2", "PCB"]
showTaxonomies: true
showHero: true
heroStyle: "background"
showTableOfContents: false
authors:
  - "anulab"
  - "glinekNormal"
---

This is first project-log of Otsi-mk2. Here I am going to focus on schematic and PCB. As well as try to explain to you how everything is supposed to work. 

# First PCBs
## OH MY GOD, WHY IT'S NOT WORKING
That is exactly what I was asking myself when testing my first PCBs. A little spoiler, they don't work. Oh man, they very don't work. But from the very beggining.
## Testing PCBs mk1
Before I could test my PCBs I had to have them, and it was taking longer that usual for my local postal service to deliver them to me, but not thinking about it too much I was just petiently wating. As it turned out, my boards have been in my city's post office for a week but they just didn't delivered it. Thankfully after messeging JLCPCB customer service I figured it out and went straing away to collect them. And that was the easy part...   
After I finally got them, the time for testing arrived. And they didn't work. Not at all... I thought that it was a problem with I2C bc some devices were working and some were not. But as it turned out it was a problem with me. To avoid pulling too much current from one voltage regulator i have split power distribtion to two V regulators, one connected to +3.3V line and another connected to +3.3VP line. And every devices where connected to +3.3V or +3.3VP, correct right? Yes correct, but voltage regulators where connected to +3.3VP, so far correct, and +3V3... Small difference but enough to make V regulator not connected to any I2C slaves. And electronic devices usualy work better when connected to power. And that was my whole problem. I found that out the hard way, after even ordering an oscilloscope.