import express, { Application } from 'express';

import base from './init';
import errorHandler from './error-handler';
import config from './config';
import Routing from './routing';
import start from './start';
import middleware from './middleware';

class App {
    public app: Application;

    constructor() {
        this.app = express();
    }

    public async init(): Promise<Application> {
        let server = this.app;

        /**
         * base
         * -------------------------------------------
         * This file contain all config need to setup before server is running
         * Connect to DB, and all basic init
         */
        server = await base(server);

        /**
         * config
         * -------------------------------------------
         * This file contain all config from env that will be distribute to template
         * Or, some config that come from database
         */
        server = await config(server);

        /**
         * middleware
         * -------------------------------------------
         * This file contain all config need to setup before server is running
         * Setup CSRF, and all we need to secure this server on the run
         */
        server = await middleware(server);

        /**
         * routing
         * -------------------------------------------
         * Setup routing for our applications
         */
        server = await this.routing(server);

        /**
         * error handler
         * -------------------------------------------
         * This file contain error handler config
         * We will notif developer whenever error occure on production mode
         * But on development we will only display on console log
         */
        server = await errorHandler(server);

        /**
         * start
         * -------------------------------------------
         * This file is to use handling start server
         */
        server = await start(server);

        return server;
    }

    private async routing(app: Application): Promise<Application> {
        /**
         * Routing
         * -------------------------------------------
         * This class contain routing for api or web
         */
        return await new Routing(app).init();
    }
}

export default new App();
