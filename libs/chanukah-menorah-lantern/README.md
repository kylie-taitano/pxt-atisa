# Menorah Holiday Lantern (Working)

Working board configuration for Menorah Holiday Lantern PCB v1.

## Hardware
- Based on Adafruit ItsyBitsy M0 Express
- 27 NeoPixel LEDs (18 on D9, 9 on D7)
- I2C sensor support
- Speaker on A0

## Usage

```typescript
let strip = menorah.strip()
strip.setAll(0xff0000)  // Set all LEDs red
strip.setPixelColor(0, 0x00ff00)  // Set first LED green
```

## Features
- ✅ Working hardware (WebUSB upload)
- ✅ Working simulator (27 LED visualization)
- ✅ Custom `menorah.strip()` API for unified LED control

