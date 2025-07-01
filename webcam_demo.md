---
layout: page
title: "Webcam Demo"
subtitle: "How I Did My CVPR Poster Session Live Demo"
robots: noindex, nofolow # Make the page NOT indexed by Google and similar
---

<div style="text-align: justify;">
Several people asked how I set up the live webcam demo for my CVPR poster.
It's not complicated, so I’m sharing my process here in case others want to try something similar.
This guide is especially relevant for people from VRG, as they can use the same compute setup, but it should be helpful more broadly too.
</div>
<br>

<div style="background-color:#333333; color:#ffffff; padding:1em; border-left:4px solid #555; margin-bottom:1.5em;">
  <h3>TL; DR</h3>
  <p style="margin-top:0.5em;text-align: justify;">
    Run your demo on a powerful GPU server using Gradio.
    Use its public share feature to get a temporary URL and connect a mobile device via the internet.
    The mobile device captures webcam input, and the server handles the computation.
    Run the code in two threads to keep it responsive. For an example demo (<a href="https://MiraPurkrabek.github.io/ProbPose">ProbPose</a>), check the links at the bottom.
  </p>
</div>

### What is the result and why should I care?

<div style="text-align: justify;">
The goal is to run a live webcam demo on a portable device that can be mounted on a poster.
At CVPR 2025, I used my iPad, attached it to the poster, and let the demo run for over two hours. Here’s what it looked like:
</div>

<div style="text-align:center; margin:2em 0;">
  <video controls autoplay loop muted style="max-width:100%; height:auto;">
    <source src="/assets/videos/webcam_demo.mp4" type="video/mp4">
    Your browser doesn’t support HTML5 video.
  </video>
</div>

<div style="text-align: justify;">
Why does this matter?
You’ve done the work, your paper got accepted — now you want to show it clearly.
At big conferences like CVPR or ECCV, there are ~2 hours for ~500 posters.
That’s ~14 seconds per poster if someone tried to visit them all.
A live, interactive demo helps you stand out and communicate your work more effectively — especially for people (like me) who prefer visuals over dense text.
</div>

<div style="text-align: justify;">
If this sounds appealing, below I describe what setup I used, what didn’t work, and what alternatives I considered.
It’s not the “best way,” just what worked for me — and hopefully a useful reference for anyone planning their own demo.
</div>

----------------------------------------------------------

### Setup Options

<div style="text-align: justify;">
Here’s a quick overview of the constraints I considered and the different setup options I tried or rejected.
I describe each one briefly along with its pros, cons, and why I did or didn’t use it.
</div>

#### Constraints

1. The demo must display on a mobile device. That’s what makes it portable and easy to attach to a poster. If you have a table and power nearby, just use a laptop instead.
2. The computation should run on a GPU. Most models are too slow for mobile devices, so offload the heavy lifting to a more powerful machine.
3. Keep data transfer simple. Wi-Fi at conferences is often overloaded. Ideally, use local network or a stable connection.

#### 1. Run demo on a laptop, connect via local network

<div style="text-align: justify;">
This is the most straightforward option: run the demo on a nearby laptop and connect your phone or tablet to it via a local Wi-Fi network.
This assumes your laptop is powerful enough for real-time inference.
</div>

<div style="text-align: justify;">
The <a href="https://MiraPurkrabek.github.io/ProbPose">ProbPose demo</a> was initially built this way.
I dropped it because my laptop wasn't fast enough and the battery wouldn't last more than an hour.
</div>

#### 2. Run demo on a server, connect via Internet

<div style="text-align: justify;">
This is what I used at CVPR.
The model runs on a remote server with internet access.
Gradio provides a public URL, which the tablet connects to.
It worked well but depends on having a decent internet connection.
</div>

#### 3. Host demo on HuggingFace, connect via Internet

<div style="text-align: justify;">
You can host your demo in a Hugging Face Space and connect from any device.
It’s simple, but GPU usage can get expensive, and public demos may be accessed by others during your session.
Alternatives like ZeroGPU could help with cost, but I found their documentation lacking and GPU allocation tricky.
</div>

#### 4. Host interface on HuggingFace, compute on own server

<div style="text-align: justify;">
Hugging Face lets you create Spaces hosted on your own hardware.
I didn’t try this, but it could be a good compromise between options (2) and (3).
</div>


----------------------------------------------------------------------

### Step-by-step Guide

<div style="text-align: justify;">
Here’s how to reproduce the demo setup I used at CVPR.
</div>

#### (1) Run the backend on your server

<div style="text-align: justify;">
Start with your per-frame demo and integrate it into <a href="https://github.com/MiraPurkrabek/ProbPose_code/blob/2ac83566b2bcd579c1c4e86198156b6e991b3d72/webcam_remote_demo.py">this Gradio script</a>.
It runs as a multi-threaded app: one thread keeps the latest frame, the other does the inference.
This keeps things responsive over long sessions.
Gradio uses a WebRTC stream to send webcam frames in real time.
</div>

<div style="text-align: justify;">
If set up correctly, you’ll see local and public URLs in the terminal.
Use the public URL to access the demo from any internet-connected device.
</div>

```

* Running on local URL: http://127.0.0.1:7860
* Running on public URL: https://bed703ee0670aa48ce.gradio.live

This share link expires in 1 week. For free permanent hosting and GPU upgrades, run `gradio deploy` from terminal in the working directory to deploy to Hugging Face Spaces (https://huggingface.co/spaces)

```

#### (2) Enable ICE Servers

<div style="text-align: justify;">
Some devices (e.g. iPads) won’t activate their webcams unless connection settings are correct.
Gradio loads ICE server credentials at startup.
You can get your own (e.g. from Twilio.com, free).
This makes the demo work across all platforms, including iOS.
</div>

> Note: iOS blocks webcam streaming over unsecured HTTP, so you can’t debug locally on iOS — only on desktop.

#### Internet Connection

<div style="text-align: justify;">
Conference Wi-Fi is unreliable.
At CVPR, I used a mobile hotspot (thanks to <a href="https://jskvrna.github.io">Jan Skvrna</a>) for the first hour, then switched to public Wi-Fi once it got less crowded.
</div>

<div style="text-align: justify;">
In tests, the demo used about 30 MB of data per minute.
At CVPR, I used ~1.3 GB in the first hour before switching to Wi-Fi.
The two-thread setup helps: if the connection is slow, the frame rate drops but the interaction stays smooth.
</div>

#### Mounting the tablet to the poster board

You have a few options:
1. If the board is magnetic, use a magnetic flip cover. It sticks securely and works great.
2. If not, do what I did: use plenty of pins to hold the tablet in place. You can see this in the video above (~3 seconds in).
3. Or if you prefer a cleaner setup, buy a [tablet mount](https://www.amazon.com/Tablet-Mounts/b?ie=UTF8&node=11548967011) and attach it to the poster board.

----------------------------------------------------------

### Links

- GitHub repository with my demo code — [ProbPose — branch 'feature_add-gradio-webcam-demo'](https://github.com/MiraPurkrabek/ProbPose_code/tree/feature_add-gradio-webcam-demo)

- [Guide on ICE servers and Twilio](https://www.twilio.com/docs/stun-turn)

