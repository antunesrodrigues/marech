const files = require('./utilities/file');
const folder = require('./utilities/folder');

const others = require('./utilities/others');
const teleg = require('./utilities/teleg');

const merged = Object.assign({},
  files,
  teleg,

  folder,

  others,
);

module.exports = merged;