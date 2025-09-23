---
title: "How to Pi Server Rack"
date: 2025-08-20
draft: false
description: ""
tags: ["Raspberry Pi", "Other"]
showTaxonomies: True
summary: How to built a custom server rack/How I built a custom server rack for Rasberry Pi's
showHero: true
heroStyle: "background"
---
### Why I built it?
My main motivation was to have a better place for my Pi5 based GitLab server. How much I have spent on getting this GitLab server to work is a whole other story bc IT'S STUPID how hard it was to download gitlab-ce on a linux machine. I know that It's ARM but c'mon It can't be that hard... Anyways, getting back on track bc I got a little bit caried away...

### How It's built
I have built it out of my left over 20x20mm vslot extrusions. The benefit of it was that It was very easy to make it into a custom shape and to mount everything inside. Right now it has a power strip that has it's wire changed to be an IEC-C14 cable socket, an RJ45 extender to serve as a port for my ethernet. At the front I have mounted a 5 port 1Gb switch. As my GitLab server I'm using Raspberry Pi 5 4GB version with a stock active coller and pinaberry NVMe hat that has been mounted upside down for better air flow. At the front i have a power switch for Pi and a 0.91inch OLED that shows basic stats (CPU temp, CPU usage, RAM usage and my servers IP)

### Setup gitlab on Rasperry Pi
Rest will be added later...