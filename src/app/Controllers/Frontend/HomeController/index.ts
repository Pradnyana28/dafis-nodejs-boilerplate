import { Request, Response, NextFunction } from 'express';

import Controller from '@controllers/Controller';

class HomeController extends Controller {
    constructor() {
        super();
    }

    /**
     * Home Page
     * ------------------------------------------
     * Display the home page view to the template manager
     * ------------------------------------------
     * @param req express Request
     * @param res express Response
     * @param next express NextFunction
     */
    public Index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        return res._render.html('index', {
            pageTitle: this.pageTitle(res.__('home')),
            pageMeta: {
                title: "Dafis Node.js Boilerplate",
                description: "Welcome to Dafis open source project. This project will help you to boost up your timeline by ignoring the boilerplate phase.",
                keyword: "open source, dafis boilerplate, typescript boilerplate, nodejs boilerplate"
            }
        });
    }

    /**
     * SignIn
     * --------------------------------------------
     * Display the signin page
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public SignIn = (req: Request, res: Response, next: NextFunction): void => {
        return res._render.html('frontend/signin', {
            pageTitle: this.pageTitle(res.__('auth.signin')),
            pageMeta: {}
        });
    }

    /**
     * Register
     * --------------------------------------------
     * Display the register page
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public Register = (req: Request, res: Response, next: NextFunction): void => {
        return res._render.html('frontend/register', {
            pageTitle: this.pageTitle(res.__('auth.register')),
            pageMeta: {}
        });
    }

    /**
     * Forgot Password
     * --------------------------------------------
     * Display the forgot password page
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public ForgotPassword = (req: Request, res: Response, next: NextFunction): void => {
        return res._render.html('frontend/forgot', {
            pageTitle: this.pageTitle(res.__('auth.forgot_password')),
            pageMeta: {}
        });
    }

    /**
     * Flash Message
     * --------------------------------------------
     * Display the flash page
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public FlashMessage = (req: Request, res: Response, next: NextFunction): void => {
        const paramAction = req.params.action.replace(/-/g, '_');
        const options: any = {};
        if (req.params.action == 'register-success' || req.params.action == 'forgot-password-success') {
            options.emailAddress = req.query.email;
        }

        return res._render.html('frontend/flash', {
            pageTitle: this.pageTitle(res.__(`flash.${paramAction}.title`)),
            pageMeta: {
                robots: "noindex,nofollow"
            },
            flash: {
                title: res.__(`flash.${paramAction}.title`),
                description: res.__(`flash.${paramAction}.description`, options),
                image: res.__(`flash.${paramAction}.image`)
            }
        });
    }
}

export default new HomeController();