import path from 'path';
import sendError from '../../final-user/error/send-error';
import verifyFile from './verify-file';
import readFile from './read-file';

// Require file
const requireFile = (file: string, json: boolean = false, message?: string) => {
  if (!verifyFile(file)) {
    const errorMessage = message || `File not found: ${path.parse(file).base}`;
    sendError(errorMessage);
  }
  const fileContent = readFile(file);
  const parsed = json ? JSON.parse(fileContent) : fileContent;
  return parsed;
};

export default requireFile;
