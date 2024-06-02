import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger.util';

const logger = new Logger('IP');

export const logIpInfo = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Connect ip / ${req.ip}`);
  next();
}