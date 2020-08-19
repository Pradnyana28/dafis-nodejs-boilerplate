import { Router, Application } from 'express';

/**
 * @param app is an express application
 * @param cache is optional parameter to cache a route
 */
export default (app: Application, cache: any): Router => {
    const router = Router();

    router.get('/', (req, res) => {
        res.json({ hi: 'im api' })
    });

    return router;
}