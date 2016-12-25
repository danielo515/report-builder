# report-builder

> Create complex JSON reports easily

[![NPM](https://img.shields.io/npm/v/report-builder.svg?style=flat-square)](https://www.npmjs.com/package/report-builder)
[![David](https://img.shields.io/david/danielo515/report-builder.svg?style=flat-square)](https://david-dm.org/danielo515/report-builder)
[![Travis](https://img.shields.io/travis/danielo515/report-builder/master.svg?style=flat-square)](https://travis-ci.org/danielo515/report-builder)

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add report-builder (--dev)

or npm

	npm install report-builder (--save-dev)


If you don't use a package manager, you can [access `report-builder` via unpkg (CDN)](https://unpkg.com/report-builder/), download the source, or point your package manager to the url.

`report-builder` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `report-builder` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/report-builder/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/report-builder) on your page. The UMD builds make `report-builder` available as a `window.reportBuilder` global variable.

### Usage

### setup

```js

import reportBuilder from 'report-builder';

```

### configuration

You can pass in extra options as a configuration object (➕ required, ➖ optional, ✏️ default).

```js

import reportBuilder from 'report-builder';

```

➖ **property** ( type ) ` ✏️ default `
<br/> 📝 description
<br/> ❗️ warning
<br/> ℹ️ info
<br/> 💡 example

### methods

#### #name

```js

reportBuilder

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/danielo515/report-builder) example.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
