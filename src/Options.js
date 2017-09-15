const vscode = require('vscode');
const suncalc = require('suncalc');

const CONFIG_KEY = 'chameleon';

// TODO: Implement custom string values for day/night
const getAutoHours = (latitude, longitude, day, night) => {
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

        var darkTheme = options.get('darkTheme', '');
        var lightTheme = options.get('lightTheme', '');
        var time = options.get('time', '');
        var latitude = options.get('latitude', 0);
        var longitude = options.get('longitude', 0);

        if (time === 'auto') {
            time = getAutoHours(latitude, longitude);
        } else {
            time = {
                day: options.get('time.day'),
                night: options.get('time.night')
            };
        }

        return {
            darkTheme,
            lightTheme,
            time,
            latitude,
            longitude
        };
    },

    set() {
    }
};