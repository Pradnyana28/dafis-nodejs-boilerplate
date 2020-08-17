import { check } from 'express-validator';

/**
 * @validators signin
 * -------------------------------------------
 * Validate the signin request
 * -------------------------------------------
 * @param username make sure username is not empty
 * @param password make sure password is not empty
 */
export default () => [
    check('username', 'validation.required').notEmpty(),
    check('password', 'validation.required').notEmpty()
];