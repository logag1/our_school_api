import express, { Application, Router } from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

export default class App {
  private readonly _port: number;
  private readonly _app: Application;

  constructor(
    port: number,
    boardRouter: Router,
    kakaoAuthRouter: Router
  ) {
    this._port = port;
    this._app = express();
    this._setMiddleWares();
    this._mountRouter(boardRouter, kakaoAuthRouter);
    this._setErrorHandlers();
    this._connectMongoDB();
  }

  public listen(callback: (port: number) => void): void {
    this._app.listen(this._port, () => callback(this._port));
  }

  private _setErrorHandlers(): void {
    this._app.use(async (req, res, next) => {
      res.status(404).json({ status: 404, message: 'Not found' });
    });
  }

  private _setMiddleWares(): void {
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(express.static(path.join(__dirname, '..', '..', 'our_school/build')));
    this._app.use(cookieParser());
  }

  private _connectMongoDB(): void {
    mongoose
      .connect(process.env.MONGODB_URL!)
      .then(() => console.log('Connected to Database'));
  }

  private _mountRouter(board: Router, kakaoAuth: Router): void {
    this._app.use('/api', board);
    this._app.use('/oauth', kakaoAuth);
    this._app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', 'our_school/build/index.html'));
      console.log(req.ip);
    });
  }
}