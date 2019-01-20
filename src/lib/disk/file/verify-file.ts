import fs from 'fs';
import path from 'path';

// Verify if file exists
const verifyFile = (file: string) => {
  const fileName = path.normalize(file);
  const exists = fs.existsSync(fileName);
  if (!exists) {
    return false;
  }
  return true;
};

export default verifyFile;
