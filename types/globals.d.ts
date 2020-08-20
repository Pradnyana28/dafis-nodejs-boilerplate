export { };

import { IConstant } from '@utils/constant';
import { IResponser } from '@utils/responser';

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
            _render: IResponser;
        }
    }
}