import * as dotenv from 'dotenv';
import App from './app';
import Logger from './utils/logger.util';

dotenv.config();

import boardRouter from './routers/board';
import kakaoAuthRouter from './routers/oauth';

const logger = new Logger('MAIN');

const app = new App(Number(process.env.PORT!), boardRouter, kakaoAuthRouter);

app.listen((port: number) => {
  logger.info(`Started server in port ${port}`);
});