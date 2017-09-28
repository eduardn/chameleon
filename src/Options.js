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

let PARSED_OPTIONS = {};

module.exports = { get, parseOptions };

/**
 * Parses options from vscode preference file
 * and sets some default based on the set values.
 */
function parseOptions() {
    const options = vscode.workspace.getConfiguration(CONFIG_KEY);

    let darkTheme = options.get('darkTheme', '');
    let lightTheme = options.get('lightTheme', '');
    let latitude = options.get('latitude', 0);
    let longitude = options.get('longitude', 0);
    let day = options.get('day');
    let night = options.get('night');
    let time = {};

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