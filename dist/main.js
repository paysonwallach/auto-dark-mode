"use strict";
exports.__esModule = true;
var atom_1 = require("atom");
var systemPreferences = require('electron').remote.systemPreferences;
var notificationsOptions = { icon: 'light-bulb' };
var subscriptions = new atom_1.CompositeDisposable();
function lightTheme() {
    return atom.config.get('mojave-dark-mode.lightProfile');
}
exports.lightTheme = lightTheme;
function darkTheme() {
    return atom.config.get('mojave-dark-mode.darkProfile');
}
exports.darkTheme = darkTheme;
function currentTheme() {
    return atom.config.get('core.themes').join(' ');
}
exports.currentTheme = currentTheme;
function changeTheme(theme) {
    if (theme === void 0) { theme = ''; }
    atom.config.set('core.themes', theme.split(' '));
}
exports.changeTheme = changeTheme;
function activate() {
    var _this = this;
    if (process.platform == 'darwin') {
        subscriptions.add(atom.commands.add('atom-workspace', {
            'dark-mode:toggle': function () { return _this.toggle(); }
        }));
        if (systemPreferences.isDarkMode()) {
            this.onDark();
        }
        else {
            this.onLight();
        }
        systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', this.toggle.bind(this));
    }
    else {
        this.deactivate();
        console.log("Mojave Dark Mode is only compatible with macOS");
    }
}
exports.activate = activate;
function deactivate() {
    subscriptions.dispose();
}
exports.deactivate = deactivate;
function toggle() {
    var lightTheme = this.lightTheme();
    var darkTheme = this.darkTheme();
    var next = (this.currentTheme() == darkTheme ? lightTheme : darkTheme);
    return this.changeTheme(next);
}
exports.toggle = toggle;
function onLight() {
    var lightTheme = this.lightTheme();
    if (this.currentTheme() != lightTheme) {
        this.changeTheme(lightTheme);
        atom.notifications.addSuccess('Dark Mode: Switched to light theme', notificationsOptions);
    }
}
exports.onLight = onLight;
function onDark() {
    var darkTheme = this.darkTheme();
    if (this.currentTheme() != darkTheme) {
        this.changeTheme(darkTheme);
        atom.notifications.addSuccess('Dark Mode: Switched to dark theme', notificationsOptions);
    }
}
exports.onDark = onDark;
