# Light Up Your Menorah

## Introduction @unplugged

Let's light up your menorah! A menorah is a special candle holder used during Chanukah. It has 9 candles - 8 regular candles and 1 special helper candle called the shammash.

In this tutorial, you'll learn how to make the menorah light up with beautiful colors!

![A menorah with lights](/pxt-atisa/static/projects/digital-io/blinky/gallery.png)

```package
chanukah-menorah-lantern
```

```config
feature=uf2
feature=light
```

## Step 1 @fullscreen

You'll see an ``||loops:onStart||`` block in your workspace. This block runs your code once when the program starts.

Inside the ``||loops:onStart||`` block, drag ``||menorah:set brightness||`` and set it to `20`. This brightness is bright enough to see, and it helps preserve the LED life so your menorah will last longer.

```blocks
menorah.setBrightness(20)
```

## Step 2 @fullscreen

Now let's light up all the flames! You'll see a ``||loops:forever||`` block already on your canvas. This block runs your code over and over again.

Inside the ``||loops:forever||`` block, we'll light up the flames one at a time so you can see them light up.

Start with the shammash (flame number 5). Drag ``||menorah:set Menorah flame||`` and set flame `5` to gold. Then drag a ``||loops:pause||`` block set to `250` milliseconds right after it. 

Now drag the rest of the flames one by one: drag ``||menorah:set Menorah flame||`` for flame `1` set to gold, then drag a ``||loops:pause||`` block. Do the same for flames `2`, `3`, `4`, `6`, `7`, `8`, and `9` - each flame followed by a pause block so you can see each one light up!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    pause(250)
    menorah.setFlame(1, 0xffcc00)
    pause(250)
    menorah.setFlame(2, 0xffcc00)
    pause(250)
    menorah.setFlame(3, 0xffcc00)
    pause(250)
    menorah.setFlame(4, 0xffcc00)
    pause(250)
    menorah.setFlame(6, 0xffcc00)
    pause(250)
    menorah.setFlame(7, 0xffcc00)
    pause(250)
    menorah.setFlame(8, 0xffcc00)
    pause(250)
    menorah.setFlame(9, 0xffcc00)
})
```

## Step 3 @fullscreen

Wow, that's a lot of blocks! We had to add 18 blocks just to light up each flame. There's a better way to do this using a **loop**. A loop lets us repeat the same action multiple times with just a few blocks!

First, let's clean up. **Keep the shammash block (flame 5), but delete all the other flame blocks and pause blocks from inside the forever block** - we're going to replace them with a loop!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
})
```

## Step 4 @fullscreen

Now let's replace all those flame blocks with a loop! **Inside the forever block, after the shammash block**, drag a ``||loops:for element value of list||`` loop. In the "list" part, drag ``||menorah:flame numbers except shammash||``. This gives us all the flame numbers (1-4 and 6-9) except the shammash.

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
    }
})
```

## Step 5 @fullscreen

Inside the ``||loops:for element value of list||`` loop, first drag a ``||loops:pause||`` block set to `250` milliseconds. This will create a delay so you can see each flame light up one at a time!

Then drag ``||menorah:set Menorah flame||`` underneath the pause block. 

Here's the important part: look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "flameNumber"** - this makes our code easier to understand!

A **variable** is like a labeled box that holds information. In this loop, the variable "flameNumber" holds the current number from our list. The loop goes through each number in our list one by one - first it holds 1, then 2, then 3, then 4, then 6, and so on. **Drag that "flameNumber" variable from the loop block into the flame number slot** in the ``||menorah:set Menorah flame||`` block. Set all flames to gold!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
        pause(250)
        menorah.setFlame(flameNumber, 0xffcc00)
    }
})
```

## Step 6 @fullscreen

Wait - the lights aren't turning off! The flames keep lighting up over and over because we're using a ``||loops:forever||`` block. Let's learn how to turn the lights off after they light up, so the pattern repeats!

