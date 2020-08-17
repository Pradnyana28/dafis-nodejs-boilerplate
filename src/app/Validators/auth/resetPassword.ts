import { check } from 'express-validator';
import UserModel from '@app/Models/User';
import IUser from '@app/Models/User/IUser';

/**
 * @validators resetPassword
 * -------------------------------------------
 * Validate the reset password request
 * -------------------------------------------
 * @param userId make sure userId is not empty and exist in our system
 * @param password make sure password is not empty and followed our requirement
 */
export default () => [
    check('userId', 'validation.required').notEmpty().bail()
        .custom(async (value, { req }) => {
            try {
                const user: IUser = await UserModel.findOne({ _id: value, 'options.resetPassword': req.params.key });
                if (!user || user == null) {
                    throw new Error('validation.reset_password_invalid');
                }
                return true;
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('password').optional()
        .custom((value) => {
            if (value && value.length <= 8) {
                throw new Error('validation.password_minimum');
            }
            return true;
        })
];