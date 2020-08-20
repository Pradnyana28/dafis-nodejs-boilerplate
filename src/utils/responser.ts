import { Response } from 'express';
import Logger, { ILogger } from './logger';

/**
 * Interface Responser
 * -----------------------------------------
 */
export interface IResponser {
    _render(view: string, data?: any, status?: number);
    _ajax(data?: any, redirect?: string, statusCode?: number);
    _json(data: any, statusCode?: number);
}

/**
 * @class Responser
 * ------------------------------------------
 * A response helper for express base Response
 * ------------------------------------------
 * @param res express response
 */
class Responser implements IResponser {
    private success = true;
    private expressResponse: Response = null;
    private logger: ILogger = new Logger();
    private errors: string[] = [];

    constructor(res: Response) {
        this.expressResponse = res;
    }

    public isSuccess(): this {
        this.success = true;
        return this;
    }

    public isFail(): this {
        this.success = false;
        return this;
    }

    public setErrors(errors: string[]): this {
        this.errors = errors;
        return this;
    }

    public _ajax(data?: any, redirect: string = global.config.app.redirect, statusCode: number = 200): Response {
        return this.expressResponse
            .status(statusCode)
            .json({
                success: this.success,
                messages: data,
                redirect
            });
    }

    public _render(view: string, data?: any, statusCode: number = 200): void {
        return this.expressResponse
            .status(statusCode)
            .render(view, data,
                (err, html) => {
                    if (err) this.logger.error('Failed while rendering html', err, __filename);
                    this.expressResponse.send(html);
                }
            );
    }

    public _json(message: string, data: any = null, statusCode: number = 200): Response {
        return this.expressResponse
            .status(statusCode)
            .json({
                status: {
                    success: this.success,
                    code: statusCode,
                    message: message
                },
                errors: this.errors,
                data
            });
    }
}

export default Responser;