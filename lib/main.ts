'use babel';

import { CompositeDisposable } from 'atom';

const { systemPreferences } = require('electron').remote;
const notificationsOptions = { icon: 'light-bulb' };
const subscriptions = new CompositeDisposable();

export default {
    get lightTheme() {
        return atom.config.get('mojave-dark-mode.lightProfile');
    },

    get darkTheme() {
        return atom.config.get('mojave-dark-mode.darkProfile');
    },

    get currentTheme() {
        return atom.config.get('core.themes').join(' ');
    },

    activate() {
        subscriptions.add(atom.commands.add('atom-workspace', {
            'Dark Mode:toggle': () => this.toggle()
        }));

        if (systemPreferences.isDarkMode()) {
            this.onDark();
        } else {
            this.onLight();
        }

        systemPreferences.subscribeNotification(
            'AppleInterfaceThemeChangedNotification', this.toggle.bind(this));
    },

    deactivate() {
        subscriptions.dispose();
    },

    toggle() {
        let next = (this.currentTheme == this.darkTheme ? this.lightTheme : this.darkTheme);

        return this._changeTheme(next);
    },

    onLight() {
        if (this.currentTheme != this.lightTheme) {
            this._changeTheme(this.lightTheme);
            atom.notifications.addSuccess(
                'Dark Mode: Switched to light theme', notificationsOptions);
        }
    },

    onDark() {
        if (this.currentTheme != this.darkTheme) {
            this._changeTheme(this.darkTheme);
            atom.notifications.addSuccess(
                'Dark Mode: Switched to dark theme', notificationsOptions);
        }
    },

    _changeTheme(theme = '') {
        atom.config.set('core.themes', theme.split(' '));
    }
}
