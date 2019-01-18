const disk = require('./disk/all');
const finalUser = require('./final-user/all');
const marechHelpers = require('./marech-helpers/all');


// const merged = Object.assign({},
//   disk,
//   finalUser,
//   marechHelpers,
// );
module.exports = {
  disk,
  finalUser,
  marechHelpers,
};