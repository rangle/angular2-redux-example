'use strict';

require('classlist-polyfill'); // classlist: IE9
require('console-polyfill');   // console: IE9
require('raf').polyfill();     // requestAnimationFrame: IE9, Android < 4.4

// TODO: breaks with webpack2 and typescript2, find alternative
// require('html5-history-api');  // HTML5 History: IE9.

// Pulled from node_modules/angular2/es6/src/dev/testing/shims_for_IE.js to
// work around https://github.com/angular/angular/issues/#6501.
// To be re-evaluated once that issue is closed.

// function.name (all IE)
// ! @source http://stackoverflow.com/questions/6903762/
//     function-name-not-supported-in-ie*/
// *! @source https://github.com/justindujardin/angular/
//     commit/1fdb099a3509503a6c644744957a7ba3c5c46a0b*/

if (!Object.hasOwnProperty('name')) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function getName() {
      const matches = this.toString()
        .match(/^\s*function\s*([a-zA-z\_\$]*)\s*\(/);
      const name = matches && matches.length > 1 ? matches[1] : '';
      // For better performance only parse once, and then cache the
      // result through a new accessor for repeated access.
      Object.defineProperty(this, 'name', { value: name });
      return name;
    },
  });
}
