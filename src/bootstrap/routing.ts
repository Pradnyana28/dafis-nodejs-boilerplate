import express, { Application, Request, Response, NextFunction } from 'express';
import routeCache from 'route-cache';
import chalk from 'chalk';
import path from 'path';
import csrf from 'csurf';
import passport from 'passport';
import compression from 'compression';
import connectFlash from 'connect-flash';

import web from '@routes/web';
import passportConfig from './passport';
import webRoute from '@routes/route';
import responser, { IResponser } from '@utils/responser';

class Routing {
    private app: Application;
    private cacheLimit: Number = 216000;
    private cache: any;

    constructor(app: Application) {
        this.cacheSwitch = this.cacheSwitch.bind(this);

        this.app = app;
        this.cache = routeCache.cacheSeconds(this.cacheLimit, this.cacheSwitch);
    }

    private cacheSwitch(req: Request): boolean | string {
        return this.app.get('env') == 'development' ? false : req.originalUrl;
    }

    public setup(app: Application): Application {
        passportConfig(passport);
        app.set('views', path.join(__dirname, '../resources/views'));
        app.set('view engine', 'pug');
        if (app.get('env') == 'production') {
            app.enable('view cache');
            console.log('%s View Cache is On', chalk.green('✓'));
        }
        app.use(connectFlash());
        app.use(compression());
        app.use(express.static('public', { maxAge: '36000' }));

        if (app.get('env') != 'testing') {
            app.use(csrf({ cookie: true }));
        }

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(async (req: Request, res: Response, next: NextFunction) => {
            if (app.get('env') != 'testing') {
                app.locals.csrfToken = req.csrfToken();
            }

            app.locals.isLoggedIn = req.isAuthenticated();
            app.locals.user = req.user;
            app.locals.router = {
                originalUrl: req.originalUrl,
                baseUrl: req.baseUrl,
                path: req.path
            };
            // renderer
            const response: IResponser = responser(res);
            res._render = response._render;
            res._ajax = response._ajax;
            next();
        });
        app.locals.route = webRoute;
        web(app, this.cache);
        // this.app = app;
        return app;
    }

    public init(): Application {
        let server = this.setup(this.app);

        return server;
    }
}

export default Routing;