import 'core-js/es6';
import 'core-js/es7/reflect';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/jasmine-patch';
import 'ts-helpers';

let testContext = (<{ context?: Function }>require).context(
  './',
  true,
  /\.test\.ts/);
testContext.keys().forEach(testContext);
