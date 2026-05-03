---
slug: roam-weather-trip-planning
title: I built a weather app for picking the best camping spot
authors: [andrewleader]
tags: [trip-planning]
---

You know the drill — you've got a free weekend and two possible spots, and you're bouncing between NOAA tabs trying to figure out which one will actually be good. I got tired of that, so I built **[Roam Weather](https://weather.roamapps.com)** — a free app that lets you save all your go-to locations and see their forecasts side by side, scored against your activity.

![Roam Weather screenshots](./img/RoamWeatherMerged.png)

<!-- truncate -->

Define what "good weather" means for you (temp range, max wind, precip threshold), and every day at every location gets an idealness score. No more guessing — you can see at a glance that Saturday at Vantage is 92% while Washington Pass is sitting at 45%.

A few things I'm particularly happy with:
- **Elevation-adjusted temps** — uses your spot's actual elevation, not whatever NOAA's grid happens to be
- **Sunlight-adjusted "feels like"** — 45°F sunny vs. 45°F overcast are very different days
- **Offline support** — works cached once you've installed the iOS or Android app

Free for up to 6 saved locations. Available on [web](https://weather.roamapps.com), [iOS](https://apps.apple.com/us/app/roam-weather/id6760034245), and [Android](https://play.google.com/store/apps/details?id=com.roamapps.weather). See https://weather.roamapps.com to try it yourself!
