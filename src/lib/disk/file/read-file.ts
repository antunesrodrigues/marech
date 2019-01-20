import fs from 'fs';
import sendError from '../../final-user/error/send-error';
import verifyFile from './verify-file';

const readFile = (file: string) => {
  // Verify if file exists
  if (verifyFile(file)) {
    return fs.readFileSync(file, 'utf-8');
  }
  sendError(`File not found: ${file}`);
  return '';
};

// Read file
export default readFile;
