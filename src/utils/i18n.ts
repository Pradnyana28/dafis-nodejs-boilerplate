import i18n, { ConfigurationOptions } from 'i18n';
import path from 'path';

export const i18nConfig: ConfigurationOptions = {
    locales: ['en', 'id'],
    directory: path.join(__dirname, '../resources/lang'),
    objectNotation: true,
    updateFiles: false,
    defaultLocale: 'en',
    logWarnFn: function(msg) {
        console.log('[i18n WARNING]', msg);
    },
    api: {
        __: '__',
    },
};

/**
 * i18n
 * -------------------------------------------
 * Handle the page language with i18n
 */
i18n.configure(i18nConfig);

export default i18n;
