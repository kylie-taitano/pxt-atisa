# Light Up Your Parol

## Introduction @unplugged

Let's light up your Philippine Parol! A parol is a traditional Filipino Christmas lantern shaped like a star. It has beautiful lights arranged in an outer ring, rays, petals, and tassels.

In this tutorial, you'll learn how to make your parol light up with beautiful colors!

![A Philippine Parol lantern](/pxt-atisa/static/projects/parol/gallery.png)

```package
philippine-parol-lantern
```

```config
feature=uf2
feature=light
```

## Step 1 @fullscreen

You'll see an ``||loops:onStart||`` block in your workspace. This block runs your code once when the program starts.

Inside the ``||loops:onStart||`` block, drag ``||parol:set brightness||`` and set it to `20`. This brightness is bright enough to see, and it helps preserve the LED life so your parol will last longer.

```blocks
parol.setBrightness(20)
```

## Step 2 @fullscreen

Now let's light up the outer ring! You'll see a ``||loops:forever||`` block already on your canvas. This block runs your code over and over again.

Inside the ``||loops:forever||`` block, we'll light up each Outer Ring light one at a time so you can see them light up.

Drag ``||parol:set Outer Ring||`` for ring `1` set to gold, then drag a ``||loops:pause||`` block set to `250` milliseconds right after it. Do the same for rings `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, and `10` - each ring followed by a pause block so you can see each one light up!

```blocks
parol.setBrightness(20)
forever(function () {
    parol.setOuterRing(1, 0xffd700)
    pause(250)
    parol.setOuterRing(2, 0xffd700)
    pause(250)
    parol.setOuterRing(3, 0xffd700)
    pause(250)
    parol.setOuterRing(4, 0xffd700)
    pause(250)
    parol.setOuterRing(5, 0xffd700)
    pause(250)
    parol.setOuterRing(6, 0xffd700)
    pause(250)
    parol.setOuterRing(7, 0xffd700)
    pause(250)
    parol.setOuterRing(8, 0xffd700)
    pause(250)
    parol.setOuterRing(9, 0xffd700)
    pause(250)
    parol.setOuterRing(10, 0xffd700)
})
```

## Step 3 @fullscreen

Wow, that's a lot of blocks! We had to add 20 blocks just to light up each Outer Ring light. There's a better way to do this using a **loop**. A loop lets us repeat the same action multiple times with just a few blocks!

First, let's clean up. **Delete all the Outer Ring blocks and pause blocks from inside the forever block** - we're going to replace them with a loop!

```blocks
parol.setBrightness(20)
forever(function () {
})
```

## Step 4 @fullscreen

Now let's replace all those blocks with a loop! **Inside the forever block**, drag a ``||loops:for element value of list||`` loop. In the "list" part, drag ``||parol:all Outer Ring numbers||``. This gives us all the Outer Ring numbers (1-10).

```blocks
parol.setBrightness(20)
forever(function () {
    for (let value of parol.allOuterRingNumbers()) {
    }
})
```

## Step 5 @fullscreen

Inside the ``||loops:for element value of list||`` loop, first drag a ``||loops:pause||`` block set to `250` milliseconds. This will create a delay so you can see each Outer Ring light light up one at a time!

Then drag ``||parol:set Outer Ring||`` underneath the pause block.

Here's the important part: look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "ringNumber"** - this makes our code easier to understand!

A **variable** is like a labeled box that holds information. In this loop, the variable "ringNumber" holds the current number from our list. The loop goes through each number in our list one by one - first it holds 1, then 2, then 3, and so on up to 10. **Drag that "ringNumber" variable from the loop block into the ring number slot** in the ``||parol:set Outer Ring||`` block. Set all Outer Ring lights to gold!

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
})
```

## Step 6 @fullscreen

Wait - the lights aren't turning off! The Outer Ring lights keep lighting up over and over because we're using a ``||loops:forever||`` block. Let's learn how to turn the lights off after they light up, so the pattern repeats!

**Inside the forever block, at the very end (after the for element loop)**, drag ``||parol:set all Outer Ring to color||`` and set it to black to turn all Outer Ring lights off at once!

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
    parol.setAllOuterRing(0x000000)
})
```

## Step 7 @fullscreen

Great! Now let's add the rays to light up right after the outer ring! **Still inside the same forever block, after the "set all Outer Ring to black" block**, drag another ``||loops:for element value of list||`` loop. In the "list" part, drag ``||parol:all Ray numbers||``. This gives us all the Ray numbers (1-5).

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "rayNumber"** - this makes our code easier to understand!

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
    parol.setAllOuterRing(0x000000)
    for (let rayNumber of parol.allRayNumbers()) {
    }
})
```

