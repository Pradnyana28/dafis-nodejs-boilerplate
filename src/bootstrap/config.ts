import { Application } from 'express';
import chalk from 'chalk';

import defaultConfig from '@utils/constant';

const config = (app: Application): Application => {
    const appConfig = defaultConfig(process.env);

    // Send .env config to template file
    app.locals.app = appConfig.app;
    global.config = appConfig;

    // Get config from database
    if (app.get('env') != 'testing') {
        console.log('%s %s Configs are fetched', chalk.green('✓'), chalk.blueBright('INIT'));
    }

    return app;
}

export default config;