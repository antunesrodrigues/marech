const findTelegFile = (telegName, configs) => {
  let file = '';
  if (configs.telegs.filesByTelegName) {
    file = `${telegName}.html`;
  }

  if (configs.telegs.file) {
    configs.telegs.files.forEach((fl) => {
      if (fl.id === telegName) {
        ({ file } = fl);
      }
    });
  }

  return file;
};

module.exports = findTelegFile;
