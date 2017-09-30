# Chameleon

Chameleon is an extension that changes the theme to a light or a dark one
based on day/night hours provided in the settings or by calculating sunset/sunrise
based on latitude and longitude provided in the settings.

## Features

- Change light/dark themes based on provided hours
- Auto calculate the hours based on latitude/longitutde

## Requirements

None

## Extension Settings

* `chameleon.lightTheme`: Light theme to be used during the day
* `chameleon.darkTheme`: Dark theme to be used during the night
* `chameleon.day`: A number representing the start of the day (24h format)
* `chameleon.night`: A number representing the start of the night (24h format)
* `chameleon.latitude`: Latitude of your position
* `chameleon.longitude`: Longitude of your position

#### Notes
When latitude and longitude are set `chameleon.day` and `chameleon.night`
have a number of options that can be set to get different hours,
see below the available options and their meaning.

| Property        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `sunrise`       | sunrise (top edge of the sun appears on the horizon)                     |
| `sunriseEnd`    | sunrise ends (bottom edge of the sun touches the horizon)                |
| `goldenHourEnd` | morning golden hour (soft light, best time for photography) ends         |
| `solarNoon`     | solar noon (sun is in the highest position)                              |
| `goldenHour`    | evening golden hour starts                                               |
| `sunsetStart`   | sunset starts (bottom edge of the sun touches the horizon)               |
| `sunset`        | sunset (sun disappears below the horizon, evening civil twilight starts) |
| `dusk`          | dusk (evening nautical twilight starts)                                  |
| `nauticalDusk`  | nautical dusk (evening astronomical twilight starts)                     |
| `night`         | night starts (dark enough for astronomical observations)                 |
| `nadir`         | nadir (darkest moment of the night, sun is in the lowest position)       |
| `nightEnd`      | night ends (morning astronomical twilight starts)                        |
| `nauticalDawn`  | nautical dawn (morning nautical twilight starts)                         |
| `dawn`          | dawn (morning nautical twilight ends, morning civil twilight starts)     |

## Release Notes

### 1.1.0

- Removed ```chameleon.time``` option
- The time is automatically calulated whenever you have set the
    ```chameleon.latitude``` and ```chameleon.longitude``` options.
- You can now override the automatically calculated hours by setting
    ```chameleon.day``` or ```chameleon.night``` to your preferred hours
    (e.g. have day hour be at sunrise and night hour be at 17 or any other hour)

### 1.0.0

Initial release!