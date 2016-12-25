'use strict';

const Report = require('../src/index');

describe('Report', () => {
  it('Create a report', () => {
    expect(new Report('Pene', 'num of nabos')).toBeInstanceOf(Report);
  });
});
