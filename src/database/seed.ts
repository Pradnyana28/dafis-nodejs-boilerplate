import 'module-alias/register';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// import UserSeed from './UserSeed';

class Seeder {
    private db_uri: string;

    constructor() {
        dotenv.config();
        // this.mongo = mongoDB.MongoClient;
        this.db_uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}&readPreference=primary&appname=${process.env.APP_NAME}&ssl=false`;
    }

    public async seed() {
        try {
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useUnifiedTopology', true);
            await mongoose.connect(this.db_uri, { useUnifiedTopology: true });

            /**
             * Seed the data to database
             */
            // await UserSeed();

            mongoose.disconnect();
        } catch (err) {
            console.trace(err);
        }
    }

}

export default new Seeder().seed();