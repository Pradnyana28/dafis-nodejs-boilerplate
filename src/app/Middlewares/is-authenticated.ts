import { Request, Response, NextFunction } from 'express';
import route from '@routes/route';

/**
 * @middleware isAuthenticated
 * -------------------------------------------
 * Check if the user is already authenticated
 * If not, redirect user to the login page
 */
export default (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(301).redirect(route.signin);
}