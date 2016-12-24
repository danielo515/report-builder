'use strict';
const Op = require('object-path');

/**
 * Helper method that actually creates 
 * the target if it does not exist 
 * using the default value.
 * Object-path.get with default option 
 * does not sets the default value on the target path.
 * @private 
 * @param {Object} o The object containing the path
 * @param {String|Array} path a path to the target property inside the object
 * @param {any} def The default value to be used if the target does not exist. 
 *                  This value will be saved at the provided path inside the provided object
 * @return {any} The value at the provided path.
 */
const getOrDefault = (o, path, def) => {

    if (!Op.get(o, path)) {
        Op.set(o, path, def);
    }
    return Op.get(o, path);
};


module.exports = getOrDefault;