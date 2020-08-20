import { Response } from 'express';
import Logger, { ILogger } from './logger';

/**
 * Interface Responser
 * -----------------------------------------
 */
export interface IResponser {
    isSuccess();
    isFail();
    setErrors(errors: string[]);

    ajax(data?: any, redirect?: string, statusCode?: number);
    html(view: string, data?: any, status?: number);
    json(data: any, statusCode?: number);
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
    private errors: string[] = null;

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

    public ajax(data?: any, redirect: string = global.config.app.redirect, statusCode: number = 200): Response {
        return this.expressResponse
            .status(statusCode)
            .json({
                success: this.success,
                messages: data,
                redirect
            });
    }

    public html(view: string, data?: any, statusCode: number = 200): void {
        return this.expressResponse
            .status(statusCode)
            .render(view, data,
                (err, html) => {
                    if (err) this.logger.error('Failed while rendering html', err, __filename);
                    this.expressResponse.send(html);
                }
            );
    }

    public json(message: string, data: any = null, statusCode: number = 200): Response {
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