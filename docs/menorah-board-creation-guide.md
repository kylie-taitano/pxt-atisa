# Menorah Holiday Lantern Board Creation Guide

## Context

This guide is for creating the **Menorah Holiday Lantern** board configuration based on the existing **Kinara Holiday Lantern (kinara-working)** board. The menorah is one of 4 holiday lantern boards in the åtisa series.

## Base Reference

**Source Board:** `libs/kinara-working/`

Copy this entire directory structure as the starting point for the menorah board.

## Key Differences: Menorah vs Kinara

### LED Configuration
- **Kinara:** 25 total LEDs
  - D9 strip: 14 LEDs
  - D7 strip: 11 LEDs
  
- **Menorah:** 27 total LEDs
  - D9 strip: 18 LEDs
  - D7 strip: 9 LEDs

### Everything Else Stays the Same
- Same microcontroller: Adafruit ItsyBitsy M0 Express (SAMD21)
- Same I2C sensor configuration (VCNL4040 on SDA/SCL, INT on D2)
- Same speaker pin: A0
- Same button: onboard ItsyBitsy button
- Same WebUSB device matching: "ItsyBitsy M0 Express"
- Same pin mappings in `config.ts`
- Same dependencies in `pxt.json`
- Same motion sensor logic structure

## Files to Create/Modify

### 1. Directory Structure
Create new directory: `libs/menorah-working/` (or `libs/menorah-pcb-v1/`)

### 2. `pxt.json`
**Changes needed:**
- Update `name`: Change from `"kinara-working"` to `"menorah-working"` (or `"menorah-pcb-v1"`)
- Update `description`: Change to "Menorah Holiday Lantern - Working board..."
- Keep all other fields identical (dependencies, features, compileServiceVariant, etc.)

### 3. `board.json`
**Critical changes:**

1. **LED array (`visual.leds`):**
   - Update total count from 25 to 27 LEDs
   - Update LED positions in `board.svg` first (see below), then copy coordinates here
   - Labels: `NEOPIXEL_0` through `NEOPIXEL_26` (0-26 = 27 LEDs)

2. **LED index mapping:**
   - **D9 strip (18 LEDs):** Indices 0-17 → `NEOPIXEL_0` through `NEOPIXEL_17`
   - **D7 strip (9 LEDs):** Indices 18-26 → `NEOPIXEL_18` through `NEOPIXEL_26`

3. **gpioPinMap:**
   - Add entries for `NEOPIXEL_25` and `NEOPIXEL_26`
   - All other pin mappings stay the same

4. **Button position:**
   - Keep motion sensor button at same coordinates (x: 187, y: 260) unless menorah SVG requires adjustment

### 4. `board.svg`
**Changes needed:**

1. **Replace Kinara artwork with Menorah artwork:**
   - The menorah SVG should show a menorah (9-branched candelabra) instead of kinara
   - Keep the same brown fill approach (brown rectangle background + black stroke outline)
   - Maintain same overall dimensions and viewBox: `viewBox="0 0 400 300"`

2. **LED positioning:**
   - **D9 strip (18 LEDs):** Position these to represent the 9 menorah candles/arms (possibly 2 LEDs per branch, or arranged to match menorah design)
   - **D7 strip (9 LEDs):** Position these at the base or holder of the menorah
   - Each LED needs a `<circle>` element with:
     - `id="NEOPIXEL_D9_0"` through `id="NEOPIXEL_D9_17"` for D9 strip
     - `id="NEOPIXEL_D7_0"` through `id="NEOPIXEL_D7_8"` for D7 strip (but remember these map to `NEOPIXEL_18` through `NEOPIXEL_26` in board.json)
   - **Note:** The `id` attribute on circles in SVG should match the pattern used in kinara (e.g., `NEOPIXEL_D9_0`), but the `label` in `board.json` uses sequential numbering (`NEOPIXEL_0`)

3. **Coordinate system:**
   - SVG viewBox: `0 0 400 300`
   - LED circles: `cx` and `cy` define center position, `r="6"` for radius
   - Match the visual design of the menorah (likely 9 branches/candles)

### 5. `kinara.ts` → `menorah.ts`
**Changes needed:**

1. **Rename namespace:**
   - Change `namespace kinara` to `namespace menorah`
   - Update all block IDs: `kinara_strip` → `menorah_strip`, `kinara_initMotionSensor` → `menorah_initMotionSensor`, etc.
   - Update comments: "25-LED" → "27-LED", "14 LEDs on D9" → "18 LEDs on D9", etc.

2. **Rename class:**
   - `KinaraVirtualStrip` → `MenorahVirtualStrip`

3. **Update LED counts:**
   ```typescript
   // In constructor:
   // Simulator: single virtual 27-LED strip for visualization
   this.stripD9 = light.createStrip(pins.D9, 27);  // Changed from 25
   
   // Hardware: two separate physical strips
   this.stripD9 = light.createStrip(pins.D9, 18);  // Changed from 14
   this.stripD7 = light.createStrip(pins.D7, 9);   // Changed from 11
   ```

