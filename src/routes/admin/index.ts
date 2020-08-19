import { Router, Response, Application } from 'express';

import authRoute from '@routes/admin/auth';

export default (app: Application, cache: any) => {
    const router = Router();
    router.get('/', (_, res: Response) => res.redirect(global.config.app.admin_prefix + '/auth/signin'));
    // Admin auth
    router.use('/auth', authRoute);

    return router;
};