// Required libs
import path from 'path';

import lib from '../../lib';
import marechalCore from './marechal-core';
import { ConfigsInterface } from './../../lib/marech-helpers/interfaces/configs-interface';

const marechalByData = (originalData:string, configs:ConfigsInterface) => {
  // Keep original data and set it to another
  let finalData = originalData;

  // Go to each <Marech@...> tag
  const marechExp = lib.padroes.regExp.marechTag;

  while (finalData.match(marechExp)) {
    let match;
    while ((match = marechExp.exec(finalData))) {
      // Normalize if user use break-line inside marech tag
      match[0] = match[0].replace(/(\r|\t|\n| {2,})/g, ' ');

      // Text before MarechTag definition
      const beforeTag = lib.marechHelpers.beforeAndAfterMatch.before(finalData, match);
      // Before tag + tag
      const beforeAndTag = beforeTag + match[0];
      // Text after MarechTag definition
      const afterTag = lib.marechHelpers.beforeAndAfterMatch.after(finalData, match);

      // Get Teleg name
      const name = lib.marechHelpers.nameOrProps('name', match[0]);
      // Get Properties definition
      const props = lib.marechHelpers.nameOrProps('props', match[0]);
      // Pre-props (marech UX)
      const preProps = lib.marechHelpers.uxMarech(match[0], beforeAndTag);

      // Find teleg file from Marech@... definition
      const telegFile = lib.marechHelpers.findTelegName(name, configs);
      // Read the teleg
      const telegPath = path.join(configs.telegs.path, telegFile);
      const originalMarechTeleg = lib.disk.file.readFile(telegPath);

      // Split to content and args
      const splitedItens = lib.marechHelpers.execObj(originalMarechTeleg, props, preProps);
      const { marechTeleg, args, defaultTelegArgs } = splitedItens;

      // MarechalCORE
      const mareched = marechalCore(marechTeleg, args, defaultTelegArgs);

      // Replace the <Marech@...> to imported teleg
      finalData = beforeTag + mareched + afterTag;
    }
  }

  // Convert multiples empty break lines to one only
  finalData = finalData.replace(/\n {3,}\n/g, '\n');

  // Return mareched
  return finalData;
};

export default marechalByData;
