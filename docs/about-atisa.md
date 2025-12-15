# ATISA Holiday Lantern Boards

**Last Updated:** October 21, 2025  
**Status:** Production-ready architecture for 4 holiday lantern boards

## Overview

The ATISA (Arts Technology Integrated STEAM Approach) platform supports 4 holiday lantern boards, all using the same ItsyBitsy M0 Express microcontroller but with different LED layouts and cultural designs:

1. **Kinara** (African American - Kwanzaa) - ✅ Complete
2. **Philippine Parol** (Filipino - Christmas) - 🔄 Planned
3. **Chanukah Menorah** (Jewish - Hanukkah) - 🔄 Planned
4. **Holiday Lantern** (Generic - Multi-cultural) - 🔄 Planned

## Architecture Pattern

### Shared Components (Identical Across All Boards)

All boards share the same hardware and core configuration:

- **Microcontroller:** Adafruit ItsyBitsy M0 Express (SAMD21)
- **Pin Mappings:** D9 = PA07, D7 = PA21
- **I2C Sensor:** SDA on A4, SCL on A5
- **Speaker:** Pin A0
- **Files (identical):**
  - `config.ts` - Pin mappings and hardware configuration
  - `device.d.ts` - TypeScript pin declarations
  - `pxt.json` structure (only names change)

### Board-Specific Components

Each board customizes:

1. **LED Layout** - Number and arrangement of NeoPixels
2. **Visual Design** - Custom SVG artwork (`board.svg`)
3. **LED Positions** - x,y coordinates in `board.json`
4. **Namespace** - Board-specific API (e.g., `kinara.strip()`, `parol.strip()`)

## File Structure Template

```
libs/
└── [board-name]/
    ├── board.json           # ✏️ Customize: LED positions, count, gpioPinMap
    ├── board.svg            # ✏️ Create new: Cultural artwork with LED positions
    ├── [namespace].ts       # ✏️ Customize: LED counts, namespace name
    ├── config.ts            # ⚠️ Minor edit: NUM_NEOPIXELS only
    ├── device.d.ts          # ✅ Copy as-is from kwanzaa-kinara-lantern
    ├── pxt.json             # ✏️ Update: name, description, file references
    └── README.md            # ✏️ Update: Board description
```

## Reference Implementation: Kinara (Complete)

### Hardware Specs
- **Total LEDs:** 25
- **D9 Strip:** 14 LEDs (indices 0-13)
- **D7 Strip:** 11 LEDs (indices 14-24)
- **Layout:** 7-7-7-4 (4 rows)

### Key Implementation Details

**File:** `libs/kwanzaa-kinara-lantern/kinara.ts`
```typescript
namespace kinara {
    // Total: 25 LEDs
    // D9: 14 LEDs
    // D7: 11 LEDs
    
    export function strip(): KinaraVirtualStrip {
        // Returns unified interface
    }
}

class KinaraVirtualStrip {
    constructor() {
        if (simulator) {
            // Single 25-LED virtual strip on D9
            this.stripD9 = light.createStrip(pins.D9, 25);
        } else {
            // Hardware: two physical strips
            this.stripD9 = light.createStrip(pins.D9, 14);
            this.stripD7 = light.createStrip(pins.D7, 11);
        }
    }
    
    setPixelColor(index: number, color: number) {
        // Route to correct strip based on index
        if (index < 14) D9.setPixel(index)
        else D7.setPixel(index - 14)
    }
}
```

## Creating a New Board: Step-by-Step Guide

### Prerequisites
- LED count for D9 strip
- LED count for D7 strip
- Board SVG artwork with LED circle elements

### Step 1: Copy Template
```bash
cd /Users/kylietaitano/atisa/pxt-atisa
cp -r libs/kwanzaa-kinara-lantern libs/[new-board-name]
cd libs/[new-board-name]
```

### Step 2: Customize Files

#### A. `board.svg` - Create New Artwork
- Design cultural artwork (400x300px recommended)
- Add `<circle>` elements for each LED:
  ```xml
  <circle cx="80" cy="60" r="6" fill="#333" 
          stroke="#000" stroke-width="0.5" 
          id="NEOPIXEL_0"/>
  ```
- Use sequential IDs: `NEOPIXEL_0`, `NEOPIXEL_1`, etc.

#### B. `board.json` - Update LED Configuration
```json
{
  "visual": {
    "leds": [
      {"x": 80, "y": 60, "color": "neopixel", "label": "NEOPIXEL_0"},
      {"x": 120, "y": 60, "color": "neopixel", "label": "NEOPIXEL_1"}
      // ... add all LEDs with SVG coordinates
    ]
  },
  "gpioPinMap": {
    // Keep standard pins (D0-D13, A0-A5, etc.)
    "NEOPIXEL_0": "NEOPIXEL_0",
    "NEOPIXEL_1": "NEOPIXEL_1"
    // ... add all LED labels
  }
}
```

