//% color="#DC143C" weight=100 icon="\uf005"
namespace parol {
    let _board: ParolBoard = null;
    function getBoard(): ParolBoard {
        if (!_board) _board = new ParolBoard();
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
    //% blockId=parol_setBrightness block="set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=100
    export function setBrightness(brightness: number) {
        getBoard().setBrightness(brightness);
    }
    
    /**
     * Update the LEDs
     */
    //% blockId=parol_show block="show lights"
    //% weight=95
    export function show() {
        getBoard().show();
    }
    
    /**
     * Set color of an Outer Ring light (1-10)
     * Outer Ring 1 = first position, Outer Ring 10 = last position
     */
    //% blockId=parol_setOuterRing block="set Outer Ring %ringNumber to %color"
    //% ringNumber.min=1 ringNumber.max=10
    //% color.shadow="colorNumberPicker"
    //% weight=90
    export function setOuterRing(ringNumber: number, color: number) {
        getBoard().setOuterRing(ringNumber, color);
    }
    
    /**
     * Set color of a Left Tassel light (1-2)
     * Left Tassel 1 = top, Left Tassel 2 = bottom
     */
    //% blockId=parol_setLeftTassel block="set Left Tassel %tasselNumber to %color"
    //% tasselNumber.min=1 tasselNumber.max=2
    //% color.shadow="colorNumberPicker"
    //% weight=89
    export function setLeftTassel(tasselNumber: number, color: number) {
        getBoard().setLeftTassel(tasselNumber, color);
    }
    
    /**
     * Set color of a Right Tassel light (1-2)
     * Right Tassel 1 = top, Right Tassel 2 = bottom
     */
    //% blockId=parol_setRightTassel block="set Right Tassel %tasselNumber to %color"
    //% tasselNumber.min=1 tasselNumber.max=2
    //% color.shadow="colorNumberPicker"
    //% weight=88
    export function setRightTassel(tasselNumber: number, color: number) {
        getBoard().setRightTassel(tasselNumber, color);
    }
    
    /**
     * Set color of a Ray (1-5)
     * Ray 1 = first ray, Ray 5 = last ray
     */
    //% blockId=parol_setRay block="set Ray %rayNumber to %color"
    //% rayNumber.min=1 rayNumber.max=5
    //% color.shadow="colorNumberPicker"
    //% weight=87
    export function setRay(rayNumber: number, color: number) {
        getBoard().setRay(rayNumber, color);
    }
    
    /**
     * Set color of a Petal (1-5)
     * Petal 1 = first petal, Petal 5 = last petal
     */
    //% blockId=parol_setPetal block="set Petal %petalNumber to %color"
    //% petalNumber.min=1 petalNumber.max=5
    //% color.shadow="colorNumberPicker"
    //% weight=86
    export function setPetal(petalNumber: number, color: number) {
        getBoard().setPetal(petalNumber, color);
    }
    
    /**
     * Get list of all Outer Ring numbers (1-10)
     */
    //% blockId=parol_allOuterRingNumbers block="all Outer Ring numbers"
    //% weight=80
    export function allOuterRingNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    
    /**
     * Get list of all Left Tassel numbers (1-2)
     */
    //% blockId=parol_allLeftTasselNumbers block="all Left Tassel numbers"
    //% weight=79
    export function allLeftTasselNumbers(): number[] {
        return [1, 2];
    }
    
    /**
     * Get list of all Right Tassel numbers (1-2)
     */
    //% blockId=parol_allRightTasselNumbers block="all Right Tassel numbers"
    //% weight=78
    export function allRightTasselNumbers(): number[] {
        return [1, 2];
    }
    
    /**
     * Get list of all Ray numbers (1-5)
     */
    //% blockId=parol_allRayNumbers block="all Ray numbers"
    //% weight=77
    export function allRayNumbers(): number[] {
        return [1, 2, 3, 4, 5];
    }
    
    /**
     * Get list of all Petal numbers (1-5)
     */
    //% blockId=parol_allPetalNumbers block="all Petal numbers"
    //% weight=76
    export function allPetalNumbers(): number[] {
        return [1, 2, 3, 4, 5];
    }
    
    /**
     * Set all Outer Ring lights to the same color
     */
    //% blockId=parol_setAllOuterRing block="set all Outer Ring to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=70
    export function setAllOuterRing(color: number) {
        getBoard().setAllOuterRing(color);
    }
    
    /**
     * Set all Left Tassel lights to the same color
     */
    //% blockId=parol_setAllLeftTassel block="set all Left Tassel to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=69
    export function setAllLeftTassel(color: number) {
        getBoard().setAllLeftTassel(color);
    }
    
    /**
     * Set all Right Tassel lights to the same color
     */
    //% blockId=parol_setAllRightTassel block="set all Right Tassel to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=68
    export function setAllRightTassel(color: number) {
        getBoard().setAllRightTassel(color);
    }
    
    /**
     * Set all Rays to the same color
     */
    //% blockId=parol_setAllRays block="set all Rays to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=67
    export function setAllRays(color: number) {
        getBoard().setAllRays(color);
    }
    
    /**
     * Set all Petals to the same color
     */
    //% blockId=parol_setAllPetals block="set all Petals to %color"
    //% color.shadow="colorNumberPicker"
    //% weight=66
    export function setAllPetals(color: number) {
        getBoard().setAllPetals(color);
    }
    
    /**
     * Set all pixels to same color
     */
    //% blockId=parol_setAll block="set all %color"
    //% color.shadow="colorNumberPicker"
    //% weight=65
    export function setAll(color: number) {
        getBoard().setAll(color);
    }
    
    /**
     * Initialize the motion sensor - call this once at the start
     */
    //% blockId=parol_initMotionSensor block="initialize motion sensor"
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
    //% blockId=parol_isMotionDetected block="motion detected"
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
     * Set color of pixel at index (0-23)
     */
    //% blockId=parol_setPixelColor block="set pixel color at %index to %color"
    //% index.min=0 index.max=23
    //% color.shadow="colorNumberPicker"
    //% weight=58
    export function setPixelColor(index: number, color: number) {
        getBoard().setPixelColor(index, color);
    }
    
    /**
     * Get the Parol board
     */
    //% blockId=parol_strip block="parol board"
    //% weight=57
    export function strip(): ParolBoard {
        return getBoard();
    }
}

class ParolBoard {
    private stripD9: light.NeoPixelStrip;
    private stripD7: light.NeoPixelStrip;
    private useVirtualStrip: boolean;
    
