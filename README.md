[![Circle CI](https://circleci.com/gh/rangle/angular2-redux-example.svg?style=svg)](https://circleci.com/gh/rangle/angular2-redux-starter)

# Angular 2/TypeScript/Redux/Webpack Example App

This is an example app built with Angular 2, Redux, and webpack. We use it 
internally as a teaching tool and platform for trying out architectural ideas.

It is maintained on an ad-hoc basis, your mileage may vary.

You can see it in action here: angular2-redux-example.herokuapp.com.

Log in with `user/pass`.

## npm scripts

> To see all available scripts:
```bash
$ npm run
```

### Dev
```bash
$ npm run dev
```
This runs a development mode server with live reload etc. Linter warnings will
be displayed with each reload.

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
This will run both code and style linters, but you can run them individually 
using `npm run lint-ts` and `npm run lint-css`.

#### Coverage
```bash
$ npm run cover
```

## Improvements

This is an initial version of this setup and will be expanded in the future.
Refer to the [issues section](https://github.com/rangle/angular2-redux-example/issues)
to see what needs to be done, or create a [new one](https://github.com/rangle/angular2-redux-example/issues/new).

## License

Copyright (c) 2016 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"
