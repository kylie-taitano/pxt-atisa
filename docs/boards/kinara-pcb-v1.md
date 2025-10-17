# Kinara PCB v1

A custom educational board designed for cultural engineering kits with two NeoPixel LED strips.

## Features

- **Two NeoPixel strips**: 14 LEDs on D9, 11 LEDs on D7
- **Educational focus**: Designed for students to learn programming with visual feedback
- **ItsyBitsy M0 Express compatible**: Based on SAMD21 microcontroller

## Specifications

- **Microcontroller**: SAMD21 (same as ItsyBitsy M0 Express)
- **NeoPixel strips**: 25 total LEDs (14 + 11)
- **Programming**: MakeCode Blocks and JavaScript
- **Target audience**: Students learning cultural engineering

## Getting Started

1. Connect your Kinara PCB v1 board via USB
2. Open MakeCode and select "Kinara PCB v1" as your board
3. Start programming with blocks or JavaScript

## Example Code

```typescript
// Control the D9 strip (14 LEDs)
let stripD9 = light.createStrip(pins.D9, 14)
stripD9.setAll(0xff0000)  // Red

// Control the D7 strip (11 LEDs)  
let stripD7 = light.createStrip(pins.D7, 11)
stripD7.setAll(0x00ff00)  // Green

// Control individual LEDs
stripD9.setPixelColor(0, 0x0000ff)  // Blue on first LED
stripD7.setPixelColor(5, 0xff8000)  // Orange on 6th LED
```

