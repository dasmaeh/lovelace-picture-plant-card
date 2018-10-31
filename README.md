# picture-plant-card
A custom card for plant status with a picture in home assistant's lovelace ui

This custom card creates a nice and clean view for plant sensors. It relies on the [plant component](https://www.home-assistant.io/components/plant/), so you need to set this up before. However, the plant component creates an overall status for each plant (aka 'problem') which can be used on automations.
The idea was to create something similar to the [picture glance card](https://www.home-assistant.io/lovelace/picture-glance/). So it's basically an image of your plant with the title and icons for all the sensors attached to the plant at the bottom Hovering the icons will show you the sensor status.
**Plus**: if any of the sensors reports a problem (eg moisture too low) the icon will be in red color.


# Installation
Copy the file `picture-plant-card.js` to `<ha config dir>/www/picture-plant-card.js` in your home assistant's config subdirectory

Add it as a resource in your `lovelace-ui.yaml` like this:

```yaml
resources:
  - url: /local/picture-plant-card.js
    type: js
```

# Configuration
- **type** (_required_): custom:picture-plant-card
- **entity** (_required_): entity of the plant to be monitored
- **image** (_required_): picture of the plant, store images in `<ha config dir>/www` and reference them here as `/local/my_plant_img.jpg`
- **title** (_optional_): title of the card. If not specified the friendly name of the plant entity will be used.

## Sample:
```yaml
- type: custom:picture-plant-card
  entity: plant.fern
  title: Farn
  image: /local/plant_img/fern.jpg
```

![screenshot of picture-plant-card](sample.png)

# Updating
It's highly recommended to use the [custom_updater](https://github.com/custom-components/custom_updater) component and the related [tracker card](https://github.com/custom-cards/tracker-card) to keep your custom components and cards up to date.

The picture-plant-card supports `custom_updater` and provides a tracking file.

## Set up
Add the `picture-plant-card` to your `lovelace-ui.yaml` like this:
```yaml
resources:
  - url: /local/picture-plant-card.js?v=0
    type: js
```
and add it to the `custom_updater` configuration:
```yaml
ustom_updater:
  track:
    - cards
  card_urls:
    - https://raw.githubusercontent.com/dasmaeh/lovelace-picture-plant-card/master/tracker.json
```
You now will be able to update picture-plant-card from your ui.
