[![Circle CI](https://circleci.com/gh/rangle/angular2-redux-starter.svg?style=svg)](https://circleci.com/gh/rangle/angular2-redux-starter)

# Angular 2/TypeScript/Redux/Webpack Starter

This is the initial version of our starter project using Angular 2.x, Redux, TypeScript and Webpack to tie it all together.

## Getting Started

Use our [starter script](http://npm.im/rangle-starter), with
`angular2-redux-starter` as the `techStack` argument.

## npm scripts

> To see all available scripts:
```bash
$ npm run
```

### Dev
```bash
$ npm run dev
```
This runs a development mode server with live reload etc. Linter warnings will be displayed with each reload.

Open `http://localhost:8080` in your browser.

### Production

```bash
$ npm install
$ npm start
```

This runs a production-ready express server that serves up a bundled and
minified version of the client.

Open `http://localhost:8080` in your browser.

### Tests

#### Single Run (with linting and coverage)
```bash
$ npm test
# or
$ npm t
```

#### Watch Files
```bash
$ npm run test:watch
```

#### Linting
```bash
$ npm run lint
```
This will run both code and style linters, but you can run them individually using `npm run lint-ts` and `npm run lint-css`.

#### Coverage
```bash
$ npm run cover
```

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.

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
