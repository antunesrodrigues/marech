// Required libs
const path = require('path');
const marechalUtil = require('../../lib/util');
const marechalCore = require('./marechal-core');


const marechalByData = (originalData, configs) => {
  // Keep original data and set it to another
  let finalData = originalData;

  // Go to each <Marech@...> tag
  const marechExp = /<Marech@([^(?!<)]*)>/gi;
  
  while(finalData.match(marechExp) !== null) {
    // By eslint, 'match' need be defined
    let match;
    while((match = marechExp.exec(finalData)) !== null) {
      // Normalize if user use break-line inside marech tag
      match[0] = match[0].replace(/(\n| {2,})/g, ' ');

      // Text before MarechTag definition
      const beforeTag = marechalUtil.matchFunctions.before(finalData, match);
      // Text after MarechTag definition
      const afterTag = marechalUtil.matchFunctions.after(finalData, match);
      
      // Get Teleg name
      const name = marechalUtil.nameOrProps('name', match[0]);
      
      // Get Properties definition
      const props = marechalUtil.nameOrProps('props', match[0]);      
      
      // Find teleg file from Marech@... definition
      const telegFile = marechalUtil.findTelegFile(name, configs);      
      
      // Read the teleg
      const originalMarechTeleg = marechalUtil.readFile(path.join(configs.telegs.path, telegFile));
      
      // Split to content and args
      const {marechTeleg, args} = marechalUtil.propFunctions(originalMarechTeleg, props);

      // MarechalCORE
      const mareched = marechalCore(marechTeleg, args);

      // Replace the <Marech@...> to imported teleg
      finalData = beforeTag + mareched + afterTag;
    }
  }

  // Convert multiples empty line-bracks to one only
  finalData = finalData.replace(/\n {3,}\n/g, '\n');

  // Return mareched
  return finalData;
};

module.exports = marechalByData;