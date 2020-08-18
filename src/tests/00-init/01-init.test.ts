import 'module-alias/register';

import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';

dotenv.config();

// override env for testing purpose
process.env.NODE_ENV = 'testing';

/**
 * APP_PORT
 * 
 * Specify the app port
 */
process.env.APP_PORT = '5000';

/**
 * MAIL
 * 
 * Configure email credentials
 */
process.env.MAIL_HOST = 'smtp.mailtrap.io';
process.env.MAIL_PORT = '2525';
process.env.MAIL_SECURE = 'false';
process.env.MAIL_USERNAME = '';
process.env.MAIL_PASSWORD = '';
process.env.MAIL_FROM = '';

// setup test middleware
chai.use(chaiHttp);