import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import UserSchema from '@models/User/User.Schema';
import BaseModel from '@models/BaseModel';

class User extends BaseModel {
    public model: Model<any>;

    public redirectWhenRegister: string = '/message/register-success';

    constructor() {
        super();
        this.model = UserSchema;
    }

    public generatePassword(password: string): string {
        return bcrypt.hashSync(password, process.env.SYSTEM_SALT);
    }
}

export default new User();