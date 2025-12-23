# Add a new board

This is the process needed to add a new board to this editor. Don't hesitate to ping us if you need help getting started.

## Step 1: UF2 bootloader

UF2 is an [open source file format](https://github.com/microsoft/uf2) optimized to transfer files to microcontrollers via USB. All boards in this editor support UF2.

If your board does not support UF2 yet, 

* read UF2 specification: https://github.com/microsoft/uf2
* if your board is SAMD21/SAMD51 based, start from https://github.com/microsoft/uf2-samdx1
* if your board is STM32 based, start from https://github.com/mmoskal/uf2-stm32f

## Step 2: Add a new project

* Add a new project under lib named after your board. Start by copying **adafruit-trinket-m0** and modify all relevant parts:

* update ``pxt.json`` with the title, name, description
* update the ``compilerServiceVariant`` in ``pxt.json`` to match your board chipset
* update ``boardhd.svg`` with a simplified image of your board. See step below.
* update the ``bundled-dirs`` array in ``pxtarget.json`` (root of respository) and add your new folder
* add a code card in ``/docs/boards.md`` and a new markdown file under ``/docs/board/YOUBOARDNAME.md`` with an example that loads your board
* run the local server to test your changes by launching 

    pxt serve --rebundle

### ~ hint

Got any questions? Ping us on the [MakeCode Discord](https://aka.ms/makecodecommunity). More info at [Multi-board](/multiboard).

### ~

## Step 3: boardhd.svg, config.ts and board.json

The board that gets rendered in the simulator must be stored as a SVG in the project.

* use https://maker.makecode.com/board-designer to generate the ``board.json``, ``config.ts`` file. This is a good start but you'll probably need to update it by hand as well.
* try to reduce the complexity of the SVG to reduce the file size
* use a pin id (e.g. ``D11``) or ``connectedname`` (from Fritzing) as names for the pin SVG element

## Step 3.5: Boards with Onboard NeoPixels (Optional)

If your board has **onboard NeoPixel LEDs** (like Circuit Playground Express or custom PCBs with integrated LED strips), follow these additional configuration steps to prevent the simulator from showing an unwanted breadboard.

### The Key Principle

- **Empty `pinBlocks: []`** → Simulator shows only the board (no breadboard)
- **Populated `pinBlocks`** → Simulator shows breadboard for external connections

### Configuration Requirements

#### 1. `board.json` Visual Configuration

```json
{
  "visual": {
    "useCrocClips": false,
    "pinBlocks": [],                    // ← MUST be empty array for no breadboard
    "leds": [
      // Define each onboard NeoPixel position
      {"x": 80, "y": 60, "color": "neopixel", "label": "NEOPIXEL_0"},
      {"x": 120, "y": 60, "color": "neopixel", "label": "NEOPIXEL_1"},
      // ... one entry per LED with x, y coordinates on your SVG
    ]
  },
  "gpioPinMap": {
    // Physical pins for student use
    "D7": "D7",
    "D9": "D9",
    // ...
    
    // Virtual LED labels (for simulator visualization only)
    "NEOPIXEL_0": "NEOPIXEL_0",
    "NEOPIXEL_1": "NEOPIXEL_1",
    // ... one entry per LED (must match labels in "leds" array)
  },
  "onboardComponents": ["pixels"]     // ← Use "pixels" (plural), not "pixel"
}
```

**Important:** Do NOT include `marginWhenBreadboarding` if you're using empty `pinBlocks`.

#### 2. `config.ts` Pin Configuration

```typescript
namespace config {
    export const PIN_NEOPIXEL = DAL.PA12;  // Physical pin controlling the LEDs
    export const NUM_NEOPIXELS = 25;        // Total count for simulator
    
    // Define other pins...
    export const PIN_D7 = DAL.PB22;
    export const PIN_D9 = DAL.PA12;
}
```

### Student Experience

Students control the LEDs via the physical pins in their code:

```typescript
// Single strip on D9
let strip = light.createStrip(pins.D9, 25)
strip.setAll(0xff0000)

// OR multiple strips (e.g., 14 LEDs on D9, 11 on D7)
let strip9 = light.createStrip(pins.D9, 14)
let strip7 = light.createStrip(pins.D7, 11)
strip9.setAll(0xff0000)  // Red
strip7.setAll(0x0000ff)  // Blue
```

The simulator will light up the corresponding `NEOPIXEL_X` coordinates defined in your `leds` array.

### What NOT to Do

❌ **Don't populate `pinBlocks`** if you want no breadboard:
```json
"pinBlocks": [{"x": 350, "y": 50, "labels": ["D7", "D9"]}]  // ← Shows breadboard!
```

❌ **Don't use singular `"pixel"`**:
```json
"onboardComponents": ["pixel"]  // ← Wrong! Use "pixels" (plural)
```

❌ **Don't create custom TypeScript files** with `light.createStrip()` at the namespace level:
- This breaks WebUSB on localhost due to the parts system's static analysis
- Students should call `light.createStrip()` in their own code, not in board config files

### NeoPixel Label Convention

- Labels like `NEOPIXEL_0`, `NEOPIXEL_1` are **virtual labels** for visualization only
- They map to entries in the `leds` array by matching the `label` field
- The simulator sorts them numerically automatically
- These are NOT physical pins—they're just SVG coordinates for rendering

### Reference Example

See `libs/kwanzaa-kinara-lantern/` for a complete working example of a board with 25 onboard NeoPixels across two physical strips.

### Step 3.6: Multiple NeoPixel Pins (Advanced - Optional)

If your board has NeoPixels on **multiple physical data pins**, you need special handling because the simulator only supports rendering from one `neopixelPin`.

**Example:** Kinara has 14 LEDs on D9 and 11 LEDs on D7 (separate pins).

**Solution:** Use runtime detection in `libs/YOUR_BOARD/kinara.ts` to provide different behavior for simulator vs hardware. See `libs/kwanzaa-kinara-lantern/kinara.ts` for complete implementation.

**Key points:**
- Use lazy initialization (functions, not constants) to avoid parts system analysis at module load
- In simulator: Create unified buffer with `.range()` to render all LEDs
- On hardware: Create separate strips on actual pins for independent control
- Students use function calls: `light.strip9()` instead of properties

**Known limitation:** WebUSB may not work reliably on localhost with custom board definitions, even when configuration is correct. Test on production makecode.com or use ItsyBitsy board definition for local development.

## Step 4: minifiy board.svg

Run

    svgo --config=svgo.yml libs/YOUR_BOARD_NAME/boardhd.svg -o libs/YOUR_BOARD_NAME/board.svg

to generate a minified version of ``boardhd.svg``.

## Step 5: Send us a Pull Request!!!
