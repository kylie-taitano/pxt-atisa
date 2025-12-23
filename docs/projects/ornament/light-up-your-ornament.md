# Light Up Your Ornament

## Introduction @unplugged

Let's light up your Christmas Ornament! In this tutorial, you'll learn how to make your ornament light up with beautiful colors!

![A Christmas Ornament lantern](/pxt-atisa/static/projects/ornament/gallery.png)

```package
christmas-ornament-lantern
```

```config
feature=uf2
feature=light
```

## Step 1 @fullscreen

You'll see an ``||loops:onStart||`` block in your workspace. This block runs your code once when the program starts.

Inside the ``||loops:onStart||`` block, drag ``||ornament:set brightness||`` and set it to `20`. This brightness is bright enough to see, and it helps preserve the LED life so your ornament will last longer.

```blocks
ornament.setBrightness(20)
```

## Step 2 @fullscreen

Now let's light up the outer ring! You'll see a ``||loops:forever||`` block already on your canvas. This block runs your code over and over again.

Inside the ``||loops:forever||`` block, we'll light up each Outer Ring light one at a time so you can see them light up.

Drag ``||ornament:set Outer Ring||`` for ring `1` set to gold, then drag a ``||loops:pause||`` block set to `250` milliseconds right after it. Do the same for rings `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, and `12` - each ring followed by a pause block so you can see each one light up!

```blocks
ornament.setBrightness(20)
forever(function () {
    ornament.setOuterRing(1, 0xffd700)
    pause(250)
    ornament.setOuterRing(2, 0xffd700)
    pause(250)
    ornament.setOuterRing(3, 0xffd700)
    pause(250)
    ornament.setOuterRing(4, 0xffd700)
    pause(250)
    ornament.setOuterRing(5, 0xffd700)
    pause(250)
    ornament.setOuterRing(6, 0xffd700)
    pause(250)
    ornament.setOuterRing(7, 0xffd700)
    pause(250)
    ornament.setOuterRing(8, 0xffd700)
    pause(250)
    ornament.setOuterRing(9, 0xffd700)
    pause(250)
    ornament.setOuterRing(10, 0xffd700)
    pause(250)
    ornament.setOuterRing(11, 0xffd700)
    pause(250)
    ornament.setOuterRing(12, 0xffd700)
})
```

## Step 3 @fullscreen

Wow, that's a lot of blocks! We had to add 24 blocks just to light up each Outer Ring light. There's a better way to do this using a **loop**. A loop lets us repeat the same action multiple times with just a few blocks!

First, let's clean up. **Delete all the Outer Ring blocks and pause blocks from inside the forever block** - we're going to replace them with a loop!

```blocks
ornament.setBrightness(20)
forever(function () {
})
```

## Step 4 @fullscreen

Now let's replace all those blocks with a loop! **Inside the forever block**, drag a ``||loops:for element value of list||`` loop. In the "list" part, drag ``||ornament:all Outer Ring numbers||``. This gives us all the Outer Ring numbers (1-12).

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let value of ornament.allOuterRingNumbers()) {
    }
})
```

## Step 5 @fullscreen

Inside the ``||loops:for element value of list||`` loop, first drag a ``||loops:pause||`` block set to `250` milliseconds. This will create a delay so you can see each Outer Ring light light up one at a time!

Then drag ``||ornament:set Outer Ring||`` underneath the pause block.

Here's the important part: look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "ringNumber"** - this makes our code easier to understand!

A **variable** is like a labeled box that holds information. In this loop, the variable "ringNumber" holds the current number from our list. The loop goes through each number in our list one by one - first it holds 1, then 2, then 3, and so on up to 12. **Drag that "ringNumber" variable from the loop block into the ring number slot** in the ``||ornament:set Outer Ring||`` block. Set all Outer Ring lights to gold!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
})
```

## Step 6 @fullscreen

Wait - the lights aren't turning off! The Outer Ring lights keep lighting up over and over because we're using a ``||loops:forever||`` block. Let's learn how to turn the lights off after they light up, so the pattern repeats!

**Inside the forever block, at the very end (after the for element loop)**, drag ``||ornament:set all Outer Ring to color||`` and set it to black to turn all Outer Ring lights off at once!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
    ornament.setAllOuterRing(0x000000)
})
```

## Step 7 @fullscreen

