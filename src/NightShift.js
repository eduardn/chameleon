const vscode = require('vscode');
// const SunCalc = require('suncalc');
const Options = require('./Options');

const setTheme = (theme) => {
    var configuration = vscode.workspace.getConfiguration('workbench');
    theme = theme || configuration.get('colorTheme');

    configuration.update('colorTheme', theme, true);
}

const checkCurrentTimeAgainstSun = () => {
    var day = Options.get().time.day;
    var night = Options.get().time.night;

    var currentHours = new Date().getHours();

    console.log('Day hour starts at:', day);
    console.log('Night hour starts at:', night);

    if (currentHours >= day && currentHours < night) {
        setTheme(Options.get().lightTheme);
    } else if (currentHours >= night) {
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
}

const start = () => {
    checkOptions();
    const intervalID = setInterval(checkCurrentTimeAgainstSun, 1000);

    return intervalID;
};

module.exports = {
    start,
    setDarkTheme,
    setLightTheme
};