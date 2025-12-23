# Play Music with Your Ornament

## Introduction @unplugged

Let's add music to your Christmas Ornament! In this tutorial, you'll learn how to make your ornament play a beautiful melody and light up with colors!

![A Christmas Ornament lantern](/pxt-atisa/static/projects/ornament/gallery.png)

```package
christmas-ornament-lantern
```

```config
feature=uf2
feature=light
feature=music
```

## Step 1 @fullscreen

You'll see an ``||loops:onStart||`` block in your workspace. This block runs your code once when the program starts.

Inside the ``||loops:onStart||`` block, drag ``||ornament:set brightness||`` and set it to `20`. This brightness is bright enough to see, and it helps preserve the LED life so your ornament will last longer.

```blocks
ornament.setBrightness(20)
```

## Step 2 @fullscreen

Now let's light up your ornament! Still inside the ``||loops:onStart||`` block, drag ``||ornament:set all to color||`` underneath the brightness block. Set it to gold to give your ornament a beautiful warm glow!

```blocks
ornament.setBrightness(20)
ornament.setAll(0xffd700)
```

## Step 3 @fullscreen

Perfect! Now we need to tell the lights to actually turn on. Drag ``||ornament:show lights||`` underneath the "set all" block. This updates the LEDs so you can see the lights!

```blocks
ornament.setBrightness(20)
ornament.setAll(0xffd700)
ornament.show()
```

## Step 4 @fullscreen

Now let's add music! Still inside the ``||loops:onStart||`` block, drag ``||music:play melody||`` underneath the "show lights" block. 

Click on the melody to open the melody editor, then click on the notes to create a simple melody. Start with a few notes - you can add up to 8 notes in the melody editor!

```blocks
ornament.setBrightness(20)
ornament.setAll(0xffd700)
ornament.show()
music.playMelody("C D E F G A B C5 ", 120)
```

## Step 5 @fullscreen

Look at the simulator! Can you see your ornament lighting up in gold? Can you hear the music playing? The lights should turn on and then the melody should play!

## Step 6 @fullscreen

![Melody Gallery tab](/pxt-atisa/static/projects/music/melodygallery.png)

Want to try a different melody? You can choose from preset melodies! Click on the "Gallery" tab in the melody editor and choose from any in the list. (Click the 💡 lightbulb icon if you need help finding it!)

## Step 7 @fullscreen

![Connecting your ornament board](/pxt-atisa/static/projects/ornament/connect-device.gif)

Plug in your board, click the three dots (⋯) next to Download, then "Connect Device". Select "ItsyBitsy M0 Express" and click Connect. When you see the USB icon, click Download!

