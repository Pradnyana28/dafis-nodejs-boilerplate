import { Response } from 'express';
import Logger, { ILogger } from './logger';

/**
 * Interface Responser
 * -----------------------------------------
 */
export interface IResponser {
    _render(view: string, data: any);
    _render(view: string, data: any, status: number);

    _ajax();
    _ajax(data: any, redirect: string, status: boolean);
}

/**
 * @method responser
 * ------------------------------------------
 * A response helper for express base Response
 * ------------------------------------------
 * @param res express response
 */
const responser = (res: Response): IResponser => {
    const logger: ILogger = new Logger();

    return {
        _ajax: (data?: any, redirect: string = global.config.app.redirect, status: boolean = true) => {
            return res.status(200).json({ success: status, messages: data, redirect });
        },
        _render: (view: string, data?: any, status: number = 200) => {
            return res.status(status).render(view, data, (err, html) => {
                if (err) logger.error('Failed while rendering html', err, __filename);
                res.send(html);
            });
        }
    };
}

export default responser;