    constructor() {
        // Detect if we're running in simulator or on hardware
        this.useVirtualStrip = (control.deviceDalVersion() === "sim");
        
        if (this.useVirtualStrip) {
            // Simulator: single virtual 24-LED strip for visualization
            this.stripD9 = light.createStrip(pins.D9, 24);
            this.stripD7 = null; // Not used in simulator mode
        } else {
            // Hardware: two separate physical strips
            // D9: 14 LEDs, D7: 10 LEDs (total 24)
            this.stripD9 = light.createStrip(pins.D9, 14);
            this.stripD7 = light.createStrip(pins.D7, 10);
        }
    }
    
    /**
     * Set color of pixel at index (0-23) - INTERNAL USE ONLY
     * Virtual indices: 0-13 = D9, 14-23 = D7
     */
    setPixelColor(index: number, color: number) {
        if (this.useVirtualStrip) {
            // Simulator: single virtual strip
            this.stripD9.setPixelColor(index, color);
        } else {
            // Hardware: route to correct physical strip
            if (index < 14) {
                // D9 strip (indices 0-13)
                this.stripD9.setPixelColor(index, color);
            } else if (index < 24) {
                // D7 strip (indices 14-23 → D7 indices 0-9)
                this.stripD7.setPixelColor(index - 14, color);
            }
        }
        this.show();
    }
    
