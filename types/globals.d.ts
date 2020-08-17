export {};

import { IConstant } from '@utils/constant';

declare global {
    namespace NodeJS {
        interface Global {
            config: IConstant;
        }
    }

    namespace Express {
        interface Request {
            api: boolean;
            auth: any;
        }

        interface Response {
            _render(view: string, data: any);
            _render(view: string, data: any, status: number);

            _ajax();
            _ajax(data: any, redirect: string);
            _ajax(data: any, redirect: string, status: boolean);
        }
    }
}