import { check } from 'express-validator';
import UserModel from '@app/Models/User';
import IUser from '@app/Models/User/IUser';

/**
 * @validators forgotPassword
 * -------------------------------------------
 * Validate the forgot password request
 * -------------------------------------------
 * @param email validate email address, is exist ? valid.
 */
export default () => [
    check('email', 'validation.required').notEmpty().bail().normalizeEmail().isEmail().bail()
        .custom(async (value, { req }) => {
            try {
                const user: IUser = await UserModel.findOne({ email: value });
                if (!user || user == null) {
                    throw new Error('validation.email_not_registered');
                }
                req.user = user;
                return true;
            } catch (err) {
                throw new Error(err);
            }
        })
];