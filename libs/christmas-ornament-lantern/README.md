# Holiday Ornament Lantern

Board configuration for Holiday Ornament Lantern PCB v1.

## Hardware
- Based on Adafruit ItsyBitsy M0 Express
- 26 NeoPixel LEDs (12 on D9, 14 on D7)
- I2C sensor support
- Speaker on A0

## LED Layout

### D9 - Outer Ring (12 LEDs)
- Counter-clockwise arrangement
- Indices 3 and 4 are at the top, with index 3 to the right of index 4
- Logical numbering: 1-12 (counter-clockwise from top)

### D7 - Three Rows (14 LEDs)
- **Top Row**: 5 LEDs (D7 indices [4, 3, 2, 1, 0])
- **Middle Row**: 4 LEDs (D7 indices [5, 13, 12, 11])
- **Bottom Row**: 5 LEDs (D7 indices [6, 7, 8, 9, 10])

## Usage

### Basic Usage

```typescript
// Set brightness and show lights
ornament.setBrightness(128)
ornament.setAll(0xff0000)  // Set all LEDs red
ornament.show()

// Set individual ornament parts
ornament.setOuterRing(1, 0xff0000)  // Set first Outer Ring light to red
ornament.setTopRow(1, 0x00ff00)      // Set first Top Row light to green
ornament.setMiddleRow(1, 0x0000ff)  // Set first Middle Row light to blue
ornament.setBottomRow(1, 0xffff00)  // Set first Bottom Row light to yellow
ornament.show()

// Set all of a specific part
ornament.setAllOuterRing(0xff0000)  // Set all Outer Ring lights to red
ornament.setAllTopRow(0x00ff00)     // Set all Top Row lights to green
ornament.setAllMiddleRow(0x0000ff)   // Set all Middle Row lights to blue
ornament.setAllBottomRow(0xffff00)  // Set all Bottom Row lights to yellow
ornament.show()
```

### Motion Sensor

```typescript
// Initialize motion sensor
ornament.initMotionSensor()

// Check for motion
if (ornament.isMotionDetected()) {
    ornament.setAll(0xffffff)  // Turn all lights white when motion detected
    ornament.show()
}
```

### Advanced Usage

```typescript
// Direct pixel control (0-25)
ornament.setPixelColor(0, 0xff0000)  // Set first LED red
ornament.show()

// Get board reference
let board = ornament.strip()
```

## Features
- ✅ Working hardware (WebUSB upload)
- ✅ Working simulator (26 LED visualization)
- ✅ Ornament-specific blocks for easy control (Outer Ring, Top Row, Middle Row, Bottom Row)
- ✅ Motion sensor support
- ✅ 1-based indexing for 8-year-old students


