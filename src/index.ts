// The browser platform with a compiler
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// The app module
import {RioSampleAppModule} from './app/sample-app.module';
import {enableProdMode} from '@angular/core';

import {production, test} from './configuration';

if (production) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (!test) {
  // Compile and launch the module
  platformBrowserDynamic().bootstrapModule(RioSampleAppModule);
}
