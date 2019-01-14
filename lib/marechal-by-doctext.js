// Required libs
const path = require('path');

// MarechalLibs
const marechalUtil = require('./util');
const marechalCore = require('./marechal-core');

function marechalByData(originalData, configs) {
  // Keep original data and set it to another
  let finalData = originalData;
  // Go to each <Marech@...> tag
  const marechExp = /<Marech@(.*)>/gi;
  // By eslint, 'match' need be defined
  let match;
  while((match = marechExp.exec(finalData)) != null) {
    // Text before MarechTag definition
    const beforeTag = marechalUtil.match.before(finalData, match);
    // Text after MarechTag definition
    const afterTag = marechalUtil.match.after(finalData, match);
    

    // Teleg name
    const name = marechalUtil.nameOrProps('name', match[0]);
    
    // Properties definition
    const props = marechalUtil.nameOrProps('props', match[0]);

    const args = marechalUtil.attrToObj(props);

    let telegFile;
    if(configs.telegs.filesByTelegName) {
      telegFile = `${name}.html`;
    } else {
      configs.telegs.files.forEach((fl) => {
        if(fl.id == name) {
          telegFile = fl.file;
          return true;
        }
      });
    }

    const marechTeleg = marechalUtil.readFile(path.join(configs.telegs.path, telegFile));
    const mareched = marechalCore(marechTeleg, args);

    finalData = beforeTag + mareched + afterTag;
  }
  return finalData;
}

module.exports = marechalByData;