import fs from 'fs';
import path from 'path';

// Verify path, if not exists, create.
const verifyPath = (location: string) => {
  const finalPath = path.normalize(location);
  const exists = fs.existsSync(finalPath);
  return exists;
};

export default verifyPath;
