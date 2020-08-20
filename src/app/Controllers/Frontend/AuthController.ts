import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import Controller from '@controllers/Controller';
import UserModel from '@models/User';
import webRoute from '@routes/route';
import RegisterConfirmationMail from '@app/Mails/Auth/RegisterConfirmationMail';
import IUser from '@app/Models/User/IUser';
import ForgotPasswordMail from '@app/Mails/Auth/ForgotPasswordMail';
import RegisterCompleteMail from '@app/Mails/Auth/RegisterCompleteMail';

export interface AuthRequest extends Request {
    user: IUser
}

class AuthController extends Controller {
    constructor() {
        super();
    }

    /**
     * SignIn
     * --------------------------------------------
     * Handle SignIn ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public SignIn = (req: Request, res: Response, next: NextFunction): void => {
        passport.authenticate('local', (err, user) => {
            if (err || !user) {
                return res._render.isFail().ajax([{
                    username: res.__('validation.credentials_invalid')
                }], null);
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res._render.ajax({}, webRoute.user.profile.replace(':username', user.username));
            });
        })(req, res, next);
    }

    /**
     * Register
     * --------------------------------------------
     * Handle the register ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public Register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: IUser = await UserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.email,
                password: UserModel.generatePassword(req.body.password)
            });
            // send user email confirmation
            new RegisterConfirmationMail(user).send();

            return res._render.ajax(null, UserModel.redirectWhenRegister + '?email=' + req.body.email);
        } catch (err) {
            this.logger.error('Failed insert user', err, __filename);
            return res._render.isFail().ajax(null, null);
        }
    }

    /**
     * Confirmation
     * --------------------------------------------
     * Handle the confirmation ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public Confirmation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let flashAction: string = 'verification-failed';
            const { key } = req.params;
            const user: IUser = await UserModel.findOne({ 'options.confirmation': key, emailVerified: false });
            if (user) {
                const options: Map<any, any> = user.options;
                options.delete('confirmation');
                const updated: IUser = await UserModel.updateOne({ _id: user._id }, { emailVerified: true, options });
                await new RegisterCompleteMail(updated).send();
                flashAction = 'verification-success';
            }
            return res.redirect(webRoute.flashMessage.replace(':action', flashAction))
        } catch (err) {
            next(err);
        }
    }

    /**
     * Forgot Password
     * --------------------------------------------
     * Handle the forgot password ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public ForgotPassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            await new ForgotPasswordMail(req.user).send();
            return res._render.ajax(null, webRoute.flashMessage.replace(':action', 'forgot-password-success') + '?email=' + req.body.email);
        } catch (err) {
            this.logger.error('Failed while sending reset password mail', err, __filename);
            next(err);
        }
    }

    /**
     * Reset Password
     * --------------------------------------------
     * Handle the reset password ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public ResetPassword = (req: AuthRequest, res: Response, next: NextFunction): void => {
        return res._render.html('frontend/resetPassword', {
            userId: req.params.userId,
            key: req.params.key,
            pageTitle: this.pageTitle(res.__('auth.create_new_password')),
            pageMeta: {
                title: res.__('auth.create_new_password'),
                description: res.__('auth.create_new_password_subtitle'),
                robots: 'noindex,nofollow'
            }
        });
    }

    /**
     * Update Password
     * --------------------------------------------
     * Handle the udpate password ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public UpdatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: IUser = await UserModel.findOne({ _id: req.params.userId });
            if (user) {
                const newPassword = UserModel.generatePassword(req.body.password);
                const options: Map<any, any> = user.options;
                options.delete('resetPassword');
                await UserModel.updateOne({ _id: req.params.userId }, { password: newPassword, options });
                return res._render.ajax(null, webRoute.flashMessage.replace(':action', 'reset-password-success'));
            }
            return res._render.isFail().ajax([{ password: res.__('validation.reset_password_invalid') }], null);
        } catch (err) {
            this.logger.error('Failed while updating user password', err, __filename);
            next(err);
        }
    }

    /**
     * Logout
     * --------------------------------------------
     * Handle the logout ajax request
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public Logout = (req: Request, res: Response, next: NextFunction): void => {
        req.logout();
        res.redirect(webRoute.signin);
    }
}

export default new AuthController();