## Step 8 @fullscreen

Inside the ``||loops:for element value of list||`` loop for rays, first drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||parol:set Ray||`` and drag the "rayNumber" variable from the loop block into the ray number slot. Set all rays to white!

After the loop ends, drag ``||parol:set all Rays to color||`` and set it to black to turn all rays off!

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
    parol.setAllOuterRing(0x000000)
    for (let rayNumber of parol.allRayNumbers()) {
        pause(250)
        parol.setRay(rayNumber, 0xffffff)
    }
    parol.setAllRays(0x000000)
})
```

## Step 9 @fullscreen

Perfect! Now let's add the petals. **Still inside the same forever block, after the "set all Rays to black" block**, drag another ``||loops:for element value of list||`` loop. In the "list" part, drag ``||parol:all Petal numbers||``. This gives us all the Petal numbers (1-5).

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "petalNumber"** - this makes our code easier to understand!

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
    parol.setAllOuterRing(0x000000)
    for (let rayNumber of parol.allRayNumbers()) {
        pause(250)
        parol.setRay(rayNumber, 0xffffff)
    }
    parol.setAllRays(0x000000)
    for (let petalNumber of parol.allPetalNumbers()) {
    }
})
```

## Step 10 @fullscreen

Inside the ``||loops:for element value of list||`` loop for petals, first drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||parol:set Petal||`` and drag the "petalNumber" variable from the loop block into the petal number slot. Set all petals to red!

After the loop ends, drag ``||parol:set all Petals to color||`` and set it to black to turn all petals off!

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
    parol.setAllOuterRing(0x000000)
    for (let rayNumber of parol.allRayNumbers()) {
        pause(250)
        parol.setRay(rayNumber, 0xffffff)
    }
    parol.setAllRays(0x000000)
    for (let petalNumber of parol.allPetalNumbers()) {
        pause(250)
        parol.setPetal(petalNumber, 0xff0000)
    }
    parol.setAllPetals(0x000000)
})
```

## Step 11 @fullscreen

Now let's add the tassels! **Still inside the same forever block, after the "set all Petals to black" block**, drag another ``||loops:for element value of list||`` loop. In the "list" part, drag ``||parol:all Left Tassel numbers||``. 

Look at the loop block - you'll see a variable called "value". **Click on "value" and rename it to "tasselNumber"**.

Inside the loop, drag a ``||loops:pause||`` block set to `250` milliseconds, then drag ``||parol:set Left Tassel||`` and drag the "tasselNumber" variable into the tassel number slot. Set the left tassel to green!

After this loop, drag ``||parol:set all Left Tassel to color||`` and set it to black.

Now do the same for the right tassel - add another loop with ``||parol:all Right Tassel numbers||``, rename the variable to "tasselNumber", add pause and ``||parol:set Right Tassel||`` blocks, then turn all right tassel off.

```blocks
parol.setBrightness(20)
forever(function () {
    for (let ringNumber of parol.allOuterRingNumbers()) {
        pause(250)
        parol.setOuterRing(ringNumber, 0xffd700)
    }
    parol.setAllOuterRing(0x000000)
    for (let rayNumber of parol.allRayNumbers()) {
        pause(250)
        parol.setRay(rayNumber, 0xffffff)
    }
    parol.setAllRays(0x000000)
    for (let petalNumber of parol.allPetalNumbers()) {
        pause(250)
        parol.setPetal(petalNumber, 0xff0000)
    }
    parol.setAllPetals(0x000000)
    for (let tasselNumber of parol.allLeftTasselNumbers()) {
        pause(250)
        parol.setLeftTassel(tasselNumber, 0x00ff00)
    }
    parol.setAllLeftTassel(0x000000)
    for (let tasselNumber of parol.allRightTasselNumbers()) {
        pause(250)
        parol.setRightTassel(tasselNumber, 0x00ff00)
    }
    parol.setAllRightTassel(0x000000)
})
```

## Step 12 @fullscreen

Look at the simulator! Can you see your parol lighting up? The outer ring should light up in gold, then the rays in white, then the petals in red, and finally the tassels in green - all in sequence!

## Step 13 @fullscreen

![Connecting your parol board](/pxt-atisa/static/projects/parol/connect-device.gif)

Plug in your board, click the three dots (⋯) next to Download, then "Connect Device". Select "ItsyBitsy M0 Express" and click Connect. When you see the USB icon, click Download!

