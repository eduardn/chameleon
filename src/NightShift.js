const vscode = require('vscode');
const Options = require('./Options');

const DAY = 'day';
const NIGHT = 'night';
const HOUR_IN_MILLISECONDS = 3600000;
const MINUTE_IN_MILLISECONDS = 60000;

const setTheme = (theme) => {
    var configuration = vscode.workspace.getConfiguration('workbench');
    theme = theme || configuration.get('colorTheme');

    configuration.update('colorTheme', theme, true);
};

const getTimeOfDay = () => {
    var day = Options.get().time.day;
    var night = Options.get().time.night;

    var currentHours = new Date().getHours();

    if (currentHours >= day && currentHours < night) {
        return DAY;
    } else if (currentHours >= night) {
        return NIGHT;
    }
};

const changeTheme = () => {
    var timeOfDay = getTimeOfDay();

    if (timeOfDay === DAY) {
        setTheme(Options.get().lightTheme);
    } else {
        setTheme(Options.get().darkTheme);
    }
};

const checkOptions = () => {
    if (!Options.get().darkTheme || !Options.get().lightTheme) {
        vscode.window.showWarningMessage(
            'Chameleon: No themes configured for day/night'
        );
    }
};

const setDarkTheme = () => {
    setTheme(Options.get().darkTheme);
};

const setLightTheme = () => {
    setTheme(Options.get().lightTheme);
};

const getWaitTime = () => {
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

const start = () => {
    checkOptions();
    changeTheme();

    setTimeout(start, getWaitTime());
};

module.exports = {
    start,
    setDarkTheme,
    setLightTheme
};