#### C. `[namespace].ts` - Board-Specific Logic

**Example for Philippine Parol:**

```typescript
namespace parol {  // Change namespace name
    let _strip: ParolVirtualStrip = null;
    
    //% blockId=parol_strip block="parol strip"
    export function strip(): ParolVirtualStrip {
        if (!_strip) {
            _strip = new ParolVirtualStrip();
        }
        return _strip;
    }
}

class ParolVirtualStrip {
    private stripD9: light.NeoPixelStrip;
    private stripD7: light.NeoPixelStrip;
    private useVirtualStrip: boolean;
    
    // UPDATE THESE VALUES:
    private static readonly TOTAL_LEDS = 30;     // Total LED count
    private static readonly D9_LED_COUNT = 18;   // D9 strip count
    private static readonly D7_LED_COUNT = 12;   // D7 strip count
    
    constructor() {
        this.useVirtualStrip = (control.deviceDalVersion() === "sim");
        
        if (this.useVirtualStrip) {
            this.stripD9 = light.createStrip(pins.D9, ParolVirtualStrip.TOTAL_LEDS);
            this.stripD7 = null;
        } else {
            this.stripD9 = light.createStrip(pins.D9, ParolVirtualStrip.D9_LED_COUNT);
            this.stripD7 = light.createStrip(pins.D7, ParolVirtualStrip.D7_LED_COUNT);
        }
    }
    
    //% blockId=parol_setPixelColor block="%strip|set pixel color at %index|to %color"
    //% index.min=0 index.max=29  // TOTAL_LEDS - 1
    //% color.shadow="colorNumberPicker"
    setPixelColor(index: number, color: number) {
        if (this.useVirtualStrip) {
            this.stripD9.setPixelColor(index, color);
        } else {
            if (index < ParolVirtualStrip.D9_LED_COUNT) {
                this.stripD9.setPixelColor(index, color);
            } else if (index < ParolVirtualStrip.TOTAL_LEDS) {
                this.stripD7.setPixelColor(index - ParolVirtualStrip.D9_LED_COUNT, color);
            }
        }
        this.show();
    }
    
    //% blockId=parol_setAll block="%strip|set all %color"
    //% color.shadow="colorNumberPicker"
    setAll(color: number) {
        if (this.useVirtualStrip) {
            this.stripD9.setAll(color);
        } else {
            this.stripD9.setAll(color);
            this.stripD7.setAll(color);
        }
        this.show();
    }
    
    //% blockId=parol_setBrightness block="%strip|set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    setBrightness(brightness: number) {
        this.stripD9.setBrightness(brightness);
        if (this.stripD7) {
            this.stripD7.setBrightness(brightness);
        }
    }
    
    //% blockId=parol_show block="%strip|show"
    show() {
        this.stripD9.show();
        if (this.stripD7) {
            this.stripD7.show();
        }
    }
}
```

#### D. `config.ts` - Update LED Count Only
```typescript
// Line to change:
export const NUM_NEOPIXELS = 30;  // Update to match total LED count
```

#### E. `pxt.json` - Update Metadata
```json
{
    "name": "philippine-parol",
    "description": "Philippine Parol Holiday Lantern board",
    "files": [
        "README.md",
        "config.ts",
        "device.d.ts",
        "parol.ts",      // Update filename
        "board.json",
        "board.svg"
    ]
    // ... rest identical to kwanzaa-kinara-lantern
}
```

#### F. `device.d.ts` - No Changes
Copy as-is from `kwanzaa-kinara-lantern`

### Step 3: Register Board in pxtarget.json

Add to `bundleddirs`:
```json
"bundleddirs": [
    // ... existing entries ...
    "libs/kwanzaa-kinara-lantern",
    "libs/philippine-parol",
    "libs/chanukah-menorah",
    "libs/holiday-lantern"
]
```

Add to `boardDefinitions`:
```json
"boardDefinitions": [
    {
        "name": "ItsyBitsy M0 Express",
        "url": "libs/kwanzaa-kinara-lantern",
        "variant": "samd21"
    },
    {
        "name": "Philippine Parol",
        "url": "libs/philippine-parol",
        "variant": "samd21"
    },
    {
        "name": "Chanukah Menorah",
        "url": "libs/chanukah-menorah",
        "variant": "samd21"
    },
    {
        "name": "Holiday Lantern",
        "url": "libs/holiday-lantern",
        "variant": "samd21"
    }
]
```

