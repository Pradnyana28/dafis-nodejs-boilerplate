import { check } from 'express-validator';
import UserModel from '@app/Models/User';
import IUser from '@app/Models/User/IUser';

// email regex
// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

/**
 * @validators register
 * -------------------------------------------
 * Validate the register request
 * -------------------------------------------
 * @param firstName make sure firstName is not empty
 * @param lastName make sure lastName is not empty
 * @param email make sure email is not empty and not registered before
 * @param password make sure the password is followed our requirement
 */
export default () => [
    check('firstName', 'validation.required').notEmpty().bail(),
    check('lastName', 'validation.required').notEmpty().bail(),
    check('email', 'validation.required').notEmpty().bail().normalizeEmail().isEmail().bail()
        .custom(async (value) => {
            try {
                const user: IUser = await UserModel.findOne({ email: value });
                if (user) {
                    throw new Error('validation.email_already_registered');
                }
                return true;
            } catch (err) {
                throw new Error(err);
            }
        }),
    check('password', 'validation.required').notEmpty().bail().custom((value) => {
        if (value.length <= 8) {
            throw new Error('validation.password_minimum');
        }
        return true;
    })
];