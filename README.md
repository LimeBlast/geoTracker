# geoTracker
## A Lime Blast Experiment

The purpose of this experiment is to test the plausibility of using Cordova to power a geolocation base capture game.

## Getting started

- `npm install -g gulp cordova`
- Clone the repo
- `npm install`
- `bower install`
- `node tasks/platforms.js && node tasks/plugins.js` ([source](http://jbavari.github.io/blog/2014/06/24/managing-cordova-plugins-with-package-dot-json-and-hooks/))
- Launch the emulator / connect your phone `ionic emulate <platform> -l -c -s` (livereload, consolelog, serverlog)
- or `ionic serve --address 127.0.0.1`

## Notes

The Livereload depends on the correct *Content-Security-Policy* being set in a meta tag. You can remove this line from the `index.html` file, but this causes an error message to appear in the log. If live reload doesn't work, check you've white-listed the correct IP address. ([source](http://forum.ionicframework.com/t/solution-for-livereload-problems-with-new-csp-rules/25449)).

## Technology

- Ionic
- [Ripple](https://bradb.net/improving-the-quality-assurance-process/)
