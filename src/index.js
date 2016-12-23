'use strict';
const Op = require('object-path');

const getOrDefault = (o, path, def) => {

    if (!Op.get(o, path)) {
        Op.set(o, path, def);
    }
    return Op.get(o, path);
};

class Report {

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

    section(name) {

        return new Section(getOrDefault(this.report, name, {}), this.report);
    }

    setTotal(value) {

        this.report.summary.total.count = value;
    }

    calcPercentOf(path, totalRef) {

        if (typeof totalRef !== 'string') {
            totalRef = 'summary.total.count'; // default reference is on summary
        } else {
            totalRef = ['results', totalRef, 'count'].join('.'); // any other ref is under results namespace
        }
        if (typeof path !== 'string' || !Op.get(this.report.results, path) || isNaN(Op.get(this.report, totalRef))) {
            return this;
        }
        const count = Op.get(this.report, ['results', path, 'count'].join('.'));
        const total = Op.get(this.report, totalRef);
        const percent = (count * 100) / total;
        Op.set(this.report.results, path + '.percent', percent);
        return this;
    }

    toJSON() {

        return this.report;
    }
}

class Section {

    constructor(store, reportTree) {

        this.tree = reportTree;
        this.store = store;
    }

    toJSON(){

        return this.tree;
    }

    summary(){

        return new Section(this.tree.summary, this.tree);        
    }

    section(name) {

        return new Section(getOrDefault(this.store, name, {}), this.tree);
    }

    calcPercent( totalRef ){

        if(typeof this.store.count !== 'number'){
            return this;
        }
        const count = this.store.count;
        const total = typeof totalRef !== 'string' 
                    ? this.tree.summary.total.count
                    : Op.get(this.tree, totalRef);
        this.store.percent = (count * 100) / total;
        return this;
    }

    set(path, value) {

        if (!path || !value) {
            return this;
        }
        Op.set(this.store, path, value);
        return this;
    }

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
