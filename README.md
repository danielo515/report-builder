# Report Builder

[![Greenkeeper badge](https://badges.greenkeeper.io/danielo515/report-builder.svg)](https://greenkeeper.io/)

A simple tool for helping your programs generate complex JSON documents.
It provides a nice developer experience providing simple but powerful chainable methods.

> Create complex JSON reports easily

[![NPM](https://img.shields.io/npm/v/report-builder.svg?style=flat-square)](https://www.npmjs.com/package/report-builder)
[![David](https://img.shields.io/david/danielo515/report-builder.svg?style=flat-square)](https://david-dm.org/danielo515/report-builder)
[![Travis](https://img.shields.io/travis/danielo515/report-builder/master.svg?style=flat-square)](https://travis-ci.org/danielo515/report-builder)
[![Coverage Status](https://coveralls.io/repos/danielo515/report-builder/badge.svg?branch=master)](https://coveralls.io/r/danielo515/report-builder?branch=master)
[![npm](https://img.shields.io/npm/dt/report-builder.svg?style=flat-square)](https://www.npmjs.com/package/report-builder)

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

# Examples

See [`example`](examples/script.js) folder or the [runkit](https://runkit.com/danielo515/report-builder) example.


### Basic usage example

You have to require the report constructor, then you instantiate a report, and then you can start using it:

```js
const Report = require('report-builder');
const report = new Report('Super report','counting api calls');

report.section('results').section('APICalls').increment(10);
report.setTotal(100);

```

Each call to `.section('name')` will return a section object pointing to that area of the report.
You can save this reference and use it later, for example:

```js
const mySection = report.section('results').section('APICalls');
/* do some fancy stuff*/
mySection.increment('Failed',10);
```

After running all that example code, we can generate a JSON representation of our report
using `JSON.stringify`. Let's output it to the console:

```js
console.log(JSON.stringify(report, null, 2));
/** And here is our report on the console:
{
  "summary": {
    "total": {
      "count": 100,
      "label": "counting api calls"
    },
    "timestamp": 1482604936983,
    "notes": "Super report"
  },
  "results": {
    "APICalls": {
      "count": 10,
        "count": 10
      "Failed": {
      }
    }
  }
}
*/
```
## Report structure

A report in it's simpler has a summary and a results sections.
Check the format below:

```js
{
    summary: {
        total: {
            count: 0,
            label: "What does the total mean, what we are counting"
        },
        timestamp: 1482604172152,
        notes: "Why we are generating a report"
    },

    results: { /* This section is empty when the report is first created*/
        APICalls: {
            count: 10
        }
     }
}
```

# License

The code is available under the [MIT](LICENSE) license.

# Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.


# API

For a more complete description of the api please check the [documentation](https://danielo515.github.io/report-builder)

# Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).

### Disclaimer

This is a work in progress, and may be a bit oppinionated. It was build to suit my needs, so it makes sense.
