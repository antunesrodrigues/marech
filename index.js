// Required libraries
const glob = require('glob');
const fs = require('fs');

// MarechalFiles
const marechConfig = require('./test/marech-config.js');

console.log(__dirname);
// Get all files matched by input
glob(marechConfig.input, {ignore: `${marechConfig.telegs.path}/**/*.html`}, (err, files) => {
  
  // Go to each input file
  files.forEach((file) => {
    // Read file content
    const originalData = fs.readFileSync(file, 'utf-8');
    
    // Keep original data and set it to another
    let finalData = originalData;
    
    // Go to each <Marech@...> tag
    const marechExp = /<Marech@(.*)>/gi;
    // By eslint, 'match' need be defined
    let match;
    while((match = marechExp.exec(finalData)) != null) {
      // Text before MarechTag definition
      const beforeTag = finalData.slice(0, match.index);
      // Text after MarechTag definition
      const afterTag = finalData.slice(match.index + match[0].length);
      
      // Marech teleg name (+ properties)
      const nameAndProps = match[0].match(/(?:<Marech@)(.*)(?=>)/i)[1];
      
      // Teleg name
      const name = nameAndProps.split(' ')[0];
      // Properties definition
      const props = nameAndProps.slice(name.length + 1).trim();

      // Convert props to JS Object
      let args = {};
      if(props.length) {
        let argsStr = props;
        
        // Split each (propertie?)
        const argsReg = (/(?:^|[ ])([a-z]+)=("|')/gi);
        
        // By eslint, 'match2' need be defined
        let match2;
        let firstProp = true;
        while((match2 = argsReg.exec(argsStr)) != null) {
          // Get text before propertie definition
          const beforeProp = match2.input.slice(0, match2.index);
          argsStr = beforeProp;
          
          // Add ', ' if aren't first arg
          if(!firstProp) {
            argsStr += ', ';
          } else {
            firstProp = false;
          }
          
          // Replace '=' to ':'
          const replaced = match2[0].replace('=', ':');

          // Add change to argsStr
          argsStr += replaced;
          
          // Get text after propertie definition
          const afterProp =  match2.input.slice(match2.index + match2[0].length);
          argsStr += afterProp;
        }
        // Convert to JS Object
        args = Function(`'use strict'; return({${argsStr}})`)();
      }

      let telegFile;
      if(marechConfig.telegs.filesByTelegName) {
        telegFile = `${name}.html`;
      } else {
        marechConfig.telegs.files.forEach((fl) => {
          if(fl.id == name) {
            telegFile = fl.file;
            return true;
          }
        });
      }
      
      const marechTeleg = fs.readFileSync(`${marechConfig.telegs.path}/${telegFile}`, 'utf-8');
      const marechTelegWithoutMarechTag = marechTeleg.replace(/<Marech(.*)>/i, '').trimLeft();
      
      finalData = beforeTag + marechTelegWithoutMarechTag + afterTag;
      
      for (let i in args) {
        finalData = finalData.replace(new RegExp(`{${i}}`, 'g'), args[i]);
      }
    }
    const finalFile = file.slice(file.indexOf('/'));

    fs.writeFileSync(`${marechConfig.output}${finalFile}`, finalData);

  });
});
