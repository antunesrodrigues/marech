import sendError from '../../final-user/error/send-error';
import verifyPath from './verify-path';

// Verify if exists path
const existsPath = (location: string, message: string = 'Path don\'t found') => {
  if (!verifyPath(location)) {
    sendError(message);
  }
  return true;
};

export default existsPath;
