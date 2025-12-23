//% color="#FF6B6B" weight=100 icon="\uf7b8"
namespace ornament {
    let _board: OrnamentBoard = null;
    function getBoard(): OrnamentBoard {
        if (!_board) _board = new OrnamentBoard();
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
     * Set brightness for all LEDs (0-255)
     */
    //% blockId=ornament_setBrightness block="set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=100
    export function setBrightness(brightness: number) {
        getBoard().setBrightness(brightness);
    }
    
    /**
     * Update the LEDs
     */
    //% blockId=ornament_show block="show lights"
    //% weight=95
    export function show() {
        getBoard().show();
    }
    
    /**
     * Set color of an Outer Ring light (1-12)
     * Outer Ring 1 = first position (counter-clockwise from top), Outer Ring 12 = last position
     */
    //% blockId=ornament_setOuterRing block="set Outer Ring %ringNumber to %color"
    //% ringNumber.min=1 ringNumber.max=12
    //% color.shadow="colorNumberPicker"
    //% weight=90
    export function setOuterRing(ringNumber: number, color: number) {
        getBoard().setOuterRing(ringNumber, color);
    }
    
    /**
     * Set color of a Top Row light (1-5)
     * Top Row 1 = first position, Top Row 5 = last position
     */
    //% blockId=ornament_setTopRow block="set Top Row %rowNumber to %color"
    //% rowNumber.min=1 rowNumber.max=5
    //% color.shadow="colorNumberPicker"
    //% weight=89
    export function setTopRow(rowNumber: number, color: number) {
        getBoard().setTopRow(rowNumber, color);
    }
    
    /**
     * Set color of a Middle Row light (1-4)
     * Middle Row 1 = first position, Middle Row 4 = last position
     */
    //% blockId=ornament_setMiddleRow block="set Middle Row %rowNumber to %color"
    //% rowNumber.min=1 rowNumber.max=4
    //% color.shadow="colorNumberPicker"
    //% weight=88
    export function setMiddleRow(rowNumber: number, color: number) {
        getBoard().setMiddleRow(rowNumber, color);
    }
    
    /**
     * Set color of a Bottom Row light (1-5)
     * Bottom Row 1 = first position, Bottom Row 5 = last position
     */
    //% blockId=ornament_setBottomRow block="set Bottom Row %rowNumber to %color"
    //% rowNumber.min=1 rowNumber.max=5
    //% color.shadow="colorNumberPicker"
    //% weight=87
    export function setBottomRow(rowNumber: number, color: number) {
        getBoard().setBottomRow(rowNumber, color);
    }
    
    /**
     * Get list of all Outer Ring numbers (1-12)
     */
    //% blockId=ornament_allOuterRingNumbers block="all Outer Ring numbers"
    //% weight=80
    export function allOuterRingNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    
    /**
     * Get list of all Top Row numbers (1-5)
     */
    //% blockId=ornament_allTopRowNumbers block="all Top Row numbers"
    //% weight=79
    export function allTopRowNumbers(): number[] {
        return [1, 2, 3, 4, 5];
    }
    
    /**
     * Get list of all Middle Row numbers (1-4)
     */
    //% blockId=ornament_allMiddleRowNumbers block="all Middle Row numbers"
    //% weight=78
    export function allMiddleRowNumbers(): number[] {
        return [1, 2, 3, 4];
    }
    
    /**
     * Get list of all Bottom Row numbers (1-5)
     */
    //% blockId=ornament_allBottomRowNumbers block="all Bottom Row numbers"
    //% weight=77
    export function allBottomRowNumbers(): number[] {
        return [1, 2, 3, 4, 5];
    }
    
    /**
     * Set all Outer Ring lights to the same color
     */
    //% blockId=ornament_setAllOuterRing block="set all Outer Ring to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=70
    export function setAllOuterRing(color: number) {
        getBoard().setAllOuterRing(color);
    }
    
    /**
     * Set all Top Row lights to the same color
     */
    //% blockId=ornament_setAllTopRow block="set all Top Row to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=69
    export function setAllTopRow(color: number) {
        getBoard().setAllTopRow(color);
    }
    
    /**
     * Set all Middle Row lights to the same color
     */
    //% blockId=ornament_setAllMiddleRow block="set all Middle Row to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=68
    export function setAllMiddleRow(color: number) {
        getBoard().setAllMiddleRow(color);
    }
    
    /**
     * Set all Bottom Row lights to the same color
     */
    //% blockId=ornament_setAllBottomRow block="set all Bottom Row to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=67
    export function setAllBottomRow(color: number) {
        getBoard().setAllBottomRow(color);
    }
    
    /**
     * Set all pixels to same color
     */
    //% blockId=ornament_setAll block="set all %color"
    //% color.shadow="colorNumberPicker"
    //% weight=66
    export function setAll(color: number) {
        getBoard().setAll(color);
    }
    
    /**
     * Initialize the motion sensor - call this once at the start
     */
    //% blockId=ornament_initMotionSensor block="initialize motion sensor"
    //% weight=60
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
    //% blockId=ornament_isMotionDetected block="motion detected"
    //% weight=59
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
     * Set color of pixel at index (0-25)
     */
    //% blockId=ornament_setPixelColor block="set pixel color at %index to %color"
    //% index.min=0 index.max=25
    //% color.shadow="colorNumberPicker"
    //% weight=58
    export function setPixelColor(index: number, color: number) {
        getBoard().setPixelColor(index, color);
    }
    
    /**
     * Get the Ornament board
     */
    //% blockId=ornament_strip block="ornament board"
    //% weight=57
    export function strip(): OrnamentBoard {
        return getBoard();
    }
}

class OrnamentBoard {
    private stripD9: light.NeoPixelStrip;
    private stripD7: light.NeoPixelStrip;
    private useVirtualStrip: boolean;
    
