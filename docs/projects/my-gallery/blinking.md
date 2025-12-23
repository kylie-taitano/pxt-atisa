<!-- replace: need to add a new folder for new gallery and new file for new tutorial -->
# Blinking LED

You can have multiple forever loops running concurrently to blink multiple LEDs.

```template
forever(function() {
    pins.D0.digitalWrite(false)
    pause(100)
    pins.D0.digitalWrite(true)
    pause(100)    
})
forever(function() {
    pins.D1.digitalWrite(false)
    pause(500)
    pins.D1.digitalWrite(true)
    pause(500)    
})
```

```package
adafruit-trinket-m0
```

```config
feature=uf2
feature=pind0
feature=pind1
```