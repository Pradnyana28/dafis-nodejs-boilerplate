import { check } from 'express-validator';

/**
 * @validators flashMessage
 * -------------------------------------------
 * Check if the flash action param is listed in config
 */
export default () => [
    check('action').exists().isIn(global.config.flashActions)
];