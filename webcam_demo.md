---
layout: page
title: "Webcam Demo"
subtitle: "How I Did My CVPR Poster Session Live Demo"
robots: noindex, nofolow # Make the page NOT indexed by Google and similar
---


<div style="text-align: justify;">
Some people were asking me how was my CVPR live webcam demo done.
Even though it is not a rocket science, I share here how I did it such that people can make their own demos.
The how-to will be most suitable for people from VRG as they can use the same computational resources as I did but it might come handy to anyone.
</div>

<div style="background-color:#333333; color:#ffffff; padding:1em; border-left:4px solid #555; margin-bottom:1.5em;">
  <h3>TL; DR</h3>
  <p style="margin-top:0.5em;text-align: justify;">
    Run your demo on a (powerfull) server with GPU(s) using Gradio.
    Use Gradio's public sharing feature to generate a single-use website and connect the mobile device through internet.
    The mobile device is used as interface sending images to the server and the server does the heavy computations.
    Run your code in two threads to make it real-time-ish.
    For example of <a href="https://MiraPurkrabek.github.io/ProbPose">ProbPose demo</a> and its code, see links at the end.
  </p>
</div>


### What is the result and why should I care?

<div style="text-align: justify;">
The goal is to make live webcamera demo that is running on a portable device and could be integrated to the poster.
On CVPR 2025, I used my iPad, stuck it to the poster and the demo ran for more than 2 hours during the poster session.
Below you can see how did it look like.
</div>

<div style="text-align:center; margin:2em 0;">
  <video controls autoplay loop muted style="max-width:100%; height:auto;">
    <source src="/assets/videos/webcam_demo.mp4" type="video/mp4">
    Your browser doesn’t support HTML5 video.
  </video>
</div>


<div style="text-align: justify;">
And why should you care?
So great, you did a nice research, got accepted to major conference and now you can show your work to other experts in the field.
BUT!
On main CV (CVPR, ECCV, ICCV, ...) conferences, there are ~2 hours for ~500 posters.
If you would read them all, you would have 14 seconds per poster.
So you need to grab attention and interactive demo is (according to me) the best way.
Apart from that, demo is a simple and super effective way to communicate your work without exhausting the audience.
I'm not a text guy so I would rather see 500 live demos than 500 posters.
</div>

<div style="text-align: justify;">
So now you are convinced that you want to make an impressive demo on your poster.
Below I'm sharing what I did for my CVPR demo, what did not work and what options I did not explored.
It is not supposed to be "the best way" but sharing my experience such that more people would make demos. 
</div>


### "Architecture"

<div style="text-align: justify;">
First, I will briefly describe what constraints I considered and what "architectures" I came up with.
For each constraint and architecture, I'm giving you a brief description what are the pros, cons and why I did/didn't pick that one.
</div>


Constraints:
1. Display results on a mobile device. That is the main goal. Only mobile device are portable to make a fun presentation with. If you have power and table, show the demo on your laptop and be done with it.
2. Run computation on a GPU; the more powerful the better. Usually, models are too big and slow to run on a mobile device directly so the computation should run on stronger hardware to make it real-time-ish.
3. Transfer data between devices as simply as possible. WiFi at the conferences is often overloaded and is not fast/reliable enough. If possible, transfer data only locally.

<div style="text-align: justify;">
With these constraints, I came up with several possible solutions:
</div>

#### 1. Run demo on a laptop, connect through local network

<div style="text-align: justify;">
The most "in-house" solution is to have a laptop nearby and run the demo on it.
The laptop has to be powerful enough to run your model in a reasonable time.
If you can run it on a laptop, create local network with your phone and connect the devices through it.
</div>

<div style="text-align: justify;">
The code for <a href="https://MiraPurkrabek.github.io/ProbPose">ProbPose demo</a> (see bottom of the page) is made for this solution but I left it because my laptop was not was enough and mainly because I would run out of battery in less than an hour.
</div>

#### 2. Run demo on your server, connect through Internet

<div style="text-align: justify;">
This is how my CVPR demo was done.
Run the program on any server with access to the Internet, use Gradio's public share feature and connect the tablet through Internet.
Works well but rely on good Internet connection. 
</div>