    constructor() {
        // Detect if we're running in simulator or on hardware
        this.useVirtualStrip = (control.deviceDalVersion() === "sim");
        
        if (this.useVirtualStrip) {
            // Simulator: single virtual 26-LED strip for visualization
            this.stripD9 = light.createStrip(pins.D9, 26);
            this.stripD7 = null; // Not used in simulator mode
        } else {
            // Hardware: two separate physical strips
            // D9: 12 LEDs, D7: 14 LEDs (total 26)
            this.stripD9 = light.createStrip(pins.D9, 12);
            this.stripD7 = light.createStrip(pins.D7, 14);
        }
    }
    
    /**
     * Set color of pixel at index (0-25) - INTERNAL USE ONLY
     * Virtual indices: 0-11 = D9, 12-25 = D7
     */
    setPixelColor(index: number, color: number) {
        if (this.useVirtualStrip) {
            // Simulator: single virtual strip
            this.stripD9.setPixelColor(index, color);
        } else {
            // Hardware: route to correct physical strip
            if (index < 12) {
                // D9 strip (indices 0-11)
                this.stripD9.setPixelColor(index, color);
            } else if (index < 26) {
                // D7 strip (indices 12-25 → D7 indices 0-13)
                this.stripD7.setPixelColor(index - 12, color);
            }
        }
        this.show();
    }
    
    /**
     * Set color of an Outer Ring light (1-12) - INTERNAL USE ONLY
     * Outer Ring mapping: D9 indices 0-11 (counter-clockwise)
     * Logical 1-12 maps to physical indices 0-11 in order
     */
    setOuterRing(ringNumber: number, color: number) {
        if (ringNumber < 1 || ringNumber > 12) return; // Validate input
        
        // Outer Ring physical indices on D9: [0,1,2,3,4,5,6,7,8,9,10,11]
        // Counter-clockwise, with indices 3 and 4 at top (3 right of 4)
        const physicalIndex = ringNumber - 1;
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set color of a Top Row light (1-5) - INTERNAL USE ONLY
     * Top Row 1 = leftmost, Top Row 5 = rightmost
     * Simulator: D7 indices [0,1,2,3,4] → virtual indices [12,13,14,15,16]
     * Hardware: D7 strip is physically wired in reverse, so use [4,3,2,1,0] to get left-to-right
     */
    setTopRow(rowNumber: number, color: number) {
        if (rowNumber < 1 || rowNumber > 5) return; // Validate input
        
        if (this.useVirtualStrip) {
            // Simulator: D7 indices [0,1,2,3,4] → virtual indices [12,13,14,15,16]
            const topRowD7Indices = [0, 1, 2, 3, 4];
            const d7Index = topRowD7Indices[rowNumber - 1];
            const virtualIndex = 12 + d7Index;
            this.setPixelColor(virtualIndex, color);
        } else {
            // Hardware: D7 strip is physically wired in reverse order
            // To get left-to-right visual: Top Row 1 → D7 index 4, Top Row 5 → D7 index 0
            const topRowD7Indices = [4, 3, 2, 1, 0];
            const d7Index = topRowD7Indices[rowNumber - 1];
            const virtualIndex = 12 + d7Index;
            this.setPixelColor(virtualIndex, color);
        }
    }
    
    /**
     * Set color of a Middle Row light (1-4) - INTERNAL USE ONLY
     * Middle Row mapping: D7 indices [5,13,12,11] → virtual indices [17,25,24,23]
     */
    setMiddleRow(rowNumber: number, color: number) {
        if (rowNumber < 1 || rowNumber > 4) return; // Validate input
        
        // Middle Row physical indices on D7: [5,13,12,11] → virtual indices [17,25,24,23]
        const middleRowD7Indices = [5, 13, 12, 11];
        const d7Index = middleRowD7Indices[rowNumber - 1];
        const virtualIndex = 12 + d7Index; // D7 starts at virtual index 12
        this.setPixelColor(virtualIndex, color);
    }
    
    /**
     * Set color of a Bottom Row light (1-5) - INTERNAL USE ONLY
     * Bottom Row mapping: D7 indices [6,7,8,9,10] → virtual indices [18,19,20,21,22]
     */
    setBottomRow(rowNumber: number, color: number) {
        if (rowNumber < 1 || rowNumber > 5) return; // Validate input
        
        // Bottom Row physical indices on D7: [6,7,8,9,10] → virtual indices [18,19,20,21,22]
        const bottomRowD7Indices = [6, 7, 8, 9, 10];
        const d7Index = bottomRowD7Indices[rowNumber - 1];
        const virtualIndex = 12 + d7Index; // D7 starts at virtual index 12
        this.setPixelColor(virtualIndex, color);
    }
    
    /**
     * Set all Outer Ring lights to the same color - INTERNAL USE ONLY
     */
    setAllOuterRing(color: number) {
        for (let i = 1; i <= 12; i++) {
            this.setOuterRing(i, color);
        }
    }
    
    /**
     * Set all Top Row lights to the same color - INTERNAL USE ONLY
     */
    setAllTopRow(color: number) {
        for (let i = 1; i <= 5; i++) {
            this.setTopRow(i, color);
        }
    }
    
    /**
     * Set all Middle Row lights to the same color - INTERNAL USE ONLY
     */
    setAllMiddleRow(color: number) {
        for (let i = 1; i <= 4; i++) {
            this.setMiddleRow(i, color);
        }
    }
    
    /**
     * Set all Bottom Row lights to the same color - INTERNAL USE ONLY
     */
    setAllBottomRow(color: number) {
        for (let i = 1; i <= 5; i++) {
            this.setBottomRow(i, color);
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

