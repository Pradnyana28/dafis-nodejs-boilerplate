import { Router, Response } from 'express';
import authRoute from '@routes/admin/auth';

const router = Router();
router.get('/', (_, res: Response) => res.redirect(global.config.app.admin_prefix + '/auth/signin'));
// Admin auth
router.use('/auth', authRoute);

export default router;