import fs from 'fs';

// Create file
const createFile = (file: string, data: any) => {
  let content = data;
  // Verify if is object
  if (Object.prototype.toString.call(data) === '[object Object]') {
    content = JSON.stringify(data, null, '  ');
  }
  content = content.toString();
  fs.writeFileSync(file, content);
};

export default createFile;
