# Light Up Your Menorah

## Introduction @unplugged

Let's light up your menorah! A menorah is a special candle holder used during Chanukah. It has 9 candles - 8 regular candles and 1 special helper candle called the shammash.

In this tutorial, you'll learn how to make the menorah light up with beautiful colors!

![A menorah with lights](/pxt-atisa/static/projects/digital-io/blinky/gallery.png)

## Step 1 @fullscreen

First, we need to get the menorah strip. This is like getting the lights ready to use.

Add a ``||variables:set||`` block and change the variable name to `menorahStrip`. Then add ``||menorah:menorah strip||`` from the Menorah drawer.

```blocks
let menorahStrip = menorah.strip()
```

## Step 2 @fullscreen

Now let's make the lights bright enough to see! Add ``||menorah:set brightness||`` and set it to `110`. This makes the lights nice and bright, but not too bright.

```blocks
let menorahStrip = menorah.strip()
menorahStrip.setBrightness(110)
```

## Step 3 @fullscreen

Let's light up the shammash! The shammash is the special helper candle in the middle (candle number 5). It helps light the other candles.

Add ``||menorah:set candle||`` and set candle `5` to a gold color. Then add ``||menorah:set flame||`` and set flame `5` to gold too. Use the color picker to choose a nice gold color!

```blocks
let menorahStrip = menorah.strip()
menorahStrip.setBrightness(110)
menorahStrip.setCandle(5, 0xffcc00)
menorahStrip.setFlame(5, 0xffcc00)
```

## Step 4 @fullscreen

Now let's light the leftmost candle! This is candle number 1. Add ``||menorah:set candle||`` for candle `1` and choose a blue color. Then add ``||menorah:set flame||`` for flame `1` and make it gold.

```blocks
let menorahStrip = menorah.strip()
menorahStrip.setBrightness(110)
menorahStrip.setCandle(5, 0xffcc00)
menorahStrip.setFlame(5, 0xffcc00)
menorahStrip.setCandle(1, 0x0000ff)
menorahStrip.setFlame(1, 0xffcc00)
```

## Step 5 @fullscreen

Finally, let's light up the base of the menorah! The base has 9 lights. We'll use a loop to light them all up.

Add a ``||loops:for||`` loop that goes from `1` to `9`. Inside the loop, add ``||menorah:set menorah base light||`` and use the loop variable `i` for the base light number. Choose a blue color for the base!

```blocks
let menorahStrip = menorah.strip()
menorahStrip.setBrightness(110)
menorahStrip.setCandle(5, 0xffcc00)
menorahStrip.setFlame(5, 0xffcc00)
menorahStrip.setCandle(1, 0x0000ff)
menorahStrip.setFlame(1, 0xffcc00)
for (let i = 1; i <= 9; i++) {
    menorahStrip.setMenorahBaseLight(i, 0x0000cd)
}
```

## Step 6 @fullscreen

Look at the simulator! Can you see the menorah lighting up? The shammash should be glowing in the middle, the leftmost candle should be lit, and the base should be glowing blue.

If you have a menorah board, click ``|Download|`` to put your code on the board and see the real lights!

```config
feature=uf2
feature=light
```
