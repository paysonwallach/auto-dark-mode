'use babel';

//import { CompositeDisposable } from 'atom';
//import exec from 'child_process';
const { exec } = require('child_process');

const interval = 500;

let notificationsOptions = { icon: 'light-bulb' };

export default {
  get lightTheme() {
    return atom.config.get('macos-dark-mode.lightProfile');
  },

  get darkTheme() {
    return atom.config.get('macos-dark-mode.darkProfile');
  },

  get currentTheme() {
    return atom.config.get('core.themes').join(' ');
  },

  activate() {
    this.disposable = atom.commands.add('atom-workspace', {
      'dark-mode:toggle': () => this.toggle()
  });

    setInterval(this.getAppearanceState.bind(this), interval);
  },

  deactivate() {
    this.disposable.dispose();
  },

  toggle() {
    let next = (this.currentTheme == this.darkTheme ? this.lightTheme : this.darkTheme);

    return this._changeTheme(next);
  },

  getAppearanceState() {
      exec('defaults read -g AppleInterfaceStyle', (err, stdout, stderr) => {
        if (err) {
            this.onLight()
        } else {
            this.onDark()
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
};
