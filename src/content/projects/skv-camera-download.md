---
title: Automatic download from SKV cameras
tagline: Automated video retrieval from a sports hall's camera system
kind: applied
# TODO(verify): no explicit start year is given anywhere in the source material.
years: '2024–'
role: Lead developer
org: 'Sokol Královské Vinohrady'
featured: false
order: 7
summary: >-
  An automated backend that downloads and archives video from SKV's sports-hall cameras, with a
  30-day history and failure alerting.
highlights:
  - 'Python backend + Microsoft Power Automate + OneDrive, 30-day history'
  - 'Logs every run and sends failure notifications for near real-time support'
  - 'Over 750 download requests · 1000+ videos downloaded'
tags:
  - Video Systems
  - Deployment
status: active
---

An automated system for downloading video from Sokol Královské Vinohrady's sports-hall cameras.
The interface is available on the club's staff-only website and allows downloading footage from
any camera within a 30-day history. The backend connects a Python service, Microsoft Power
Automate and Microsoft OneDrive, logs every run, and sends failure notifications so problems get
caught quickly. It has handled over 750 download requests, with 1000+ videos downloaded through
the system.
