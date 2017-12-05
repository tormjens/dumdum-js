# Dumdum Js

DumDum is a condtional JavaScript executor, or a router if you will. Routes are executed based on class names on the body element. DumDum has no package dependencies, but relies on MutationObservers. Although it provides a light replacement for cases where MutationObservers are not availiable.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

>

## Installation

```sh
npm install dumdum-js --save
```

## Usage

CommonJs:
```js
var DumDum = require('dumdum-js')
```

ES6:
```js
import DumDum from 'dumdum-js'
```

Using it in your javascript:
```js
new DumDum({
  common: function() {
    // Generic JS here.
  },
  home: function() {
    // JS for pages containing the 'home' class
  },
  nav_ready: function() {
    // Will be executed as soon as the 'nav-ready' class is added to the body.
  }
})
```

This will enable DumDum to watch for changes to your `body` element.

If you need to watch for changes on different element you can pass it as the second argument:

```js
new DumDum({
  ...
}, document.querySelector('#awesome-div'))
```

## License

MIT license

[npm-image]: https://img.shields.io/npm/v/dumdum-js.svg?style=flat
[npm-url]: https://npmjs.org/package/dumdum-js
[downloads-image]: https://img.shields.io/npm/dm/dumdum-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/dumdum-js
[travis-image]: https://img.shields.io/travis/tormjens/dumdum-js.svg?style=flat
[travis-url]: https://travis-ci.org/tormjens/dumdum-js
[coveralls-image]: https://img.shields.io/coveralls/tormjens/dumdum-js.svg?style=flat
[coveralls-url]: https://coveralls.io/r/tormjens/dumdum-js?branch=master
