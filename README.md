# Mojave Dark Mode

This package adds dark mode support for Atom on macOS 10.10+ with automatic theme switching based on the system appearance setting.

![Automatic theme switching](https://raw.githubusercontent.com/paysonwallach/mojave-dark-mode/master/automatic-theme-switching.gif)

## Installation
Search for `mojave-dark-mode` in `Settings View: Install Packages and Themes` or:
```
$ apm install mojave-dark-mode
```

You can switch themes manually using `` ctrl + ` `` or choosing `Dark Mode: Toggle theme` in the command palette.

### Note:
To get the title bar to change as well, add the `NSRequiresAquaSystemAppearance` key to Info.plist (Located in `Atom/Contents`), and set to `false`.

## Configuration

Add your preferred light and dark UI and syntax themes as shown in settings, or in `config.cson`.

## Contribution

Pull requests are welcome! Be sure to also update the [changelog](https://github.com/paysonwallach/mojave-dark-mode/blob/master/CHANGELOG.md).

## License

This project is licensed under the permissive [ISC license](https://github.com/paysonwallach/mojave-dark-mode/blob/master/LICENSE).

## Attributions

Mojave Dark Mode is inspired by [Exelord/dark-mode](https://github.com/Exelord/dark-mode).
