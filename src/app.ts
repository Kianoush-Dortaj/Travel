import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import Logger from './core/logger/logger';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import session from "express-session";
import redisManager from './utilitie/Redis/RedisRepository';
import configuration from './config/index';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import { ApiError } from './core/api/ApiError';
const MongoStore = require("connect-mongo")(session);

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

export class App {

  app: express.Application = express();

  constructor() {
    this.CreateServer();
    this.SetMongoose();
    this.SiteConfiguration();
    this.ConfigRouter();
  }
  /**
       Config Server 
      **/
  CreateServer() {
    http.createServer(this.app).listen(configuration.serverConfig.port, () => {
      console.log(`Server Run On Port ${configuration.serverConfig.port}`);
    });
    redisManager.Connet();
  }
  /**
       Config Mongoose 
       **/
  SetMongoose() {
    mongoose.Promise = global.Promise;
    mongoose.connect(configuration.databaseConfig.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }
  /**
       Config Site Optional 
       **/
  SiteConfiguration() {

    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: "SchoolManagerSecretKey",
        resave: true,
        saveUninitialized: true,
        cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 6) },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
      })
    );
    this.app.use(cookieParser("SchoolManagerSecretKey"));
    require('./lib/passport');
    this.ConfigPassport();
  }
  /**
   * Set Config Passport
   */
  ConfigPassport() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  /**
   * Set Router
   */
  ConfigRouter() {
    this.app.use(router);
    this.app.use((err, req, res, next) => {
      if (err instanceof ApiError) {
        ApiError.handle(err, res);
      } else {
        Logger.error(err);
        return res.status(500).send(err.message);
      }
    });
  }

}

export default new App();


