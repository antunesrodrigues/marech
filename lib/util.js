const files = require('./utilities/file');
const folder = require('./utilities/folder');

const others = require('./utilities/others');

const merged = Object.assign({},
  files,
  folder,

  others,
);

module.exports = merged;