#### 3. Host demo on HuggingFace, connect through Internet

<div style="text-align: justify;">
Create a HF Space with your demo and connect to it with your tablet.
Seems the most logical but could be quiet expensive and there is some overhead with managing GPUs for simulatenous connections.
Since the demo is public on HF, other users could connect to it and it would be problematic to run the session for 2+ hours.
Could be solved with ZeroGPUs (cheaper, dynamically allocated) but I did not use them because their documentation is terrible and GPU allocation is non-trivial.
Anyway, this is your only option of you don't have access to private server (e.g. VRG/CMP servers).
</div>

#### 4. Host interface on HuggingFace but run on own server, connect through Internet

<div style="text-align: justify;">
HuggingFace offer you to create Space hosted on your own hardware.
I did not experiment with it but it would be something in between (2) and (3).
</div>


### Step-by-step

<div style="text-align: justify;">
Now that we have cleared which options are available to you, I'll give you a brief description of steps to how reproduce my demo.
</div>

#### (1) Run the 'backend' on your server

<div style="text-align: justify;">
Take your per-image demo and integrate it with <a href="https://github.com/MiraPurkrabek/ProbPose_code/blob/2ac83566b2bcd579c1c4e86198156b6e991b3d72/webcam_remote_demo.py">the Gradio interface</a> I used for my demo.
In short, the demo is multi-thread app where one thread keeps the lattest frame to process and the other do the processing.
The two-thread approach is necessary to run real-time-ish for unlimited time.
The Gradio interface uses WebRTC stream that is sending frames from webcam in real time.</div>

<div style="text-align: justify;">
If you code everything allright, you should run the program on a server and see options how to connect to the interface -- local URL (127.0.0.1:7860) or public URL generated by Gradio. When connecting to the public URL, any Internet device should see the demo. 
My laptop was able to run the demo.
</div>

```
* Running on local URL: http://127.0.0.1:7860
* Running on public URL: https://bed703ee0670aa48ce.gradio.live

This share link expires in 1 week. For free permanent hosting and GPU upgrades, run `gradio deploy` from terminal in the working directory to deploy to Hugging Face Spaces (https://huggingface.co/spaces)
```

<!-- <div style="text-align:center; margin:2em 0;">
    <img src="/assets/img/webcam_demo_launch.png" alt="Webcam Demo Launch" style="max-width:100%; height:auto;">
</div> -->

#### (2) Enable ICE Servers

<div style="text-align: justify;">
Some devices like iPad wouldn't activate their webcamera if the connection is not set properly.
You can see credentials loading at the beginning of the script.
You need to get your own credentials eg. on Twilio.com (free).
</div>

<div style="text-align: justify;">
Result of this step should be that the demo works on all devices including iOS.
</div>

> Note that iOS won't let you stream webcamera through unsecured http so debugging on local host is possible only with PC.

#### Internet Connection

<div style="text-align: justify;">
As mentioned before, big venues are not known for high-speed reliable Internet.
For CVPR, I used mobile data hotspot (many thank to <a href="https://jskvrna.github.io">Jan Skvrna</a>) for the first hour of the session and then switched to public WiFI once there were fewer people.
</div>

<div style="text-align: justify;">
When measured in controlled environment, my CVPR demo took more tham 30 MB of data per minute.
In practice, the first ~1 hour of the CVPR poster session took something about 1.3 GB and then I switched to the public WiFI.
The two-thread approach is nice as slow internet will result in less fps but the visualization is still real-time-ish. 
</div>


#### Hanging the tablet on the poster board

I have two options:
1. My magnetic flip cover for magnetic boards -- just flip the cover such and stick it to the board, it holds like miracle.
2. Or if you're unlucky as me and the board is not magnetic, go back to the good old pins. Just put a lot of them around your tablet and you'll be fine. You can see how I did it in the video above (pause it around 3-4 seconds).


### Links

- GitHub repository with my code for the demo -- [ProbPose -- branch 'feature_add-gradio-webcam-demo'](https://github.com/MiraPurkrabek/ProbPose_code/tree/feature_add-gradio-webcam-demo).

- [How to on ICE servers and Twilio](https://www.twilio.com/docs/stun-turn)
