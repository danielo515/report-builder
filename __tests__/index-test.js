'use strict';

const Report = require('../src/index');

describe('Report', () => {

  describe('Basic report creation', () => {

    it('Create a report instance', () => {
      expect(new Report('testing newest API', 'Number of API calls')).toBeInstanceOf(Report);
    });
    it('Returns a Section instance', () => {
      expect(new Report('testing newest API', 'Number of API calls').section('results')).toBeInstanceOf(Report.Section);
    });
    it('Sets the total within summary', () => {

      const now = Date.now();

      expect(new Report('testing newest API', 'Number of API calls').setTotal(100).toJSON())
        .toEqual({
          summary: {
            total: {
              count: 100,
              label: 'Number of API calls'
            },
            notes: 'testing newest API',
            timestamp: now,
          },
          results: {}
        });
    });
  });

  describe('Report specific methods', () => {

    it('Calculates percent using default path', () => {
      const now = Date.now();
      const report = new Report('testing newest API', 'Number of API calls').setTotal(100);
      report.section('results.externalAPICalls').increment(10);
      report.calcPercentOf('externalAPICalls');

      const expected = {
        summary: {
          total: {
            count: 100,
            label: 'Number of API calls'
          },
          notes: 'testing newest API',
          timestamp: now,
        },
        results: {
          externalAPICalls: { count: 10, percent: 10 }
        }
      };

      expect(report.toJSON()).toEqual(expected);
    });


    it('Calculates percent using an specific path', () => {

      const now = Date.now();
      const report = new Report('testing newest API', 'Number of API calls').setTotal(100);
      report.section('results.externalAPICalls').increment(10)
        .increment('Failed', 5);
      report.calcPercentOf('externalAPICalls.Failed', 'externalAPICalls');

      const expected = {
        summary: {
          total: {
            count: 100,
            label: 'Number of API calls'
          },
          notes: 'testing newest API',
          timestamp: now,
        },
        results: {
          externalAPICalls: {
            count: 10,
            Failed: {
              count: 5,
              percent: 50
            }
          }
        }
      };

      expect(report.toJSON()).toEqual(expected);
    });
  });

  describe('Normal report usage', () => {
    it('Verify basic internal report structure', () => {

      const now = Date.now();

      expect(new Report('testing newest API', 'Number of API calls', now).toJSON())
        .toEqual({
          summary: {
            total: {
              count: 0,
              label: 'Number of API calls'
            },
            notes: 'testing newest API',
            timestamp: now,
          },
          results: {}
        });
    });

    it('Verify section increment within existing section', () => {

      const now = Date.now();

      expect(
        new Report('testing newest API', 'Number of API calls', now)
          .section('results')
          .increment('Errors', 10)
          .toJSON()
      )
        .toEqual({
          summary: {
            total: {
              count: 0,
              label: 'Number of API calls'
            },
            notes: 'testing newest API',
            timestamp: now,
          },
          results: {
            Errors: { count: 10 }
          }
        });
    });
    it('Verify section creation in internal report', () => {

      const now = Date.now();

      expect(
        new Report('testing newest API', 'Number of API calls', now)
          .section('externalSection')
          .increment('Errors', 10)
          .toJSON()
      )
        .toEqual({
          summary: {
            total: {
              count: 0,
              label: 'Number of API calls'
            },
            notes: 'testing newest API',
            timestamp: now,
          },
          results: {},
          externalSection: {
            Errors: { count: 10 }
          }
        });
    });
    it('Create a section using set', () => {

      const now = Date.now();

      expect(
        new Report('testing newest API', 'Number of API calls', now)
          .section('urls')
          .set('google', 'www.google.es')
          .toJSON()
      )
        .toEqual({
          summary: {
            total: {
              count: 0,
              label: 'Number of API calls'
            },
            notes: 'testing newest API',
            timestamp: now,
          },
          results: {},
          urls: {
            google: 'www.google.es'
          }
        });
    });
  });
});