### Step 4: Test Checklist

- [ ] Simulator displays board SVG correctly
- [ ] All LEDs visible in simulator
- [ ] LEDs light up when running code in simulator
- [ ] WebUSB device detected (shows "ItsyBitsy M0 Express")
- [ ] Code uploads to hardware successfully
- [ ] LEDs light up correctly on physical board
- [ ] No breadboard appears after download
- [ ] Individual pixel control works (D9 and D7 strips)

## Common Pitfalls

### ❌ Don't Do This:
1. **Populate `pinBlocks`** - Causes breadboard to appear
2. **Use wrong LED counts** - Causes index out of bounds errors
3. **Forget to update `gpioPinMap`** - Simulator won't render LEDs
4. **Mix up D9/D7 counts** - Wrong LEDs will light up
5. **Change pin mappings in config.ts** - Breaks hardware compatibility

### ✅ Do This:
1. **Keep `pinBlocks: []`** - Clean simulator view
2. **Update all LED counts consistently** - TOTAL, D9, D7
3. **Add all NEOPIXEL_* entries to gpioPinMap** - One per LED
4. **Test incrementally** - SVG → board.json → TypeScript
5. **Use kwanzaa-kinara-lantern as reference** - Proven working configuration

## Board Information Template

When creating a new board, document:

```markdown
### [Board Name]
- **Culture:** [Cultural tradition]
- **Holiday:** [Holiday celebrated]
- **Total LEDs:** [number]
- **D9 Strip:** [number] LEDs (indices X-Y)
- **D7 Strip:** [number] LEDs (indices X-Y)
- **Layout:** [description, e.g., "9-9-8-4 (4 rows)"]
- **Namespace:** `[name].strip()`
- **Status:** [Planned | In Progress | Complete | Tested]
```

## Board Status

| Board | Culture | LEDs | D9 | D7 | Status |
|-------|---------|------|----|----|--------|
| Kinara | African American (Kwanzaa) | 25 | 14 | 11 | ✅ Complete |
| Parol | Filipino (Christmas) | ? | ? | ? | 🔄 Planned |
| Menorah | Jewish (Hanukkah) | ? | ? | ? | 🔄 Planned |
| Lantern | Multi-cultural | ? | ? | ? | 🔄 Planned |

## Technical Notes

### Why This Architecture?

1. **Shared Hardware** - All boards use identical ItsyBitsy M0, simplifies manufacturing
2. **Independent Namespaces** - Each board has unique API, prevents conflicts
3. **Runtime Detection** - Automatically handles simulator vs hardware differences
4. **Zero Configuration** - Students don't need to specify pins or counts

### Simulator vs Hardware Differences

**Simulator:**
- Single virtual 25-LED strip on D9
- All LEDs rendered from `board.json` coordinates
- Uses range indices (0-24) on one buffer

**Hardware:**
- Two physical strips (D9 and D7)
- Different data lines (PA07 and PA21)
- Code routes indices to correct physical strip

### WebUSB Device Matching

All boards report as "ItsyBitsy M0 Express" over USB because they use the same physical microcontroller. The `pxtarget.json` `defaultBoard` determines which board configuration loads when the device is detected.

## Educational Integration

### Project Categories

Each holiday board has dedicated project tutorials:
- **Kwanzaa Projects:** `/docs/projects/kwanzaa/`
- **Hanukkah Projects:** `/docs/projects/hanukkah/`
- **Christmas Projects:** `/docs/projects/christmas/`
- **Parol Projects:** `/docs/projects/parole/`

### Learning Outcomes

Students learn:
- Programming fundamentals through cultural context
- LED control and color theory
- Pattern recognition and algorithms
- Cultural appreciation and diversity

## Future Enhancements

- [ ] Add animation library with cultural patterns
- [ ] Create shared animation utilities
- [ ] Add sound integration for cultural music
- [ ] Document sensor integration patterns
- [ ] Create educator guide for each board
- [ ] Develop assessment rubrics for cultural projects

## References

- **Kinara Working Implementation:** `/libs/kwanzaa-kinara-lantern/`
- **Board Creation Guide:** `/docs/boards/add-a-new-board.md`
- **MakeCode Documentation:** https://makecode.com/targets/pxt
- **ATISA Project Homepage:** [Add URL when available]

## Support

For technical support or questions about creating new holiday lantern boards:
- Check the [Board Creation Guide](add-a-new-board.md)
- Review the [Kinara implementation](../libs/kwanzaa-kinara-lantern/)
- Contact: [Add support contact information]

---

**Last tested:** October 21, 2025  
**Board revision:** v1  
**Firmware version:** MakeCode Maker (SAMD21 variant)

