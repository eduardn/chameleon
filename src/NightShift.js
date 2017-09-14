const vscode = require('vscode');
const SunCalc = require('suncalc');

const getLightTheme = () => {
    return 'JSFiddle-like-syntax-vscode';
}

const getDarkTheme = () => {
    return 'Ayu Dark';
}

const setTheme = (theme) => {
    var configuration = vscode.workspace.getConfiguration('workbench');
    theme = theme || configuration.get('colorTheme');

    configuration.update('colorTheme', theme, true);
}

const checkCurrentTimeAgainstSun = () => {
    // get long/lat from storage
    var times = SunCalc.getTimes(new Date(), 44.426767, 26.102538);

    var sunset = times.sunset;
    var sunrise = times.sunrise;

    var currentTime = new Date();

    if (currentTime > sunrise && currentTime < sunset) {
        setTheme(getLightTheme());
    } else if (currentTime > sunset) {
        setTheme(getDarkTheme());
    }
};

module.exports = {
    start() {
        // TODO: Check configuration
        setInterval(checkCurrentTimeAgainstSun, 1000);
    }
};