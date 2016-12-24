# Report Builder

A simple tool for helping your programs generate complex JSON documents.
It provides a nice developer experience providing simple but powerful chainable methods.

# Report structure

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

# Basic usage example

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
      "Failed": {
        "count": 10
      }
    }
  }
}
*/
```

# API 

For a more complete description of the api please check the [documentation](danielo515.github.io/report-builder)

# Disclaimer
This is a work in progress, and may be a bit oppinionated. It was build to suit my needs, so it makes sense.