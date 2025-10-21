# Kinara Holiday Lantern (Working)

Working board configuration for Kinara Holiday Lantern PCB v1.

## Hardware
- Based on Adafruit ItsyBitsy M0 Express
- 25 NeoPixel LEDs (14 on D9, 11 on D7)
- I2C sensor support
- Speaker on A0

## Usage

```typescript
let strip = kinara.strip()
strip.setAll(0xff0000)  // Set all LEDs red
strip.setPixelColor(0, 0x00ff00)  // Set first LED green
```

## Features
- ✅ Working hardware (WebUSB upload)
- ✅ Working simulator (25 LED visualization)
- ✅ Custom `kinara.strip()` API for unified LED control

