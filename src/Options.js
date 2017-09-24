const vscode = require('vscode');
const suncalc = require('suncalc');
const Utils = require('./utils');

const CONFIG_KEY = 'chameleon';
const AVAILABLE_DAY_NIGHT_OPTIONS = [
    'sunrise',
    'sunriseEnd',
    'goldenHourEnd',
    'solarNoon',
    'goldenHour',
    'sunsetStart',
    'sunset',
    'dusk',
    'nauticalDusk',
    'night',
    'nadir',
    'nightEnd',
    'nauticalDawn',
    'dawn'
];

/**
 * Gets the day/night hours based on day/night
 * parameters and lat/long calculations.
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {string} day A string representing the options available in suncalc.
 * @param {string} night A string representing the options available in suncalc.
 */
function getAutoHours(latitude, longitude, day, night) {
    var times = suncalc.getTimes(new Date(), latitude, longitude);
    day = day || 'sunriseEnd';
    night = night || 'sunset';

    return {
        day: times[day].getHours(),
        night: times[night].getHours()
    };
};

module.exports = {
    get() {
        const options = vscode.workspace.getConfiguration(CONFIG_KEY);

        const darkTheme = options.get('darkTheme', '');
        const lightTheme = options.get('lightTheme', '');
        const latitude = options.get('latitude', 0);
        const longitude = options.get('longitude', 0);

        var time = options.get('time', '');
        var day = options.get('day');
        var night = options.get('night');

        if (time === 'auto') {
            day = AVAILABLE_DAY_NIGHT_OPTIONS.indexOf(day) > -1 ? day : null;
            night = AVAILABLE_DAY_NIGHT_OPTIONS.indexOf(night) > -1 ? night : null;

            time = Object.assign(
                { value: time },
                getAutoHours(latitude, longitude, day, night)
            );
        } else {
            if (Utils._isString(day) || Utils._isString(night)) {
                time = {
                    day: 8,
                    night: 20,
                    value: time
                };
            } else {
                time = {
                    day,
                    night,
                    value: time
                };
            }
        }

        return {
            darkTheme,
            lightTheme,
            time,
            latitude,
            longitude
        };
    },

    set() {}
};