// import express, { Request, Response, NextFunction } from 'express';
// import http from 'http';
// import Logger from './core/logger/logger';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import passport from 'passport';
// import cors from 'cors';
// import redisClient from 'redis';
// import path from 'path';
// import config from './config/index.js';
// import cookieParser from 'cookie-parser';

// process.on('uncaughtException', (e) => {
//     Logger.error(e);
// });


// export class Startup {

//     // Create a new express app instance
//     app: express.Application = express();


//     constructor() {
//         this.CreateServer();
//         this.SetMongoose();
//         this.SiteConfiguration();
//         this.ConfigRouter();
//     }
//     /**
//          Config Server 
//         **/
//     CreateServer() {

//         http.createServer(this.app).listen(config.serverConfig.port, () => {
//             console.log(`Server Run On Port ${config.serverConfig.port}`);
//         });
//         redisClient.Connet();
//     }
//     /**
//          Config Mongoose 
//          **/
//     SetMongoose() {
//         mongoose.Promise = global.Promise;
//         mongoose.connect(config.databaseConfig.url, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//         });
//     }
//     /**
//          Config Site Optional 
//          **/
//     SiteConfiguration() {
//         // require('./lib/passport');

//         this.app.use(cors());
//         this.app.use(bodyParser.json());
//         this.app.use(express.static(path.join(__dirname, "public")));
//         this.app.use(bodyParser.urlencoded({ extended: true }));
//         this.app.use(cookieParser("SchoolManagerSecretKey"));
//         // this.ConfigPassport();
//     }
//     /**
//      * Set Config Passport
//      */
//     ConfigPassport() {
//         this.app.use(passport.initialize());
//         this.app.use(passport.session());
//     }
//     /**
//      * Set Router
//      */
//     ConfigRouter() {
//         // this.app.use(require("./routes/index"));
//         // this.app.use((err, req, res, next) => {
//         //     if (err instanceof ApiError) {
//         //         ApiError.handle(err, res);
//         //     } else {
//         //         Logger.error(err);
//         //         return res.status(500).send(err.message);
//         //     }
//         // });
//     }
// }

// export default new Startup();