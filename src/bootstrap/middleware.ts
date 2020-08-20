import express, { Application, Request, Response, NextFunction } from "express";
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from 'morgan';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import i18n, { ConfigurationOptions } from 'i18n';
import path from 'path';

export const i18nConfig: ConfigurationOptions = {
    locales: ['en', 'id'],
    directory: path.join(__dirname, '../resources/lang'),
    objectNotation: true,
    updateFiles: false,
    defaultLocale: 'en',
    logWarnFn: function (msg) {
        console.log('[i18n WARNING]', msg);
    },
    api: {
        '__': '__'
    }
};

export default (app: Application): Application => {
    /**
     * Connect Mongo
     * -------------------------------------------
     * Connect our system sesion to the mongo db
     */
    const MongoStore = connectMongo(session);

    /**
     * i18n
     * -------------------------------------------
     * Handle the page language with i18n
     */
    i18n.configure(i18nConfig);

    // Don't display the logger on testing mode
    if (app.get('env') != 'testing') {
        app.use(logger('dev'));
    }

    /**
     * Body Formatting
     * -------------------------------------------
     * Convert the body data to json format
     */
    app.use(express.json());

    /**
     * Cookie Parser
     * -------------------------------------------
     * Use cookie parser package to handle our session
     */
    app.use(cookieParser());

    /**
     * Body Parser
     * -------------------------------------------
     * Use body parser package to handle url encoded
     */
    app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * Helmet
     * -------------------------------------------
     * Handle the request header to secure our app
     * and validate the content security policy
     */
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: global.config.app.directives
    }));

    /**
     * HPP
     */
    app.use(hpp());

    /**
     * Session
     * -------------------------------------------
     * Use mongo to store our app session
     */
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.APP_KEY,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1209600000
        },
        store: new MongoStore({
            url: app.get('dburi'),
            autoReconnect: true,
            collection: 'sessions'
        })
    }));

    /**
     * i18n
     * -------------------------------------------
     * Init the i18n localization
     */
    app.use(i18n.init);

    /**
     * Last touch
     * -------------------------------------------
     * Customize the response header as desired
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Requested-With');
        res.header('Strict-Transport-Security', '7776000000');
        res.header('X-Frame-Options', 'SAMEORIGIN');
        res.header('X-XSS-Protection', '0');
        res.header('X-Content-Type-Options', 'nosniff');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
        if (req.headers['accept'].split(',').indexOf('application/json') >= 0) {
            req.api = true;
        }
        next();
    });

    return app;
}