---
layout: "layouts/post.html"
tags: ["post"]
title: "IcePi Zero dev Extension"
date: "2026-07-17"
description: "A companion article and a documentation for my extension for IcePi Zero"
image: "/images/blog/icePiExtension/cover.jpg"
article_tags: ["Documentation", "IcePiZero"]
---

# This project is still in the making!

## BOM
| Component | Value | Quantity | Notes | Component reference |
|-----------|-------|----------|-------|------------------|
| 7 segment display with 4 digits | - | 1 | KW4-361ASB | U1 |
| SMD RGB LED | - | 1 | R5050RGBC-001 | LED1 |
| 8x dip switch | - | 1 | DM-08-V | SW2 |
| 5x5mm THT button | - | 3 | - | SW1, SW3, SW5 |
| Resistor | 10k | 11 | 0603 | R8-R10, R13-R20 |
| Resistor | 330 | 4 | 0603 | R1-R4 |
| Resistor | 22 | 1 | 0603 | R6 |
| Resistor | 10 | 1 | 0603 | R5, R7 |

## Wiring diagram - just a place holder, not a final version
{% set title = "Wiring diagram" %}
{% set url = "/blog/data/schematic-v1-dummy.pdf" %}
{% include "partials/pdf-embed.njk" %}

## Git repo below :)

{% set repo = "Glinek/IcePiZero-devExtension" %}
{% include "partials/github-card.njk" %}