**Inside the forever block, at the very end (after the for element loop)**, drag ``||menorah:set all Menorah flames to color||`` and set it to black to turn all flames off at once!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
        pause(250)
        menorah.setFlame(flameNumber, 0xffcc00)
    }
    menorah.setAllFlames(0x000000)
})
```

## Step 7 @fullscreen

Great! Now let's light up the candles using a loop too. Drag a second ``||loops:forever||`` block onto the canvas - you can have multiple forever blocks, and they'll all run at the same time!

**Inside this new forever block**, first light the shammash separately. Drag ``||menorah:set Menorah candle||`` and set candle `5` to gold.

Then, **still inside this forever block**, drag a ``||loops:for element value of list||`` loop. In the "list" part, drag ``||menorah:candle numbers except shammash||``. This gives us all the candle numbers (1-4 and 6-9) except the shammash. 

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "candleNumber"** - this makes our code easier to understand!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
        pause(250)
        menorah.setFlame(flameNumber, 0xffcc00)
    }
    menorah.setAllFlames(0x000000)
})
forever(function () {
    menorah.setCandle(5, 0xffcc00)
    for (let candleNumber of menorah.candleNumbersExceptShammash()) {
    }
})
```

## Step 8 @fullscreen

Inside the ``||loops:for element value of list||`` loop, first drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||menorah:set Menorah candle||`` and drag the "candleNumber" variable from the loop block into the candle number slot. Set all these candles to white!

At the end of this forever block (after the for element loop), drag ``||menorah:set all Menorah candles to color||`` and set it to black to turn all candles off!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
        pause(250)
        menorah.setFlame(flameNumber, 0xffcc00)
    }
    menorah.setAllFlames(0x000000)
})
forever(function () {
    menorah.setCandle(5, 0xffcc00)
    for (let candleNumber of menorah.candleNumbersExceptShammash()) {
        pause(250)
        menorah.setCandle(candleNumber, 0xffffff)
    }
    menorah.setAllCandles(0x000000)
})
```

## Step 9 @fullscreen

Perfect! Now let's light up the base of the menorah. You've done this pattern twice already with flames and candles - can you figure it out?

Try creating another forever block with a loop to light up all 9 base lights. Don't forget to turn them off at the end! If you need help, click the 💡 lightbulb icon for a hint.

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
        pause(250)
        menorah.setFlame(flameNumber, 0xffcc00)
    }
    menorah.setAllFlames(0x000000)
})
forever(function () {
    menorah.setCandle(5, 0xffcc00)
    for (let candleNumber of menorah.candleNumbersExceptShammash()) {
        pause(250)
        menorah.setCandle(candleNumber, 0xffffff)
    }
    menorah.setAllCandles(0x000000)
})
forever(function () {
    for (let baseNumber of menorah.allBaseLightNumbers()) {
        pause(250)
        menorah.setMenorahBaseLight(baseNumber, 0x0000cd)
    }
    menorah.setAllMenorahBaseLights(0x000000)
})
```

## Step 10 @fullscreen

Want the lights to stay in sync? Right now, the flames, candles, and base lights might get a little out of sync because they're running at slightly different speeds. 

To fix this, **in both the flames forever block and the candles forever block**, add a ``||loops:pause||`` block set to `250` milliseconds right after the for element loop ends, but before the "set all to black" block. This gives the base lights time to catch up so all three finish at the same time!

```blocks
menorah.setBrightness(20)
forever(function () {
    menorah.setFlame(5, 0xffcc00)
    for (let flameNumber of menorah.flameNumbersExceptShammash()) {
        pause(250)
        menorah.setFlame(flameNumber, 0xffcc00)
    }
    pause(250)
    menorah.setAllFlames(0x000000)
})
forever(function () {
    menorah.setCandle(5, 0xffcc00)
    for (let candleNumber of menorah.candleNumbersExceptShammash()) {
        pause(250)
        menorah.setCandle(candleNumber, 0xffffff)
    }
    pause(250)
    menorah.setAllCandles(0x000000)
})
forever(function () {
    for (let baseNumber of menorah.allBaseLightNumbers()) {
        pause(250)
        menorah.setMenorahBaseLight(baseNumber, 0x0000cd)
    }
    menorah.setAllMenorahBaseLights(0x000000)
})
```

## Step 11 @fullscreen

Look at the simulator! Can you see the menorah lighting up? All 9 flames should be glowing gold, all 9 candles should be lit (shammash in gold, others in white), and the base should be glowing blue!

## Step 12 @fullscreen

If you have a menorah board, click the **Download** button to put your code on the board and see the real lights!

![Download button with USB icon](/pxt-atisa/static/projects/chanukah/download-button.png)

Look for the download button at the bottom of the screen (see the image above). When your board is connected, you'll see a small USB icon appear on the download button - that's how you know it's ready!

**Important:** When you connect your board, you might need to reset it. Look for the reset button on your board and press it. You'll know the board is ready when the indicator light on the board turns green. Then try downloading your code again!
