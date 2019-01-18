const findTelegFile = (telegName, configs) => {
  if(configs.telegs.filesByTelegName) {
    return `${telegName}.html`;
  } else {
    configs.telegs.files.forEach((fl) => {
      if(fl.id == telegName) {
        return fl.file;
      }
    });
  }
};

module.exports = findTelegFile;