# Battery

I actually have two batteries, for 415 Ah combined (4,980 Wh)

* **House battery**: [280 Ah SOK LiFePOK battery](https://amzn.to/4uS5bUl)
* **Starter battery**: [135 Ah Dakota Lithium LiFePO4 1000 CCA battery](https://dakotalithium.com/product/dl-plus-12v-135ah-dual-purpose-1000cca-starter-car-truck-battery-plus-deep-cycle-performance/)

> *I bought this gear with my own money, and no one is paying me to write this, but the links here are Amazon Associate affiliate links that help support my content - and they don't cost you anything - same price as if you went to Amazon directly!*

The house battery is your typical setup, and definitely has plenty of capacity even for induction cooking and working remotely.

However, I had the Dakota Lithium starter battery from my previous SUV camper, and it's actually LIGHTER than the stock Toyota battery despite having like 4x the capacity!

## Charging system

The house battery is charged via the [Renogy 50A DC-to-DC charger](https://amzn.to/3S6bc1V), which takes inputs from:

* My 600W of solar panels: [See here for more info](./solar.md).
* The starter battery / alternator.

DC-to-DC chargers are typically programmed to shut off when voltage is lower than 12.8V (since that indicates the alternator isn't running), but with the lithium starter battery, the voltage actually remains at like 13.2V even when the car is off.

That means the charger thinks the car is "running" even when it's off, and starts charging my house battery from my starter battery. This is actually OK though! It works something like this...

State | House battery capacity | Starter battery capacity | Charger status
--|--|--|--
Initial state | 100% | 100% | Neutral
After I cook a meal | 90% | 100% | 🔋 House battery charging
30 mins later | 100% | 80% | Neutral
After using lots of power | 80% | 20% | When the starter battery finally gets down to ~20%, its voltage will drop below 12.8V, and the DC-to-DC charger will stop charging the house battery with it. But it's still plenty to start the car!

I've had that setup for over a year now, and after 80+ nights of remote boondocking, I've never once had a dead battery or anything!