//% color="#FFBB00" weight=100 icon="\uf1ad"
namespace menorah {
    let _board: MenorahBoard = null;
    function getBoard(): MenorahBoard {
        if (!_board) _board = new MenorahBoard();
        return _board;
    }
    
    // Motion sensor state
    let motionSensorInitialized = false;
    let lastProximityReading = 0;
    let debounceCounter = 0;
    let lastButtonState = false;  // Track button state for edge detection (simulator only)
    const MOTION_SENSOR_ADDR = 0x60;
    const MOVEMENT_THRESHOLD = 15;
    const DEBOUNCE_STEPS = 10;  // 500ms (10 × 50ms) - matches other ornament code for quick toggle behavior
    
    /**
     * Get the Menorah board
     */
    //% blockId=menorah_strip block="menorah board"
    //% weight=100
    export function strip(): MenorahBoard {
        return getBoard();
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

    /**
     * Set color of pixel at index (0-26)
     */
    //% blockId=menorah_setPixelColor block="set pixel color at %index to %color"
    //% index.min=0 index.max=26
    //% color.shadow="colorNumberPicker"
    export function setPixelColor(index: number, color: number) {
        getBoard().setPixelColor(index, color);
    }
    
    /**
     * Set color of a Menorah flame (1-9, left to right)
     * Flame 1 = leftmost, Flame 9 = rightmost
     */
    //% blockId=menorah_setFlame block="set Menorah flame %flameNumber to %color"
    //% flameNumber.min=1 flameNumber.max=9
    //% color.shadow="colorNumberPicker"
    export function setFlame(flameNumber: number, color: number) {
        getBoard().setFlame(flameNumber, color);
    }
    
    /**
     * Set color of a Menorah candle (1-9, left to right)
     * Candle 1 = leftmost, Candle 5 = shammash (middle), Candle 9 = rightmost
     */
    //% blockId=menorah_setCandle block="set Menorah candle %candleNumber to %color"
    //% candleNumber.min=1 candleNumber.max=9
    //% color.shadow="colorNumberPicker"
    export function setCandle(candleNumber: number, color: number) {
        getBoard().setCandle(candleNumber, color);
    }
    
    /**
     * Set color of a menorah base light (1-9, row by row, left to right)
     * Base Light 1 = top left, Base Light 9 = bottom center
     */
    //% blockId=menorah_setBaseLight block="set Menorah base light %baseNumber to %color"
    //% weight=80
    //% baseNumber.min=1 baseNumber.max=9
    //% color.shadow="colorNumberPicker"
    export function setMenorahBaseLight(baseNumber: number, color: number) {
        getBoard().setMenorahBaseLight(baseNumber, color);
    }
    
    /**
     * Set all Menorah flames to the same color
     */
    //% blockId=menorah_setAllFlames block="set all Menorah flames to %color"
    //% color.shadow="colorNumberPicker"
    export function setAllFlames(color: number) {
        getBoard().setAllFlames(color);
    }
    
    /**
     * Set all Menorah candles to the same color
     */
    //% blockId=menorah_setAllCandles block="set all Menorah candles to %color"
    //% color.shadow="colorNumberPicker"
    export function setAllCandles(color: number) {
        getBoard().setAllCandles(color);
    }
    
    /**
     * Set all menorah base lights to the same color
     */
    //% blockId=menorah_setAllMenorahBaseLights block="set all Menorah base lights to %color"
    //% color.shadow="colorNumberPicker"
    export function setAllMenorahBaseLights(color: number) {
        getBoard().setAllMenorahBaseLights(color);
    }
    
    /**
     * Set all pixels to same color
     */
    //% blockId=menorah_setAll block="set all %color"
    //% color.shadow="colorNumberPicker"
    export function setAll(color: number) {
        getBoard().setAll(color);
    }
    
    /**
     * Set brightness for all LEDs (0-255)
     */
    //% blockId=menorah_setBrightness block="set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number) {
        getBoard().setBrightness(brightness);
    }
    
    /**
     * Get list of all flame numbers (1-9)
     */
    //% blockId=menorah_allFlameNumbers block="all flame numbers"
    //% weight=70
    export function allFlameNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    
    /**
     * Get list of flame numbers except shammash (1-4, 6-9)
     */
    //% blockId=menorah_flameNumbersExceptShammash block="flame numbers except shammash"
    //% weight=69
    export function flameNumbersExceptShammash(): number[] {
        return [1, 2, 3, 4, 6, 7, 8, 9];
    }
    
