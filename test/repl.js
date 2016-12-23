const Report = require('../src');

module.exports = new Report('Super report','total nabos');

module.exports.section('results').increment(10);
module.exports.setTotal(100);
