'use strict';

const Op = require('object-path');
const getOrDefault = require('./utils');

/**
 * Represents the report that we are generating
 *
*/
class Report {

  /**
   * Creates an instance of Report.
   *
   * @param {string} notes
   * @param {string} totalLabel
   * @param {any} [timestamp=Date.now()]
   *
   */
  constructor(notes, totalLabel, timestamp = Date.now()) {

    this.report = {
      summary: {
        total: {
          count: 0,
          label: totalLabel
        },
        timestamp,
        notes
      },
      results: {}
    };
  }

  /**
   *
   *
   * @param {string} name
   * @returns a new {@link Section} under that name
   *
   */
  section(name) {

    return new Section(getOrDefault(this.report, name, {}), this.report);
  }

  /**
   *
   *
   * @param {any} value
   *
   */
  setTotal(value) {

    this.report.summary.total.count = value;
  }

  /**
   *
   *
   * @param {string} path
   * @param {string} totalRef
   * @returns this
   *
   */
  calcPercentOf(path, totalRef) {

    if (typeof totalRef !== 'string') {
      totalRef = 'summary.total.count'; // default reference is inside summary
    } else {
      totalRef = ['results', totalRef, 'count'].join('.'); // any other ref is under results namespace
    }
    if (typeof path !== 'string' || !Op.get(this.report.results, path) || isNaN(Op.get(this.report, totalRef))) {
      return this;
    }
    const count = Op.get(this.report, ['results', path, 'count'].join('.'));
    const total = Op.get(this.report, totalRef);
    const percent = (count * 100) / total;
    Op.set(this.report.results, `${path}.percent`, percent);
    return this;
  }

  /**
   *
   *
   * @returns internal report
   *
   */
  toJSON() {

    return this.report;
  }
}

/**
 * Class that represents a section of the main report.
 * **You should not try to instantiate it directly**.
 */
class Section {

  /**
   * Creates an instance of Section.
   * This constructor should only be called by the {@link Report} class
   *
   * @param {any} store
   * @param {any} reportTree
   *
   */
  constructor(store, reportTree) {

    this.tree = reportTree;
    this.store = store;
  }

  /**
   *  Returns the object that should be serialized
   *  as a JSON representation of the report
   * @returns internal report
   * @public
   */
  toJSON() {

    return this.tree;
  }


  /**
   * Legacy method from v1.0.0 Will be removed soon
   * @deprecated Legacy method from v1.0.0 Will be removed soon
   * @returns new Section under name
   *
   */
  subSection() {
    return this.section(...arguments);
  }

  /**
   *
   *
   * @param {string} name
   * @returns new Section under name
   *
   */
  section(name) {

    return new Section(getOrDefault(this.store, name, {}), this.tree);
  }

  /**
   *
   *
   * @returns summary Section
   *
   */
  summary() {

    return new Section(this.tree.summary, this.tree);
  }


  /**
   *
   *
   * @param {string} totalRef
   * @returns this
   *
   */
  calcPercent(totalRef) {

    if (typeof this.store.count !== 'number') {
      return this;
    }
    const count = this.store.count;
    const total = typeof totalRef !== 'string'
      ? this.tree.summary.total.count
      : Op.get(this.tree, totalRef);
    this.store.percent = (count * 100) / total;
    return this;
  }

  /**
   *
   *
   * @param {string} path
   * @param {any} value
   * @returns this
   *
   */
  set(path, value) {

    if (!path || !value) {
      return this;
    }
    Op.set(this.store, path, value);
    return this;
  }

  /**
   *
   *
   * @param {string} path
   * @param {number} [value=1]
   * @returns this
   *
   */
  increment(path, value = 1) {

    if (typeof path === 'number') {
      value = path;
      path = 'count';
    } else {
      path = (typeof path === 'string')
        ? path.split('.')
        : [];
      path.push('count');
    }
    const currVal = Op.get(this.store, path, 0);
    Op.set(this.store, path, currVal + value);
    return this;
  }
}

module.exports = Report;
