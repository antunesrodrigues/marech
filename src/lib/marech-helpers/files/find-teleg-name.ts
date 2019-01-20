import { ConfigsInterface } from './../interfaces/configs-interface';

const findTelegFile:Function = (telegName:string, configs:ConfigsInterface) => {
  let file = '';
  if (configs.telegs.filesByTelegName) {
    file = `${telegName}.html`;
  }

  if (configs.telegs.files) {
    configs.telegs.files.forEach((fl:{ id: string, file: string }) => {
      if (fl.id === telegName) {
        ({ file } = fl);
      }
    });
  }

  return file;
};

export default findTelegFile;
