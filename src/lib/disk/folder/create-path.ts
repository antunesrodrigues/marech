import fs from 'fs';
import verifyPath from './verify-path';

// Create folder
const createPath = (location: string) => {
  if (!verifyPath(location)) {
    fs.mkdirSync(location);
  }
  return true;
};

export default createPath;
