const vscode = require('vscode');
const Options = require('./Options');

const DAY = 'day';
const NIGHT = 'night';
const HOUR_IN_MILLISECONDS = 3600000;
const MINUTE_IN_MILLISECONDS = 60000;

module.exports = {
    start,
    setDarkTheme,
    setLightTheme
};

/**
 * Set a theme for the editor.
 * 
 * @param {string} theme Sets the provided theme to the vscode configuration.
 */
function setTheme(theme) {
    var configuration = vscode.workspace.getConfiguration('workbench');
    theme = theme || configuration.get('colorTheme');

    configuration.update('colorTheme', theme, true);
};

/**
 * Gets the time of day based on the day/night configuration options.
 *
 * @return {string} DAY/NIGHT constants defined at the beginning of the file.
 */
function getTimeOfDay() {
    var day = Options.get().time.day;
    var night = Options.get().time.night;

    var currentHours = new Date().getHours();

    if (currentHours >= day && currentHours < night) {
        return DAY;
    } else if (currentHours >= night) {
        return NIGHT;
    }
};

/**
 * Changes the theme based on the time of day.
 */
function changeTheme() {
    var timeOfDay = getTimeOfDay();

    if (timeOfDay === DAY) {
        setTheme(Options.get().lightTheme);
    } else {
        setTheme(Options.get().darkTheme);
    }
};

/**
 * Checks the required options and shows a warning message if the
 * required values are not set.
 */
function checkOptions() {
    if (!Options.get().darkTheme || !Options.get().lightTheme) {
        vscode.window.showWarningMessage(
            'Chameleon: No themes configured for day/night'
        );
    }
};

/**
 * Sets the dark theme based on the configuration
 */
function setDarkTheme() {
    setTheme(Options.get().darkTheme);
};

/**
 * Sets the light theme based on the configuration
 */
function setLightTheme() {
    setTheme(Options.get().lightTheme);
};

/**
 * Gets the wait time in milliseconds between night/day.
 */
function getWaitTime() {
    var currentHour = new Date().getHours();
    var currentMinutes = new Date().getMinutes();
    var timeOfDay = getTimeOfDay();
    var difference;

    if (timeOfDay === DAY) {
        difference = Math.abs(currentHour - Options.get().time.night);
    } else {
        difference = Math.abs(currentHour - Options.get().time.day);
    }

    return difference * HOUR_IN_MILLISECONDS - currentMinutes * MINUTE_IN_MILLISECONDS;
};

/**
 * Starts the extension
 */
function start() {
    checkOptions();
    changeTheme();

    setTimeout(start, getWaitTime());
};