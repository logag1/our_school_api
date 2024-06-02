import { Request, Response, NextFunction, RequestHandler } from 'express';
import Logger from '../utils/logger.util';

const logger = new Logger('REQUEST_HANDLER');

export function asyncHandler(requestHandler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (e) {
      logger.error(e as any);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}