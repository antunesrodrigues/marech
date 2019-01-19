const disk = require('./disk/all');
const finalUser = require('./final-user/all');
const functions = require('./functions/all');
const marechHelpers = require('./marech-helpers/all');
const regExp = require('./regexp/all');

// const merged = Object.assign({},
//   disk,
//   finalUser,
//   marechHelpers,
// );
module.exports = {
  disk,
  finalUser,
  functions,
  marechHelpers,
  regExp,
};
