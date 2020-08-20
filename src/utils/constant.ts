import webRoute from "@routes/route";

/**
 * Interface Constant
 * 
 * ---------------------------------------------
 * Describe the method objects
 * ---------------------------------------------
 */
export interface IConstant {
    app: { admin_prefix, api_prefix, title, logo, redirect, url, social: { facebook, twitter, instagram }, directives },
    flashActions: string[],
    mail: { host, port, secure, username, password, from }
}

/**
 * Constant
 * 
 * ----------------------------------------------
 * Store your app default configuration here
 * Use env param to get the value from .env file
 * ----------------------------------------------
 * 
 * @param env 
 */

const constant = (env: any = {}): IConstant => ({
    // app default setting
    app: {
        admin_prefix: env.ADMIN_PREFIX || "/apanel",
        api_prefix: env.API_PREFIX || "/api/v1",
        title: env.APP_NAME || "Dafis Node.js Boilerplate",
        logo: "",
        redirect: webRoute.home,
        url: env.MAIN_URL || 'http://localhost:5000',

        // social network url
        social: {
            facebook: "",
            twitter: "",
            instagram: ""
        },

        // Content Security Policy: allowed domain to access by browser
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            styleSrc: ["'self'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "https://via.placeholder.com", "http://lorempixel.com"]
        }
    },

    // allowed flash action for route param
    flashActions: [
        'verification-success',
        'verification-failed',
        'register-success',
        'forgot-password-success',
        'reset-password-success'
    ],

    // mail information
    mail: {
        host: env.MAIL_HOST || 'smtp.mailtrap.io',
        port: env.MAIL_PORT || 2525,
        secure: env.MAIL_SECURE == 'false' ? false : true,
        username: env.MAIL_USERNAME || '',
        password: env.MAIL_PASSWORD || '',
        from: (env.APP_NAME || 'Node Typescript Boilerplate') + ' <' + env.MAIL_FROM || '' + '>'
    }
});

export default constant;