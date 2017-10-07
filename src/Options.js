const vscode = require('vscode');
const suncalc = require('suncalc');
const Utils = require('./utils');
const Notifications = require('./Notifications');

const CONFIG_KEY = 'chameleon';
const CONFIG_ITEMS = {
    DarkTheme: 'darkTheme',
    LightTheme: 'lightTheme',
    Latitude: 'latitude',
    Longitude: 'longitude',
    Day: 'day',
    Night: 'night'
};
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

let PARSED_OPTIONS = {};

module.exports = { get, parseOptions };

function checkOptions(options) {
    if (!options.get(CONFIG_ITEMS.DarkTheme)) {
        Notifications.notifyOptionMissing('chameleon.darkTheme');
    }

    if (!options.get(CONFIG_ITEMS.LightTheme)) {
        Notifications.notifyOptionMissing('chameleon.lightTheme');
    }

    let day = options.get(CONFIG_ITEMS.Day);
    if (Utils._isString(day) &&
        AVAILABLE_DAY_NIGHT_OPTIONS.indexOf(day) === -1) {
            Notifications.notify(
                Notifications.NotificationTypes.Info,
                `chameleon.${CONFIG_ITEMS.Day} value "${day}" is not recognized`
            );
    }

    let night = options.get(CONFIG_ITEMS.Day);
    if (Utils._isString(night) &&
        AVAILABLE_DAY_NIGHT_OPTIONS.indexOf(night) === -1) {
            Notifications.notify(
                Notifications.NotificationTypes.Info,
                `chameleon.${CONFIG_ITEMS.Night} value "${night}" is not recognized`
            );
    }
}

/**
 * Parses options from vscode preference file
 * and sets some default based on the set values.
 */
function parseOptions() {
    const options = vscode.workspace.getConfiguration(CONFIG_KEY);

    let darkTheme = options.get(CONFIG_ITEMS.DarkTheme, '');
    let lightTheme = options.get(CONFIG_ITEMS.LightTheme, '');
    let latitude = options.get(CONFIG_ITEMS.Latitude, 0);
    let longitude = options.get(CONFIG_ITEMS.Longitude, 0);
    let day = options.get(CONFIG_ITEMS.Day);
    let night = options.get(CONFIG_ITEMS.Night);
    let time = {};

    // Check options and show some info or errors to let the user know
    // the configuration is no proper
    checkOptions(options);

    if (latitude !== 0 && longitude !== 0) {
        if (!Utils._isString(day) && day === -1) {
            day = 'sunriseEnd';
        }

        if (!Utils._isString(night) && night === -1) {
            night = 'sunset';
        }

        time = getTimeObject(day, night, latitude, longitude);
    } else {
        time = {
            day: day > -1 ? day : 8,
            night: night > -1 ? night : 20
        };
    }

    PARSED_OPTIONS = {
        darkTheme,
        lightTheme,
        time,
        latitude,
        longitude
    };
}

/**
 * Gets the parsed options
 */
function get() {
    return PARSED_OPTIONS;
}

/**
 * Gets a time object based on the latitude/longitude or day/night hours
 *
 * @param {string|number} day The hour at which the day starts
 * @param {string|number} night The hour at which the night starts
 * @param {number} latitude Latitude of the current position
 * @param {number} longitude Longitude of the current position
 */
function getTimeObject(day, night, latitude, longitude) {
    var calculatedTimes = suncalc.getTimes(new Date(), latitude, longitude);
    let time = { day, night };

    if (Utils._isString(day)) {
        day = AVAILABLE_DAY_NIGHT_OPTIONS.indexOf(day) ? day : 'sunriseEnd';
        time.day = calculatedTimes[day].getHours();
    }

    if (Utils._isString(night)) {
        night = AVAILABLE_DAY_NIGHT_OPTIONS.indexOf(night) ? night : 'sunset';
        time.night = calculatedTimes[night].getHours();
    }

    return time;
}