Great! Now let's add the top row to light up right after the outer ring! **Still inside the same forever block, after the "set all Outer Ring to black" block**, drag another ``||loops:for element value of list||`` loop. In the "list" part, drag ``||ornament:all Top Row numbers||``. This gives us all the Top Row numbers (1-5).

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "topRowNumber"** - this makes our code easier to understand!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
    ornament.setAllOuterRing(0x000000)
    for (let topRowNumber of ornament.allTopRowNumbers()) {
    }
})
```

## Step 8 @fullscreen

Inside the ``||loops:for element value of list||`` loop for top row, first drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||ornament:set Top Row||`` and drag the "topRowNumber" variable from the loop block into the row number slot. Set all top row lights to white!

After the loop ends, drag ``||ornament:set all Top Row to color||`` and set it to black to turn all top row lights off!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
    ornament.setAllOuterRing(0x000000)
    for (let topRowNumber of ornament.allTopRowNumbers()) {
        pause(250)
        ornament.setTopRow(topRowNumber, 0xffffff)
    }
    ornament.setAllTopRow(0x000000)
})
```

## Step 9 @fullscreen

Perfect! Now let's add the middle row. **Still inside the same forever block, after the "set all Top Row to black" block**, drag another ``||loops:for element value of list||`` loop. In the "list" part, drag ``||ornament:all Middle Row numbers||``. This gives us all the Middle Row numbers (1-4).

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "middleRowNumber"** - this makes our code easier to understand!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
    ornament.setAllOuterRing(0x000000)
    for (let topRowNumber of ornament.allTopRowNumbers()) {
        pause(250)
        ornament.setTopRow(topRowNumber, 0xffffff)
    }
    ornament.setAllTopRow(0x000000)
    for (let middleRowNumber of ornament.allMiddleRowNumbers()) {
    }
})
```

## Step 10 @fullscreen

Inside the ``||loops:for element value of list||`` loop for middle row, first drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||ornament:set Middle Row||`` and drag the "middleRowNumber" variable from the loop block into the row number slot. Set all middle row lights to red!

After the loop ends, drag ``||ornament:set all Middle Row to color||`` and set it to black to turn all middle row lights off!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
    ornament.setAllOuterRing(0x000000)
    for (let topRowNumber of ornament.allTopRowNumbers()) {
        pause(250)
        ornament.setTopRow(topRowNumber, 0xffffff)
    }
    ornament.setAllTopRow(0x000000)
    for (let middleRowNumber of ornament.allMiddleRowNumbers()) {
        pause(250)
        ornament.setMiddleRow(middleRowNumber, 0xff0000)
    }
    ornament.setAllMiddleRow(0x000000)
})
```

## Step 11 @fullscreen

Now let's add the bottom row! **Still inside the same forever block, after the "set all Middle Row to black" block**, drag another ``||loops:for element value of list||`` loop. In the "list" part, drag ``||ornament:all Bottom Row numbers||``. This gives us all the Bottom Row numbers (1-5).

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "bottomRowNumber"** - this makes our code easier to understand!

Inside the loop, drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||ornament:set Bottom Row||`` and drag the "bottomRowNumber" variable into the row number slot. Set the bottom row to green!

After the loop ends, drag ``||ornament:set all Bottom Row to color||`` and set it to black to turn all bottom row lights off!

```blocks
ornament.setBrightness(20)
forever(function () {
    for (let ringNumber of ornament.allOuterRingNumbers()) {
        pause(250)
        ornament.setOuterRing(ringNumber, 0xffd700)
    }
    ornament.setAllOuterRing(0x000000)
    for (let topRowNumber of ornament.allTopRowNumbers()) {
        pause(250)
        ornament.setTopRow(topRowNumber, 0xffffff)
    }
    ornament.setAllTopRow(0x000000)
    for (let middleRowNumber of ornament.allMiddleRowNumbers()) {
        pause(250)
        ornament.setMiddleRow(middleRowNumber, 0xff0000)
    }
    ornament.setAllMiddleRow(0x000000)
    for (let bottomRowNumber of ornament.allBottomRowNumbers()) {
        pause(250)
        ornament.setBottomRow(bottomRowNumber, 0x00ff00)
    }
    ornament.setAllBottomRow(0x000000)
})
```

## Step 12 @fullscreen

Look at the simulator! Can you see your ornament lighting up? The outer ring should light up in gold, then the top row in white, then the middle row in red, and finally the bottom row in green - all in sequence!

## Step 13 @fullscreen

![Connecting your ornament board](/pxt-atisa/static/projects/ornament/connect-device.gif)

Plug in your board, click the three dots (⋯) next to Download, then "Connect Device". Select "ItsyBitsy M0 Express" and click Connect. When you see the USB icon, click Download!

