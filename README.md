<div align="center">
  <h1>Mojave Dark Mode</h1>
  <p>Dark Mode support for Atom on macOS</p>
  <a href=https://atom.io/packages/mojave-dark-mode>
    <img src=https://img.shields.io/apm/v/mojave-dark-mode.svg?style=flat-square>
  </a>
  <a href=https://github.com/paysonwallach/mojave-dark-mode/blob/master/LICENSE>
    <img src=https://img.shields.io/apm/l/mojave-dark-mode.svg?style=flat-square>
  </a>
  <a href=https://buymeacoffee.com/paysonwallach>
    <img src=https://img.shields.io/badge/donate-Buy%20me%20a%20coffee-yellow?style=flat-square>
  </a>
  <br>
  <br>
  <br>
</div>

![Automatic theme switching](https://raw.githubusercontent.com/paysonwallach/mojave-dark-mode/master/automatic-theme-switching.gif)

Mojave Dark Mode provides dark mode support for Atom on macOS 10.14+ with automatic theme switching based on the system appearance setting.

## Installation

Search for `mojave-dark-mode` in `Settings View: Install Packages and Themes` or:

```
$ apm install mojave-dark-mode
```

You can switch themes manually using `` ctrl + ` `` or choosing `Dark Mode: Toggle theme` in the command palette.

### Note:

To get the title bar to change in older versions of Atom as well, add the `NSRequiresAquaSystemAppearance` key to `Info.plist` (located in `/Applications/Atom.app/Contents`), and set to `false`.

## Configuration

Add your preferred light and dark UI and syntax themes as shown in settings, or in `config.cson`.

## Contributing

Pull requests are welcome! Be sure to also update the [changelog](https://github.com/paysonwallach/mojave-dark-mode/blob/master/CHANGELOG.md).

## License

This project is licensed under the permissive [ISC license](https://github.com/paysonwallach/mojave-dark-mode/blob/master/LICENSE).

## Attributions

Mojave Dark Mode is inspired by [Exelord/dark-mode](https://github.com/Exelord/dark-mode).
