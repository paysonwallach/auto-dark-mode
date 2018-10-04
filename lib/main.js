'use babel';

import { CompositeDisposable } from "atom";

const { exec } = require('child_process');
const notificationsOptions = { icon: 'light-bulb' };
const updateInterval = 500;

export default {
    handle: null,

    get lightTheme() {
        return atom.config.get('mojave-dark-mode.lightProfile');
    },

    get darkTheme() {
        return atom.config.get('mojave-dark-mode.darkProfile');
    },

    get currentTheme() {
        return atom.config.get('core.themes').join(' ');
    },

    get state() {
        return atom.config.get('mojave-dark-mode.automaticMode');
    },

    activate() {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'dark-mode:toggle': () => this.toggle(),
            'dark-mode:Enable Automatic Theme Switching': () => atom.config.set('mojave-dark-mode.automaticMode', true),
            'dark-mode:Disable Automatic Theme Switching': () => atom.config.set('mojave-dark-mode.automaticMode', false)}),
            atom.config.onDidChange('mojave-dark-mode.automaticMode', ({newValue}) => {
                if (newValue) {
                    this._enableAutomaticAppearanceUpdating();
                } else {
                    this._disableAutomaticAppearanceUpdating();
                }
                atom.notifications.addInfo(`Dark Mode: Automatic mode is ${newValue ? 'enabled' : 'disabled'}`, notificationsOptions);
            })
        );

        if (this.state) {
            this._enableAutomaticAppearanceUpdating();
        }

        this._startupNotification();
    },

    deactivate() {
        this.appearanceStateObserver.active = false;
        this.subscriptions.dispose();
    },

    toggle() {
        let next = (this.currentTheme == this.darkTheme ? this.lightTheme : this.darkTheme);

        atom.config.set('mojave-dark-mode.automaticMode', false);
        return this._changeTheme(next);
    },

    _enableAutomaticAppearanceUpdating() {
        this.handle = setInterval(this._updateAppearanceState.bind(this), updateInterval);
    },

    _disableAutomaticAppearanceUpdating() {
        clearInterval(this.handle);
    },

    _updateAppearanceState() {
        exec('defaults read -g AppleInterfaceStyle', (err, stdout, stderr) => {
            if (err) {
                this.onLight();
            } else {
                this.onDark();
            };
        })
    },

    onLight() {
        if (this.currentTheme != this.lightTheme) {
            this._changeTheme(this.lightTheme);
            atom.notifications.addSuccess('Dark Mode: Switched to light theme', notificationsOptions);
        }
    },

    onDark() {
        if (this.currentTheme != this.darkTheme) {
            this._changeTheme(this.darkTheme);
            atom.notifications.addSuccess('Dark Mode: Switched to dark theme', notificationsOptions);
        }
    },

    _changeTheme(theme = '') {
        atom.config.set('core.themes', theme.split(' '));
    },

    _startupNotification() {
        atom.notifications.addInfo(`Dark Mode: Automatic mode is ${this.state ? 'enabled' : 'disabled'}`, {
            icon: 'light-bulb',
            buttons: [{
                text: this.state ? 'Disable' : 'Enable',
                onDidClick() {
                    atom.config.set('mojave-dark-mode.automaticMode', !this.state);
                }
            }]
        });
    }
};
