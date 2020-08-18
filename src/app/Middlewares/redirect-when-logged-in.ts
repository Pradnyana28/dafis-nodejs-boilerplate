import { Request, Response, NextFunction } from 'express';
import webRoute from '@routes/route';

/**
 * @middleware Redirect When Logged In
 * -------------------------------------------
 * Redirect user to another route when logged in
 * In this case to home page
 */
export default (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return res.redirect(webRoute.home);
    }
    next();
}