    /**
     * Set color of an Outer Ring light (1-10) - INTERNAL USE ONLY
     * Outer Ring mapping: D9 indices [0,1,2,3,4,5,8,9,12,13]
     * Logical 1-10 maps to physical indices in order
     */
    setOuterRing(ringNumber: number, color: number) {
        if (ringNumber < 1 || ringNumber > 10) return; // Validate input
        
        // Outer Ring physical indices on D9: [0,1,2,3,4,5,8,9,12,13]
        const outerRingIndices = [0, 1, 2, 3, 4, 5, 8, 9, 12, 13];
        const physicalIndex = outerRingIndices[ringNumber - 1];
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set color of a Left Tassel light (1-2) - INTERNAL USE ONLY
     * Left Tassel mapping: D9 indices [6,7]
     */
    setLeftTassel(tasselNumber: number, color: number) {
        if (tasselNumber < 1 || tasselNumber > 2) return; // Validate input
        
        // Left Tassel physical indices on D9: [6,7]
        const leftTasselIndices = [6, 7];
        const physicalIndex = leftTasselIndices[tasselNumber - 1];
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set color of a Right Tassel light (1-2) - INTERNAL USE ONLY
     * Right Tassel mapping: D9 indices [10,11]
     */
    setRightTassel(tasselNumber: number, color: number) {
        if (tasselNumber < 1 || tasselNumber > 2) return; // Validate input
        
        // Right Tassel physical indices on D9: [10,11]
        const rightTasselIndices = [10, 11];
        const physicalIndex = rightTasselIndices[tasselNumber - 1];
        this.setPixelColor(physicalIndex, color);
    }
    
    /**
     * Set color of a Ray (1-5) - INTERNAL USE ONLY
     * Rays mapping: D7 indices [0,1,2,3,4] → virtual indices [14,15,16,17,18]
     */
    setRay(rayNumber: number, color: number) {
        if (rayNumber < 1 || rayNumber > 5) return; // Validate input
        
        // Rays physical indices on D7: [0,1,2,3,4] → virtual indices [14,15,16,17,18]
        const rayD7Indices = [0, 1, 2, 3, 4];
        const d7Index = rayD7Indices[rayNumber - 1];
        const virtualIndex = 14 + d7Index; // D7 starts at virtual index 14
        this.setPixelColor(virtualIndex, color);
    }
    
    /**
     * Set color of a Petal (1-5) - INTERNAL USE ONLY
     * Petals mapping: D7 indices [5,6,7,8,9] → virtual indices [19,20,21,22,23]
     */
    setPetal(petalNumber: number, color: number) {
        if (petalNumber < 1 || petalNumber > 5) return; // Validate input
        
        // Petals physical indices on D7: [5,6,7,8,9] → virtual indices [19,20,21,22,23]
        const petalD7Indices = [5, 6, 7, 8, 9];
        const d7Index = petalD7Indices[petalNumber - 1];
        const virtualIndex = 14 + d7Index; // D7 starts at virtual index 14
        this.setPixelColor(virtualIndex, color);
    }
    
    /**
     * Set all Outer Ring lights to the same color - INTERNAL USE ONLY
     */
    setAllOuterRing(color: number) {
        for (let i = 1; i <= 10; i++) {
            this.setOuterRing(i, color);
        }
    }
    
    /**
     * Set all Left Tassel lights to the same color - INTERNAL USE ONLY
     */
    setAllLeftTassel(color: number) {
        for (let i = 1; i <= 2; i++) {
            this.setLeftTassel(i, color);
        }
    }
    
    /**
     * Set all Right Tassel lights to the same color - INTERNAL USE ONLY
     */
    setAllRightTassel(color: number) {
        for (let i = 1; i <= 2; i++) {
            this.setRightTassel(i, color);
        }
    }
    
    /**
     * Set all Rays to the same color - INTERNAL USE ONLY
     */
    setAllRays(color: number) {
        for (let i = 1; i <= 5; i++) {
            this.setRay(i, color);
        }
    }
    
    /**
     * Set all Petals to the same color - INTERNAL USE ONLY
     */
    setAllPetals(color: number) {
        for (let i = 1; i <= 5; i++) {
            this.setPetal(i, color);
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
