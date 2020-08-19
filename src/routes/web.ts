import { Application } from 'express';

import adminRoute from '@routes/admin';
import frontRoute from '@routes/front';

/**
 * @param app is an express application
 * @param cache is optional parameter to cache a route
 */
export default (app: Application, cache): void => {
    // Admin route start with admin prefix
    app.use(global.config.app.admin_prefix, adminRoute(app, cache));
    // Front route start with /
    app.use(frontRoute(app, cache));
}