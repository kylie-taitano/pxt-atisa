namespace menorah {
    let _strip: MenorahVirtualStrip = null;
    
    // Motion sensor state
    let motionSensorInitialized = false;
    let lastProximityReading = 0;
    let debounceCounter = 0;
    let lastButtonState = false;  // Track button state for edge detection (simulator only)
    const MOTION_SENSOR_ADDR = 0x60;
    const MOVEMENT_THRESHOLD = 15;
    const DEBOUNCE_STEPS = 10;  // 500ms (10 × 50ms) - matches other ornament code for quick toggle behavior
    
    /**
     * Get the Menorah 27-LED strip
     */
    //% blockId=menorah_strip block="menorah strip"
    //% weight=100
    export function strip(): MenorahVirtualStrip {
        if (!_strip) {
            _strip = new MenorahVirtualStrip();
        }
        return _strip;
    }
    
    /**
     * Initialize the motion sensor - call this once at the start
     */
    //% blockId=menorah_initMotionSensor block="initialize motion sensor"
    //% weight=90
    export function initMotionSensor() {
        // Write to sensor configuration register to enable proximity
        const message = pins.createBuffer(3);
        message[0] = 0x03;  // register address
        message[1] = 0x00;  // value low byte
        message[2] = 0x00;  // value high byte (0x0000 = enable proximity)
        pins.i2cWriteBuffer(MOTION_SENSOR_ADDR, message);
        
        // Let sensor stabilize
        pause(100);
        
        // Read initial proximity value to establish baseline
        pins.i2cWriteNumber(MOTION_SENSOR_ADDR, 0x08, NumberFormat.UInt8BE, true);
        const data = pins.i2cReadBuffer(MOTION_SENSOR_ADDR, 2);
        lastProximityReading = data[0] | (data[1] << 8);
        
        motionSensorInitialized = true;
    }
    
    /**
     * Check if motion is detected - returns true if someone moved nearby
     */
    //% blockId=menorah_isMotionDetected block="motion detected"
    //% weight=85
    export function isMotionDetected(): boolean {
        // Check if we're in simulator mode
        if (control.deviceDalVersion() === "sim") {
            // Simulator: Use button to simulate motion detection with edge detection
            // Update debounce counter
            if (debounceCounter > 0) {
                debounceCounter--;
            }
            
            // Read current button state
            const currentButtonState = input.buttonD2.isPressed();
            
            // Detect edge: button transition from not-pressed (false) to pressed (true)
            const buttonJustPressed = currentButtonState && !lastButtonState;
            
            // Update button state for next call
            lastButtonState = currentButtonState;
            
            // Check if button was just pressed (edge detected) and debounce period expired
            if (buttonJustPressed && debounceCounter === 0) {
                debounceCounter = DEBOUNCE_STEPS;  // Start debounce period
                return true;  // Motion detected!
            }
            
            return false;  // No motion detected
        }
        
        // Hardware: Use real I2C motion sensor
        if (!motionSensorInitialized) {
            initMotionSensor();  // Auto-initialize if not done
        }
        
        // Always read current proximity value (matches other ornament code behavior)
        pins.i2cWriteNumber(MOTION_SENSOR_ADDR, 0x08, NumberFormat.UInt8BE, true);
        const data = pins.i2cReadBuffer(MOTION_SENSOR_ADDR, 2);
        const currentReading = data[0] | (data[1] << 8);
        const movementChange = Math.abs(currentReading - lastProximityReading);
        
        // Update debounce counter
        if (debounceCounter > 0) {
            debounceCounter--;
        }
        
        // Check if movement exceeds threshold (only if debounce period expired)
        if (movementChange > MOVEMENT_THRESHOLD && debounceCounter === 0) {
            debounceCounter = DEBOUNCE_STEPS;  // Start debounce period
            lastProximityReading = currentReading;
            return true;  // Motion detected!
        }
        
        // Always update baseline (matches other ornament code - prevents drift)
        lastProximityReading = currentReading;
        return false;  // No motion detected
    }
}

class MenorahVirtualStrip {
    private stripD9: light.NeoPixelStrip;
    private stripD7: light.NeoPixelStrip;
    private useVirtualStrip: boolean;
    
    constructor() {
        // Detect if we're running in simulator or on hardware
        this.useVirtualStrip = (control.deviceDalVersion() === "sim");
        
        if (this.useVirtualStrip) {
            // Simulator: single virtual 27-LED strip for visualization
            this.stripD9 = light.createStrip(pins.D9, 27);
            this.stripD7 = null; // Not used in simulator mode
        } else {
            // Hardware: two separate physical strips
            this.stripD9 = light.createStrip(pins.D9, 18);
            this.stripD7 = light.createStrip(pins.D7, 9);
        }
    }
    
    /**
     * Set color of pixel at index (0-26)
     */
    //% blockId=menorah_setPixelColor block="%strip|set pixel color at %index|to %color"
    //% index.min=0 index.max=26
    //% color.shadow="colorNumberPicker"
    setPixelColor(index: number, color: number) {
        if (this.useVirtualStrip) {
            // Simulator: single virtual strip
            this.stripD9.setPixelColor(index, color);
        } else {
            // Hardware: route to correct physical strip
            if (index < 18) {
                // D9 strip (indices 0-17)
                this.stripD9.setPixelColor(index, color);
            } else if (index < 27) {
                // D7 strip (indices 18-26 → D7 indices 0-8)
                this.stripD7.setPixelColor(index - 18, color);
            }
        }
        this.show();
    }
    
    /**
     * Set all pixels to same color
     */
    //% blockId=menorah_setAll block="%strip|set all %color"
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
    //% blockId=menorah_setBrightness block="%strip|set brightness %brightness"
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
    //% blockId=menorah_show block="%strip|show"
    show() {
        this.stripD9.show();
        if (this.stripD7) { // Only show D7 if it exists (i.e., not in simulator)
            this.stripD7.show();
        }
    }
}
