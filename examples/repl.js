const Report = require('../src');

const report = new Report('Super report','counting api calls');

report.section('results').section('APICalls').increment(10);
report.setTotal(100);

const mySection = report.section('results').section('APICalls');
/* do some fancy stuff*/
mySection.increment('Failed',10);

console.log(JSON.stringify(report, null, 2));

module.exports.report = report;
module.exports.Report = Report;
