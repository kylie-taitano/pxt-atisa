# Motion Sensor Music Parol

## Introduction @unplugged

Let's make your Philippine Parol interactive! In this tutorial, you'll learn how to use the motion sensor to turn your parol's lights and music on and off. Touch the sensor to start the show, and touch it again to stop it!

![A Philippine Parol lantern](/pxt-atisa/static/projects/parol/gallery.png)

```package
philippine-parol-lantern
```

```config
feature=uf2
feature=light
feature=music
```

## Step 1 @fullscreen

You'll see a ``||loops:onStart||`` block in your workspace. This block runs your code once when the program starts.

Inside the ``||loops:onStart||`` block, drag ``||parol:set brightness||`` and set it to `20`. This brightness is bright enough to see, and it helps preserve the LED life so your parol will last longer.

Also drag ``||parol:initialize motion sensor||`` underneath the brightness block. This sets up the motion sensor so it's ready to detect touch!

```blocks
parol.setBrightness(20)
parol.initMotionSensor()
```

## Step 2 @fullscreen

![Making a variable](/pxt-atisa/static/projects/parol/makevariable.png)

Now we need a variable to remember if the lights are on or off. Click on "Variables" in the toolbox, then click "Make a Variable". Name it "lightsOn" and click OK.

The variable will be created at the top of your code and set to `false` by default - this means the lights start off!

```blocks
parol.setBrightness(20)
parol.initMotionSensor()
```

## Step 3 @fullscreen

You'll see a ``||loops:forever||`` block already on your canvas. Inside the forever block, drag an ``||logic:if then||`` block. This will check if the sensor is touched.

In the condition part of the if block, drag ``||parol:motion detected||``. This checks if the sensor was touched!

```blocks
parol.setBrightness(20)
parol.initMotionSensor()
forever(function () {
    if (parol.isMotionDetected()) {
    }
})
```

## Step 4 @fullscreen

Inside the ``||logic:if then||`` block, we need to toggle the lights! Drag an ``||logic:if then else||`` block. In the condition, drag the ``||variables:lightsOn||`` variable.

If lights are off (false), we'll turn them on. If lights are on (true), we'll turn them off!

```blocks
let lightsOn = false
parol.setBrightness(20)
parol.initMotionSensor()
forever(function () {
    if (parol.isMotionDetected()) {
        if (lightsOn) {
        } else {
        }
    }
})
```

## Step 5 @fullscreen

The ``||logic:else||`` part runs when `lightsOn` is `false` - the lights are off. Think of it like opposites: when the lights are off, we do the opposite and turn them on! So in the ``||logic:else||`` part, we turn the lights on. Drag ``||parol:set all to color||`` set to gold, then ``||parol:show lights||``. This will light up your parol!

```blocks
let lightsOn = false
parol.setBrightness(20)
parol.initMotionSensor()
forever(function () {
    if (parol.isMotionDetected()) {
        if (lightsOn) {
        } else {
            parol.setAll(0xffd700)
            parol.show()
        }
    }
})
```

## Step 6 @fullscreen

Still in the ``||logic:else||`` part, let's add music! Drag ``||music:play melody||`` underneath the "show lights" block. Click on the melody to open the melody editor, then click on the notes to create a simple melody. Start with a few notes - you can add up to 8 notes in the melody editor!

After the music block, we need to remember that the lights are now on! Drag the ``||variables:lightsOn||`` variable and set it to `true`. This tells our program that the lights are now turned on, so next time we touch the sensor, it will know to turn them off!

```blocks
let lightsOn = false
parol.setBrightness(20)
parol.initMotionSensor()
forever(function () {
    if (parol.isMotionDetected()) {
        if (lightsOn) {
        } else {
            parol.setAll(0xffd700)
            parol.show()
            music.playMelody("C D E F G A B C5 ", 120)
            lightsOn = true
        }
    }
})
```

## Step 7 @fullscreen

In the ``||logic:if||`` part (when lights are on), let's turn them off! Drag ``||parol:set all to color||`` set to black, then ``||parol:show lights||``.

After the "show lights" block, we need to remember that the lights are now off! Drag the ``||variables:lightsOn||`` variable and set it to `false`. This tells our program that the lights are now turned off, so next time we touch the sensor, it will know to turn them on!

```blocks
let lightsOn = false
parol.setBrightness(20)
parol.initMotionSensor()
forever(function () {
    if (parol.isMotionDetected()) {
        if (lightsOn) {
            parol.setAll(0x000000)
            parol.show()
            lightsOn = false
        } else {
            parol.setAll(0xffd700)
            parol.show()
            music.playMelody("C D E F G A B C5 ", 120)
            lightsOn = true
        }
    }
})
```

## Step 8 @fullscreen

![Motion sensor button](/pxt-atisa/static/projects/parol/motionsensorbutton.png)

Perfect! Now your parol will light up and play music when you touch the motion sensor. The motion sensor works like a button - first touch turns everything on, second touch turns it off, and so on!

Look at the simulator! Try clicking the motion sensor button (D2) to see your parol light up and play music. Click it again to turn everything off!

## Step 9 @fullscreen

![Connecting your parol board](/pxt-atisa/static/projects/parol/connect-device.gif)

Plug in your board, click the three dots (⋯) next to Download, then "Connect Device". Select "ItsyBitsy M0 Express" and click Connect. When you see the USB icon, click Download!

