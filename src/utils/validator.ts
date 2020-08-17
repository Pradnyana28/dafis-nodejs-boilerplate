import { Request, Response, NextFunction } from 'express';
import { validationResult, Result } from 'express-validator';
import Logger from './logger';

/**
 * @method getErrors
 * ----------------------------------------
 * A helper to get express-validator error result
 * ----------------------------------------
 * @param errorData express validator result
 * @param req express Request
 * @param res express Response
 */
const getErrors = (errorData: Result, req: Request, res: Response) => {
    return errorData.array().map(e => ({
        [e.param]: res.__(e.msg.replace('Error: ', ''), {
            param: e.param,
            field: res.__(`input.${e.param}`),
            value: req.body[e.param]
        })
    }));
}

/**
 * @method validator
 * -----------------------------------------
 * A validator helper for express-validator package
 * -----------------------------------------
 * @param req express Request
 * @param res express Response
 */
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const logger = new Logger();
        const errorData: Result = validationResult(req);

        if (errorData.isEmpty()) {
            return next();
        }

        const errors = getErrors(errorData, req, res);
        if (req.api || req.headers['accept'].split(',').indexOf('text/javascript') >= 0) {
            return res.status(200).json({ success: false, messages: errors });
        }

        logger.warning('The request is invalid', errors, __filename);
        return res.status(433).render('frontend/errors/433', {
            errors: {
                code: 433,
                title: res.__('invalid_request'),
                description: res.__('invalid_request_information'),
                ...errors
            }
        });
    } catch (err) {
        next(err);
    }
}