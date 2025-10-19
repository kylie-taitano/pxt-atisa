/**
 * Kinara-specific NeoPixel routing for dual-strip hardware
 * 
 * Hardware configuration:
 * - D9 (PIN_NEOPIXEL): 14 LEDs physically connected
 * - D7: 11 LEDs physically connected (separate data line)
 * 
 * Solution uses runtime detection:
 * - In simulator: Unified 25-LED buffer on D9, sliced with .range()
 * - On hardware: Separate strips on D9 and D7 pins for independent control
 */

namespace light {
    // Cached strip instances
    let _strip9: light.NeoPixelStrip = null;
    let _strip7: light.NeoPixelStrip = null;
    let _unified: light.NeoPixelStrip = null;

    /**
     * Detect if code is running in the simulator vs on hardware
     */
    function isSimulator(): boolean {
        // In simulator, deviceDalVersion returns "sim" or empty string
        // On hardware, it returns actual version string
        return !control.deviceDalVersion() || control.deviceDalVersion() === "sim";
    }

    /**
     * Get the strip for D9 (14 LEDs)
     * - Simulator: Range [0-13] of unified 25-LED buffer
     * - Hardware: Independent 14-LED strip on D9 pin
     */
    //% blockId=light_strip9 block="strip D9"
    //% weight=100
    //% blockSetVariable=strip9
    export function strip9(): light.NeoPixelStrip {
        if (!_strip9) {
            if (isSimulator()) {
                // Create unified strip on first call (lazy initialization)
                if (!_unified) {
                    _unified = light.createNeoPixelStrip(pins.D9, 25);
                }
                _strip9 = _unified.range(0, 14);
            } else {
                _strip9 = light.createNeoPixelStrip(pins.D9, 14);
            }
        }
        return _strip9;
    }

    /**
     * Get the strip for D7 (11 LEDs)
     * - Simulator: Range [14-24] of unified 25-LED buffer (shares with D9)
     * - Hardware: Independent 11-LED strip on D7 pin
     */
    //% blockId=light_strip7 block="strip D7"
    //% weight=99
    //% blockSetVariable=strip7
    export function strip7(): light.NeoPixelStrip {
        if (!_strip7) {
            if (isSimulator()) {
                // Create unified strip on first call (lazy initialization)
                if (!_unified) {
                    _unified = light.createNeoPixelStrip(pins.D9, 25);
                }
                _strip7 = _unified.range(14, 11);
            } else {
                _strip7 = light.createNeoPixelStrip(pins.D7, 11);
            }
        }
        return _strip7;
    }
}
