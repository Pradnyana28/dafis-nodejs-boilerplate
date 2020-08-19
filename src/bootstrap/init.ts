import { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chalk from 'chalk';

export default async (app: Application): Promise<Application> => {
    if (process.env.NODE_ENV != 'testing') {
        dotenv.config();
    }
    // global variable
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_NAME}&readPreference=primary&appname=${process.env.APP_NAME}&ssl=false`;
    // setup variable
    app.set('dburi', DB_URI);
    app.set('dbName', process.env.DB_NAME);
    app.set('host', '0.0.0.0');
    app.set('env', process.env.NODE_ENV || 'production');
    app.set('port', process.env.APP_PORT || 8080);

    try {
        // setup mongoose
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
        await mongoose.connect(app.get('dburi'));
        if (app.get('env') != 'testing') {
            console.log('%s %s Connected to DB: %s', chalk.green('✓'), chalk.blueBright('INIT'), process.env.DB_NAME);
        }
    } catch (err) {
        console.error(err);
        console.log('%s %s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'), chalk.redBright('ERROR'));
        process.exit();
    }

    return app;
}