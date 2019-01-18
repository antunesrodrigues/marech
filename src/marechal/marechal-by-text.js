// Required libs
const path = require('path');
const util = require('../../lib/all');
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
      const beforeTag = util.marechHelpers.execObj.before(finalData, match);
      // Before tag + tag
      const beforeAndTag  = beforeTag + match[0];
      // Text after MarechTag definition
      const afterTag = util.marechHelpers.execObj.after(finalData, match);
      
      
      // Get Teleg name
      const name = util.marechHelpers.nameOrProps('name', match[0]);
      // Get Properties definition
      const props = util.marechHelpers.nameOrProps('props', match[0]);
      // Pre-props (marech UX)
      const preProps = util.marechHelpers.uxMarech(match[0], beforeAndTag);


      // Find teleg file from Marech@... definition
      const telegFile = util.marechHelpers.findTelegName(name, configs);      
      // Read the teleg
      const originalMarechTeleg = util.disk.file.readFile(path.join(configs.telegs.path, telegFile));


      // Split to content and args
      const {marechTeleg, args} = util.marechHelpers.execObj(originalMarechTeleg, props, preProps);


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