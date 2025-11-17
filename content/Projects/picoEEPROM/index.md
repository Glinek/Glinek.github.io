---
title: "picoEEPROM library"
date: 2025-08-18
draft: false
description: "picoEEPROM is library developed by me to simplify usage of EEPROM"
summary: "picoEEPROM is library developed by me to simplify usage of EEPROM with Arduino-Pico boards"
tags: ["blog", "Arduino"]
showTaxonomies: True
showHero: true
heroStyle: "background"
---
## Github repo
{{< github repo="Glinek/picoEEPROM" >}}
&nbsp;

## Overview
This project, like many others, has been created out of necessity. While programming PicoCalc I encountered a simple issue, how to save data on Arduino (in this case Pi Pico) so that even after a restart that data will still be there, without using an SD card. The answer is very simple, you should use EEPROM. And that’s what I thought immediately BUT as it turns out Pi Pico only has the built-in EEPROM library which allows you to save 4096 bytes of data by changing the value of each byte. And that’s a problem and that’s how this library was born. I needed a way to save data into EEPROM and the solution was non-existent so I made it myself and shared the solution for everybody to use.

## Features
This library is able to save and read Integers, Strings (with dynamic length defined by user and a static length of 20 characters) and Booleans.

## Target device
This project is targeted ONLY for boards from [Arduino-Pico library](https://github.com/earlephilhower/arduino-pico), this means every board with RP2040 and RP235x chip. 

## Docs
Max allowed EEPROM size 4096 bytes, in this documentation each byte is going to be referred to as address because we need to specify at which byte we will save the data.

### Initializing library
At the beginning of your Arduino program you need to initialize this library and create an object e.g.:
```cpp
#include <picoEEPROM.h>
picoEEPROM picoEEPROM;
```
### Functions
#### begin(eeprom_size)
`begin` function takes one argument - size of eeprom, max allowed size is 4096. `begin` function returns 0 if everything worked and 1 if eeprom size is invalid. E.g.
```cpp
picoEEPROM.begin(4096); //begin eeprom with it's max allowed size
```
#### putEmptyByte(address)
 `putEmptyByte` puts one empty byte at a specified address
```cpp
picoEEPROM.putEmptyByte(0);
```
#### putEmptyBytes(num_of_bytes, address)
 `putEmptyBytes` takes two arguments, number of empty bytes and starting address. It puts a specified number of empty bytes starting at a given address.
```cpp
picoEEPROM.putEmptyBytes(7, 1);
```
#### putInt(value, address)
`putInt` takes two arguments, integer value and EEPROM address. Important! This function takes 4 bytes/4 EEPROM addresses to store one integer starting at a given address. `putInt` returns 1 if value is out of range, 2 if commiting to eeprom failed and 0 if everything worked.
```cpp
picoEEPROM.putInt(555, 0); //puts int = 555 starting at address 0
```
#### getInt(address)
`getInt()` takes one argument, EEPROM address (the same address as in `putInt`). This function returns int read from EEPROM. If something is wrong with retrieved int check if the correct address is specified.
```cpp
int valueRead = picoEEPROM.getInt(0); //reads int from address 0
```
#### putBool(value, bit, address)
`putBool` takes three arguments, boolean value, bit at which value will be stored and EEPROM address. This function returns 1 if bit is not between 0-7, 2 if commiting to eeprom failed and 0 if everything worked,
```cpp
picoEEPROM.putBool(true, 0, 5); //saving false at bit 0 at EEPROM address 5
```
#### getBool(bit, address)
`getBool` takes 2 arguments, bit at which value is stored and EEPROM address. This function returns a boolean value read from EEPROM.
```cpp
bool boolRead = picoEEPROM.getBool(0, 5); //reads bool from bit 0 at EEPROM address 5
```
#### putString20(value, address)
`putString20` takes two arguments, string value and EEPROM address. This function will always take 20 bytes from EEPROM to save a given string even if it's e.g. 4 characters long. Keep this in mind when allocating addresses. This function returns 1 if the string is larger than 20, 2 if committing to EEPROM failed and 0 if everything worked.
```cpp
picoEEPROM.putString20("testingStuff", 6); //puts string starting at address 6
```
#### getString20(address)
`getString20` takes one argument, EEPROM address and returns a string read starting at that address.
```cpp
String firstStringRead = picoEEPROM.getString20(6); //reads string stored at addresses 6 to 26
```
#### putString(value, address)
`putString` takes 2 arguments, string of any value smaller than 4096 bytes and EEPROM address. This function returns 1 if string is larger than 4096, 2 if committing to EEPROM failed and **String length!** if everything worked. This data can be used with `getString` function.
```cpp
int stringLength = picoEEPROM.putString("this string is longer than 20 characters", 27) //puts string starting at address 27
```
#### getString(string_size, address)
`getString` takes 2 arguments, string length and EEPROM address. String length is returned when saving a given string to eeprom using the `putString` function. This function returns a string read from EEPROM.
```cpp
String secondStringRead = picoEEPROM.getString(stringLength, 27); //reads string stored at addresses 27 to 27+stringLength
```