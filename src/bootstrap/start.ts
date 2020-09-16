import { Application } from 'express';
import chalk from 'chalk';

/**
 * Start our app
 * -------------------------------------------
 * @param app express application
 */
const start = (app: Application) => {
    app.listen(app.get('port'), () => {
        if (app.get('env') != 'testing') {
            console.log(
                '%s %s Serve at http://localhost:%d in %s mode',
                chalk.green('✓'),
                chalk.blueBright('INIT'),
                app.get('port'),
                chalk.greenBright(app.get('env'))
            );
        }
    });

    return app;
};

export default start;