4. **Update index routing in `setPixelColor`:**
   ```typescript
   // Hardware: route to correct physical strip
   if (index < 18) {  // Changed from index < 14
       // D9 strip (indices 0-17)
       this.stripD9.setPixelColor(index, color);
   } else if (index < 27) {  // Changed from index < 25
       // D7 strip (indices 18-26 → D7 indices 0-8)
       this.stripD7.setPixelColor(index - 18, color);  // Changed from index - 14
   }
   ```

5. **Update block parameter limits:**
   - `index.max=24` → `index.max=26` (for setPixelColor block)

6. **Update motion sensor comments:**
   - References to "Kinara" should become "Menorah"
   - Keep all motion sensor logic identical (I2C address, debouncing, etc.)

### 6. `config.ts`
**Changes needed:**

1. **Update NeoPixel count:**
   ```typescript
   export const NUM_NEOPIXELS = 27;  // Changed from 25
   ```

2. **Keep everything else identical:**
   - All pin mappings stay the same
   - `PIN_NEOPIXEL` stays the same (D9/DAL.PA07)

### 7. `device.d.ts`
**Copy as-is** (no changes needed - same hardware)

### 8. `README.md`
**Changes needed:**

1. Update title: "Menorah Holiday Lantern (Working)"
2. Update description
3. Update hardware section:
   - "27 NeoPixel LEDs (18 on D9, 9 on D7)"
4. Update usage example:
   ```typescript
   let strip = menorah.strip()  // Changed from kinara.strip()
   ```
5. Update features list (change API name from `kinara.strip()` to `menorah.strip()`)

### 9. Locale Files (`_locales/`)
**If they exist:**
- Rename JSON files from `kinara-working-*` to `menorah-working-*`
- Update all string references from "kinara" to "menorah"
- Update LED count references (25 → 27, 14 → 18, 11 → 9)

## Testing Checklist

After creating the menorah board:

- [ ] **Simulator:**
  - [ ] Menorah SVG displays correctly
  - [ ] All 27 LEDs are visible
  - [ ] LEDs are positioned correctly (18 on D9 strip area, 9 on D7 strip area)
  - [ ] Motion sensor button is clickable and works with edge detection

- [ ] **Hardware:**
  - [ ] WebUSB device detection works
  - [ ] Code uploads successfully
  - [ ] 18 LEDs light up on D9 pin
  - [ ] 9 LEDs light up on D7 pin
  - [ ] Motion sensor responds correctly
  - [ ] Speaker works on A0

- [ ] **API:**
  - [ ] `menorah.strip()` block appears in toolbox
  - [ ] `menorah.initMotionSensor()` block appears
  - [ ] `menorah.isMotionDetected()` block appears
  - [ ] `setPixelColor` accepts indices 0-26
  - [ ] `setAll()` works for all 27 LEDs
  - [ ] Virtual strip behavior works correctly in simulator (single 27-LED strip)

## Key Architecture Notes

### Simulator vs Hardware Split
- **Simulator:** Creates a single virtual 27-LED strip on D9 for unified visualization
- **Hardware:** Creates two separate physical strips (18 LEDs on D9, 9 LEDs on D7)
- The `MenorahVirtualStrip` class handles the routing automatically

### LED Index Mapping
- Student-facing API uses indices 0-26 (virtual unified strip)
- Hardware routing:
  - Indices 0-17 → D9 physical strip (pixel 0-17)
  - Indices 18-26 → D7 physical strip (pixel 0-8)

### Motion Sensor
- Uses same VCNL4040 I2C sensor
- Same debouncing logic (500ms, 10 steps)
- Simulator uses button D2 with edge detection
- Hardware uses I2C proximity readings

## Files Reference

### From kinara-working (copy these as templates):

```
libs/kinara-working/
├── pxt.json                    → Modify: name, description
├── board.json                  → Modify: LED array, gpioPinMap (add 2 more LEDs)
├── board.svg                   → Replace: Menorah artwork + 27 LED positions
├── config.ts                   → Modify: NUM_NEOPIXELS = 27
├── kinara.ts                   → Rename to menorah.ts, modify LED counts and namespace
├── device.d.ts                 → Copy as-is
├── README.md                   → Modify: Update all references
└── _locales/                   → Modify: Rename files and update strings
    ├── kinara-working-jsdoc-strings.json
    └── kinara-working-strings.json
```

## Next Steps

1. Create `libs/menorah-working/` directory
2. Copy all files from `libs/kinara-working/` to `libs/menorah-working/`
3. Make systematic changes as outlined above
4. Create/obtain menorah SVG artwork
5. Position 27 LEDs in board.svg to match menorah design
6. Update board.json with LED coordinates
7. Test in simulator
8. Test on hardware

## Important Reminders

- **LED count matters:** Always check that totals add up (18 + 9 = 27)
- **Index boundaries:** D9 uses 0-17, D7 uses 18-26
- **Virtual strip size:** Simulator uses 27 LEDs on D9
- **Physical strips:** Hardware uses 18 on D9, 9 on D7
- **Block IDs:** Must be unique across all boards (use `menorah_` prefix)
- **WebUSB:** Board name in pxtarget.json must match physical device ("ItsyBitsy M0 Express")

