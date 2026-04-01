---
title: "Non-Circular packing without script in TouchDesigner"
description: ""
date: "2021-06-26"
thumbnail: "/images/non-circular-packing-without-script-in-touchdesigner.webp"
tags: ["TouchDesigner", "Python"]
---

You’ll be able to make something like this with just node!

[japanese version tutorial](https://qiita.com/joe0hara/items/5cc70557725351f84c17)

### Overview

This time, I implemented non-circular packing with TouchDesigner without writing any script at all.

network

![image](https://images.ctfassets.net/jucn867nka4i/42qxVCWMZvVWrDV9fMwbrm/a6d4d9f5332a27bc61755567cc223e5d/image.png)

### What is Non-Circular Packing??

It is an algorithm that fills non-circular shapes (banana in the sample) with no gaps.

Reference Links
[https://ippsketch.com/posts/non-circular-packing/](https://ippsketch.com/posts/non-circular-packing/)

#### Why non-circular shape??

Often in generative art, there is a lot of circle packing to create a picture.

Circle packing is the process of laying out circles in a specific area without overlapping, and the algorithm is very simple and easy to understand.

like this
↓
https://twitter.com/okazz_/status/1406907219052957697?s=20&amp;t=m5iPeUwKugLiKaemhJO4Mg

However, non-circular shapes vary in shape and size, and it becomes difficult to determine overlap with simple values such as center point and radius.
The purpose of this application is to determine the overlap of non-circular shapes using only TouchDesigner operators.

This time, I will randomly change the position, rotation, and size of the input image, and determine if it overlaps with the current layer being drawn.
If not, the input image will be drawn on the drawing layer, and if it does, the random values will be changed to find a place where it can be drawn next without overlapping.

![bg](https://images.ctfassets.net/jucn867nka4i/6E6yxf77NDdQiGrNw1QBf9/5edddee721bc9f931ffc8099280c6fc5/bg.png)

### Input and resolution

![image-1](https://images.ctfassets.net/jucn867nka4i/7zFqrvlelUStHws8Lmxyx9/97a63c9379ed584372eb691689379ed8/image-1.png)

First, prepare the empty ConstantTOP and the image you want to input at the resolution of the picture you want to create.
If the input image overflows, use Over2 to adjust the size so that it fits into a square.

### Generating random values

Next, we will create the position, rotation, and size values for drawing.
First of all, the timelineCHOP retrieves the elapsed time since the program was started.

![image-2](https://images.ctfassets.net/jucn867nka4i/jK9ejz180cx1tdFTO9lvx/e747f57270d5296254f82efbddab9cc5/image-2.png)

This will be the same value as <code>absTime.seconds</code>, which is often written in expressions

Set the value to the random value Seed to create a random value that changes every frame.
Each value will be between 0 and 1.

![image-3](https://images.ctfassets.net/jucn867nka4i/c09rMz2kVHe5PPn0bMLAZ/5010173296724dfca98732b6dc048c59/image-3.png)

Then, adjust the position, rotation, and size values to the appropriate ranges.

We will use MathCHOP to adjust the values for each.
First, we will set the parameter “Scope” to control only a specific channel.

Position : -0.5 ~ 0.5 (because the unit of value in Transform’s translate is Fraction, and the top, bottom, left, and right are specified as -0.5 ~ 0.5 values)
Angle : 0~360
Size : 0.25~0.75 (set size as you like)

### Drawing candidate image

By using the generated random values in transformTOP, we can prepare an input image that is generated randomly every frame, and determine the next drawing candidate every frame.

![image-4](https://images.ctfassets.net/jucn867nka4i/3T8lk84Qfi7OOnEKiaoqhX/9436dea8a3c47520534301c4a1d9e708/image-4.png)

### Draw and update

![image-5](https://images.ctfassets.net/jucn867nka4i/5EipQV7ESItgk4Ki8ZwCVh/c3ca9df70d42d20b6ed8b9846e189509/image-5.png)

For drawing, we will use a combination of FeedbackTOP and OverTOP, which are commonly used in TouchDesigner.

The current drawing is held in FeedbackTOP, and when an image comes into switch1, it is combined in OverTOP, and the result is updated in FeedbackTOP. (Various tutorials are available on Youtube.)

![process](https://images.ctfassets.net/jucn867nka4i/5gWqk2drRbgttbtoGuevTh/55546e99db0ae2d839b29c030b64914d/process.gif)

### Overlap detection

![image-6](https://images.ctfassets.net/jucn867nka4i/hJseZUsBUWSrOvKzvUURk/dc113a7b7f18013ba11b42a423aa80c0/image-6.png)

Finally, determine if the current drawing and the next one overlap.

Using MultiplyTOP to multiply and combine feedbackTOP and transformTOP.

If there is no overlap, the result of the multiplicative composition will be all 0. If there is overlap, some pixel will have color information.

The alpha value is used to determine the overlap, and AnalyzeTOP is used to get the maximum alpha value for the entire image.

Convert the alpha value to a numeric value using toptoCHOP, and use logicCHOP to return a value of 1 to draw if there is no overlap, or 0 to not draw if there is overlap.

By giving that value to the index of switchTOP, you can switch to a transparent image if there is overlap, or a random Transform image if there is no overlap.

### Conclusion

I think this is a program that maximizes the advantages of TouchDesigner, or rather the node-based environment, by allowing you to create relatively interesting pictures with a small number of nodes.

One of the problems is that it takes a certain amount of time to fill it completely, since only one decision can be made per frame.
If you use an algorithm that decides the position and gradually increases the size as shown in the reference link, it will be filled a little faster, but this time I did not write a script, so this is how it is implemented.