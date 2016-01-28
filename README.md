# Angular 2/TypeScript/Redux/Webpack Starter

This is the initial version of our starter project using Angular 2.x, Redux, TypeScript and Webpack to tie it all together.

## Getting Started

Use our [starter script](https://www.npmjs.com/package/rangle-starter), with
`angular2-redux-starter` as the `techStack` argument.

## Commands

* `npm install`: install npm dependencies specified in package.json as well as typings specified in tsd.json (typings will be put into *typings* folder which is also git ignored).
* `postinstall`: runs automatically after `npm install` and triggers a `npm run build` to provide a build directory to `npm start` by default

* `npm run dev`: will start webpack's development server (with live reloading) on [http://localhost:3000](http://localhost:3000). Note that in this case the bundle will be generated in memory and your bundle in *dist* might get out of sync.
* `npm start`: starts a production server serving the *dist* directory on [http://localhost:3000](http://localhost:3000)

* `npm run build`: bundle all of the application including js/css/html files, with index.html generated according to a template specified in *index.html* (Everything will be put into *dist* folder).
* `npm test`: will run the unit tests for the project as specified in *karma.conf.js* (everything ending in .test.ts will ge picked up, refer to *src/tests.entry.ts* if other extensions should be used).
* `npm run e2e`: will run the e2e suite for this project located in *e2e* (refer to *wdio.conf.js* and *gulpfile.js* for more info, this is the only `gulp` dependency).
* `npm run typings`: removes existing typings located in *typings* directory, reinstalls them based on *tsd.json*, and links whatever is available in *node_modules* (using `tsd link`).

## Improvements

This is an initial version of this setup and will be expanded in the future. Refer to the [issues section](https://github.com/rangle/rangle-starter/issues) to see what needs to be done, or create a [new one](https://github.com/rangle/rangle-starter/issues/new).

Issues for this particular starter project are tagged with the 'ng2' label.

## If something doesn't work

We centralize issue management for all rangle starters in the [rangle-starter](https://github.com/rangle/rangle-starter) repository, to help us keep things consistent.

Refer to the [issues section](https://github.com/rangle/rangle-starter/issues) to see if this has already been logged. Otherwise create a [new issue](https://github.com/rangle/rangle-starter/issues/new).

Be sure to tag your new issue with the 'ng2' label so we can see which starter you're filing it for.

## Example Application

TBC

## License

Copyright (c) 2016 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"
