import mongoose, { Mongoose } from 'mongoose';

/**
 * Connect
 * 
 * A utility to help us connecting to mongo database
 */

export default async (): Promise<Mongoose> => {
    try {
        const dburi = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}&readPreference=primary&appname=${process.env.APP_NAME}&ssl=false`;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
        return await mongoose.connect(dburi, { useUnifiedTopology: true });
    } catch (err) {
        throw new Error(err);
    }
}