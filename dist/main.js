"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const { systemPreferences } = require('electron').remote;
const notificationsOptions = { icon: 'light-bulb' };
const subscriptions = new atom_1.CompositeDisposable();
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
function changeTheme(theme = '') {
    atom.config.set('core.themes', theme.split(' '));
}
exports.changeTheme = changeTheme;
function activate() {
    subscriptions.add(atom.commands.add('atom-workspace', {
        'dark-mode:toggle': () => this.toggle()
    }));
    if (systemPreferences.isDarkMode()) {
        this.onDark();
    }
    else {
        this.onLight();
    }
    systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', this.toggle.bind(this));
}
exports.activate = activate;
function deactivate() {
    subscriptions.dispose();
}
exports.deactivate = deactivate;
function toggle() {
    const lightTheme = this.lightTheme();
    const darkTheme = this.darkTheme();
    let next = (this.currentTheme() == darkTheme ? lightTheme : darkTheme);
    return this.changeTheme(next);
}
exports.toggle = toggle;
function onLight() {
    const lightTheme = this.lightTheme();
    if (this.currentTheme() != lightTheme) {
        this.changeTheme(lightTheme);
        atom.notifications.addSuccess('Dark Mode: Switched to light theme', notificationsOptions);
    }
}
exports.onLight = onLight;
function onDark() {
    const darkTheme = this.darkTheme();
    if (this.currentTheme() != darkTheme) {
        this.changeTheme(darkTheme);
        atom.notifications.addSuccess('Dark Mode: Switched to dark theme', notificationsOptions);
    }
}
exports.onDark = onDark;