    /**
     * Get list of all candle numbers (1-9)
     */
    //% blockId=menorah_allCandleNumbers block="all candle numbers"
    //% weight=68
    export function allCandleNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    
    /**
     * Get list of candle numbers except shammash (1-4, 6-9)
     */
    //% blockId=menorah_candleNumbersExceptShammash block="candle numbers except shammash"
    //% weight=67
    export function candleNumbersExceptShammash(): number[] {
        return [1, 2, 3, 4, 6, 7, 8, 9];
    }
    
    /**
     * Get list of all base light numbers (1-9)
     */
    //% blockId=menorah_allBaseLightNumbers block="all base light numbers"
    //% weight=66
    export function allBaseLightNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    
    /**
     * Update the LEDs
     */
    //% blockId=menorah_show block="show lights"
    export function show() {
        getBoard().show();
    }
}

class MenorahBoard {
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
     * Set color of pixel at index (0-26) - INTERNAL USE ONLY
     */
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
     * Set color of a flame (1-9, left to right) - INTERNAL USE ONLY
     * Flame 1 = leftmost, Flame 9 = rightmost
     */
    setFlame(flameNumber: number, color: number) {
        if (flameNumber < 1 || flameNumber > 9) return; // Validate input
        
        let physicalIndex: number;
        if (this.useVirtualStrip) {
            // Simulator: visual labels match logical order (left-to-right)
            // Flame 1 → visual index 0 (leftmost), Flame 9 → visual index 8 (rightmost)
            physicalIndex = flameNumber - 1;
        } else {
            // Hardware: physical wiring is backwards for flames
            // Physical index 8 = leftmost, physical index 0 = rightmost
            // Flame 1 (logical leftmost) → Physical index 8, Flame 9 (logical rightmost) → Physical index 0
            physicalIndex = 8 - (flameNumber - 1);
        }
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set color of a candle (1-9, left to right) - INTERNAL USE ONLY
     * Candle 1 = leftmost, Candle 5 = shammash (middle), Candle 9 = rightmost
     */
    setCandle(candleNumber: number, color: number) {
        // Logical mapping: Candle 1 (leftmost) → Physical index 9, Candle 9 (rightmost) → Physical index 17
        // Formula: physicalIndex = 8 + candleNumber
        if (candleNumber < 1 || candleNumber > 9) return; // Validate input
        const physicalIndex = 8 + candleNumber;
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set color of a menorah base light (1-9, row by row, left to right) - INTERNAL USE ONLY
     * Base Light 1 = top left, Base Light 9 = bottom center
     */
    setMenorahBaseLight(baseNumber: number, color: number) {
        // Logical mapping to physical indices 18-26
        // Row 1 (top): 1-3 → indices 18-20 (simulator) or 20, 19, 18 (hardware)
        // Row 2 (middle): 4-8 → indices 21-25
        // Row 3 (bottom): 9 → index 26
        // Hardware note: First 3 LEDs on D7 are wired in reverse order
        // Simulator: direct mapping (base light 1 → index 18)
        // Hardware: reversed for D7 wiring (base light 1 → physical 20 → D7 index 2)
        if (baseNumber < 1 || baseNumber > 9) return; // Validate input
        
        let basePhysicalIndices: number[];
        if (this.useVirtualStrip) {
            // Simulator: direct mapping (no reversal needed)
            basePhysicalIndices = [18, 19, 20, 21, 22, 23, 24, 25, 26];
        } else {
            // Hardware: first 3 reversed for D7 wiring
            basePhysicalIndices = [20, 19, 18, 21, 22, 23, 24, 25, 26];
        }
        
        const physicalIndex = basePhysicalIndices[baseNumber - 1];
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set all flames to the same color - INTERNAL USE ONLY
     */
    setAllFlames(color: number) {
        for (let i = 1; i <= 9; i++) {
            this.setFlame(i, color);
        }
    }
    
    /**
     * Set all candles to the same color - INTERNAL USE ONLY
     */
    setAllCandles(color: number) {
        for (let i = 1; i <= 9; i++) {
            this.setCandle(i, color);
        }
    }
    
    /**
     * Set all menorah base lights to the same color - INTERNAL USE ONLY
     */
    setAllMenorahBaseLights(color: number) {
        for (let i = 1; i <= 9; i++) {
            this.setMenorahBaseLight(i, color);
        }
    }
    
    /**
     * Set all pixels to same color - INTERNAL USE ONLY
     */
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
     * Set brightness for all LEDs (0-255) - INTERNAL USE ONLY
     */
    setBrightness(brightness: number) {
        this.stripD9.setBrightness(brightness);
        if (this.stripD7) {
            this.stripD7.setBrightness(brightness);
        }
    }
    
    /**
     * Update the LED strip - INTERNAL USE ONLY
     */
    show() {
        this.stripD9.show();
        if (this.stripD7) { // Only show D7 if it exists (i.e., not in simulator)
            this.stripD7.show();
        }
    }
}
