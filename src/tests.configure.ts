import {
  getTestBed,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

export const configureTests = (configure: (testBed: TestBed) => void) => {
  const testBed = getTestBed();

  if (testBed.platform == null) {
    testBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
  }

  testBed.configureCompiler({
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ]
    });

  configure(testBed);

  return testBed.compileComponents().then(() => testBed);
};
