const vscode = require('vscode');

const CONFIG_KEY = 'chameleon';

module.exports = {
    get() {
        const options = vscode.workspace.getConfiguration(CONFIG_KEY);

        var darkTheme = options.get('darkTheme', '');
        var lightTheme = options.get('lightTheme', '');
        var time = options.get('time', '');

        // TODO: Check if time is auto and get hours from suncalc

        time = {
            day: options.get('time.day'),
            night: options.get('time.night')
        };

        return {
            darkTheme,
            lightTheme,
            time
        };
    },

    set() {
    }
};