import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CloverMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const mId = (req.headers.merchantid as string) || '';
    const key = (req.headers.authorization as string) || '';
    // You can perform additional validation or manipulation of the mId header here if needed

    // Make the mId value available in all routes by attaching it to the request object
    req['mId'] = mId;
    req['key'] = key;

    next();
  }
}
