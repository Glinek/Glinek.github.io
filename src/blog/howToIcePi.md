---
layout: "layouts/post.html"
tags: ["post"]
title: "How to setup and use IcePi Zero FPGA"
date: "2026-07-02"
description: "A tutorial on setting up IcePi Zero on Windows"
image: "/images/blog/howToIcePi/cover.jpg"
article_tags: ["Tutorial", "IcePiZero"]
---

In this tutorial I will help you get your IcePi Zero setup and working on Windows!

## Uploading the test code to your IcePi
1. Preparation
- Download [this demo code](https://github.com/cheyao/icepi-zero/raw/refs/heads/main/documentation/fire-v.bit)
- Download [zadig](https://zadig.akeo.ie/)
- Open [this website](https://ofl.trabucayre.com/) use **CHROME!**
2. Open zadig, select IcePi zero (you might need to select `list all devices` in options) and replace driver with WinUSB  

{% set images = ["/images/blog/howToIcePi/images/1.png", "/images/blog/howToIcePi/images/2.png"] %}
{% include "partials/inline-images.njk" %}

3. Unplug the board for a few seconds
4. Open the website, in automatic operations select IcePi Zero and the demo file fire-v.bit   

{% set images = ["/images/blog/howToIcePi/images/3.png", "/images/blog/howToIcePi/images/5.png"] %}
{% include "partials/inline-images.njk" %}

5. Upload, If you have done everything right you should see information about successful upload!  
 
{% set images = ["/images/blog/howToIcePi/images/4.png"] %}
{% include "partials/inline-images.njk" %}


## Programming IcePi Zero
There are multiple ways to program FPGA boards, especially ones like IcePi Zero. Some are more advanced than others and with this also comes the step-up in difficulty. If you are like me (new to FPGA and just want to play with it) you might want to try [IceStudio](https://icestudio.io/). Its main selling point is that it's easy for beginners to learn. So let's download it!
<br><br>
**Important** As of writing this tutorial (02.07.2026). I was able to program IcePi using the nightly build of IceStudio. You want to be using at least version 1.0, which is, right now, a nightly build. Be aware that Windows Defender might flag it as a virus. After some investigation I came to the conclusion that It might be a false alarm but be aware and proceed at your own risk!
<br><br>
When you download IceStudio v1.0 or higher It's pretty straight forward from there. Just follow the installation guide (screenshots below :) ) and upload a test code. Icestudio might not recognize the board at first but It should upload without a problem and you should see your board blinking.

{% set images = ["/images/blog/howToIcePi/images/6.png", "/images/blog/howToIcePi/images/7.png", "/images/blog/howToIcePi/images/8.png", "/images/blog/howToIcePi/images/9.png", "/images/blog/howToIcePi/images/10.png"] %}
{% include "partials/inline-images.njk" %}

<br><br>
If you want to print the same case as on this blog's picture, it is avaiable below:

{% set title = "IcePi Zero Case" %}
{% set desc = "Custom 3D printed case for the IcePi Zero FPGA board" %}
{% set url = "https://www.printables.com/model/1774644-icepi-zero-case-housing" %}
{% include "partials/printables-card.njk" %}

{% set repo = "Glinek/IcePiZero-case" %}
{% include "partials/github-card.njk" %}

Thank you for reading! I hope I helped a little :)  
~Simon



