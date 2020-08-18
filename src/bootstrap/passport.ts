import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel from '@models/User';
import IUser from '@models/User/IUser';

const verifyCallback = async (username: string, password: string, done: CallableFunction): Promise<void> => {
    try {
        const user: IUser = await UserModel.findOne({ $or: [{username: username}, {email: username}] });
        if (user) {
            const isValid = user.verifyPassword(password);
            if (isValid) return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}

const passport = (passport: PassportStatic): void => {
    passport.serializeUser<any, any>((user: IUser, done: CallableFunction) => {
        done(null, user._id);
    });
    passport.deserializeUser<any, any>(async (id, done: CallableFunction) => {
        try {
            const user = await UserModel.findOne({ _id: id });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    passport.use(new LocalStrategy(verifyCallback));;
}

export default passport;