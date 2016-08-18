// The browser platform with a compiler
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// The app module
import {RioSampleAppModule} from './app/sample-app.module';
import {enableProdMode} from '@angular/core';

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (!__TEST__) {
  // Compile and launch the module
  platformBrowserDynamic().bootstrapModule(RioSampleAppModule);
}
