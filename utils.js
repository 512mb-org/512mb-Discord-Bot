const internalPath = require('path');

/**
*@param {string} item File Location.
**/

module.exports = {
    path: (item) => internalPath.join(__dirname, item)
};