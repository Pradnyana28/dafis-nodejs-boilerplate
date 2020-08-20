import express, { Application, Request, Response, NextFunction } from 'express';
import routeCache from 'route-cache';
import chalk from 'chalk';
import path from 'path';
import csrf from 'csurf';
import passport from 'passport';
import compression from 'compression';
import connectFlash from 'connect-flash';

import web from '@routes/web';
import api from '@routes/api';
import passportConfig from './passport';
import webRoute from '@routes/route';
import Responser, { IResponser } from '@utils/responser';

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

    private accessForAPIOnly(req: Request, res: Response, next: NextFunction): void {
        if (!req.api) {
            return res.render('frontend/errors/404', {
                pageTitle: res.__('page_not_found') + ' | ' + global.config.app.title,
                errors: {
                    code: 404,
                    title: res.__('page_not_found'),
                    description: res.__('page_not_found_information')
                }
            })
        }

        return next();
    }

    public async api(app: Application): Promise<Application> {
        /**
         * Invoice api routes
         * ---------------------------
         * Initialize all api route here,
         * Redirect to 404 if no api request detected
         */
        app.use(global.config.app.api_prefix, this.accessForAPIOnly, api(app, this.cache));

        return app;
    }

    public async web(app: Application): Promise<Application> {
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
            next();
        });
        app.locals.route = webRoute;

        /**
         * Invoice web routes
         * ---------------------------
         * Initialize all web route here
         */
        app.use(web(app, this.cache));

        return app;
    }

    public async init(): Promise<Application> {
        let app = this.app;

        app.use((req: Request, res: Response, next: NextFunction) => {
            // register custom render
            res._render = new Responser(res);
            next();
        });

        app = await this.api(app);
        app = await this.web(app);

        return app;
    }
}

export default Routing;