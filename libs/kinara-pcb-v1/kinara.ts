namespace kinara {
    let _strip: KinaraVirtualStrip = null;
    
    /**
     * Get the Kinara 25-LED strip
     */
    //% blockId=kinara_strip block="kinara strip"
    //% weight=100
    export function strip(): KinaraVirtualStrip {
        if (!_strip) {
            _strip = new KinaraVirtualStrip();
        }
        return _strip;
    }
}

class KinaraVirtualStrip {
    private stripD9: light.NeoPixelStrip;
    private stripD7: light.NeoPixelStrip;
    private useVirtualStrip: boolean;
    
    constructor() {
        // Detect if we're running in simulator or on hardware
        this.useVirtualStrip = (control.deviceDalVersion() === "sim");
        
        if (this.useVirtualStrip) {
            // Simulator: single virtual 25-LED strip for visualization
            this.stripD9 = light.createStrip(pins.D9, 25);
            this.stripD7 = null; // Not used in simulator mode
        } else {
            // Hardware: two separate physical strips
            this.stripD9 = light.createStrip(pins.D9, 14);
            this.stripD7 = light.createStrip(pins.D7, 11);
        }
    }
    
    /**
     * Set color of pixel at index (0-24)
     */
    //% blockId=kinara_setPixelColor block="%strip|set pixel color at %index|to %color"
    //% index.min=0 index.max=24
    //% color.shadow="colorNumberPicker"
    setPixelColor(index: number, color: number) {
        if (this.useVirtualStrip) {
            // Simulator: single virtual strip
            this.stripD9.setPixelColor(index, color);
        } else {
            // Hardware: route to correct physical strip
            if (index < 14) {
                // D9 strip (indices 0-13)
                this.stripD9.setPixelColor(index, color);
            } else if (index < 25) {
                // D7 strip (indices 14-24 → D7 indices 0-10)
                this.stripD7.setPixelColor(index - 14, color);
            }
        }
        this.show();
    }
    
    /**
     * Set all pixels to same color
     */
    //% blockId=kinara_setAll block="%strip|set all %color"
    //% color.shadow="colorNumberPicker"
    setAll(color: number) {
        if (this.useVirtualStrip) {
            // Simulator: single virtual strip
            this.stripD9.setAll(color);
        } else {
            // Hardware: set both physical strips
            this.stripD9.setAll(color);
            this.stripD7.setAll(color);
        }
        this.show();
    }
    
    /**
     * Set brightness for all LEDs (0-255)
     */
    //% blockId=kinara_setBrightness block="%strip|set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    setBrightness(brightness: number) {
        this.stripD9.setBrightness(brightness);
        if (this.stripD7) {
            this.stripD7.setBrightness(brightness);
        }
    }
    
    /**
     * Update the LED strip
     */
    //% blockId=kinara_show block="%strip|show"
    show() {
        this.stripD9.show();
        if (this.stripD7) { // Only show D7 if it exists (i.e., not in simulator)
            this.stripD7.show();
        }
    }
}
