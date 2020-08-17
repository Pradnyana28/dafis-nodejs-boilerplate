import chalk from 'chalk';

/**
 * Interface Logger
 * 
 * -------------------------------------------
 * Describe the logger object
 * -------------------------------------------
 */
export interface ILogger {
    info(txt: string, data: any, filename: string): void,
    warning(txt: string, data: any, filename: string): void,
    error(txt: string, data: any, filename: string): void
}

/**
 * Class Logger
 * 
 * -------------------------------------------
 * Make an internal log system to display it
 * into the system console
 * -------------------------------------------
 */
class Logger implements ILogger {

    /**
     * @method getFilename
     * ----------------------------------------------------
     * Get the file name path
     * ----------------------------------------------------
     * @param filename the file name that used by method
     */
    private getFilename(filename): string {
        let _filename: string = filename || "";
        if (_filename.length > 30) {
            _filename = _filename.substr((_filename.length - 30), _filename.length);
            _filename = __filename.length > 0 ? `...${_filename}` : '';
        }
        return _filename;
    }

    /**
     * @method log
     * ----------------------------------------------------
     * Write the information to the console window
     * ----------------------------------------------------
     * @param type the notification colour type
     * @param txt the log description
     * @param data the data passed and display it to the console
     * @param filename the method file name that used to invoke this class
     * @param trace set to true to show the specific information with console.trace
     */
    private log(type: string, txt: string, data: any, filename: string, trace: boolean = false): void {
        if (process.env.NODE_ENV == 'test') return;

        const _filename = this.getFilename(filename);
        trace ?
            console.trace('%s %s %s', type, chalk.cyanBright(_filename), txt) :
            console.log('%s %s %s', type, chalk.cyanBright(_filename), txt);
        if (data) {
            switch (typeof data) {
                case 'object':
                    data && Object.keys(data).length > 30 ? console.log(chalk.redBright('Data passed is too long.')) : console.log('Data passed with %s: %o', typeof data, data);
                    break;
                default:
                    console.log('Data passed with %s: %o', typeof data, data);
                    break;
            }
        }
    }

    /**
     * @method info
     * ----------------------------------------------------
     * Display the info colour type to the console window
     * ----------------------------------------------------
     * @param txt the log description
     * @param data the data passed and display it to the console
     * @param filename the method file name that used to invoke this class
     */
    public info(txt: string, data: any, filename: string): void {
        return this.log(chalk.cyan('INFO'), txt, data, filename);
    }

    /**
     * @method warning
     * ----------------------------------------------------
     * Display the warning colour type to the console window
     * ----------------------------------------------------
     * @param txt the log description
     * @param data the data passed and display it to the console
     * @param filename the method file name that used to invoke this class
     */
    public warning(txt: string, data: any, filename: string): void {
        return this.log(chalk.yellow('WARNING'), txt, data, filename);
    }

    /**
     * @method error
     * ----------------------------------------------------
     * Display the danger colour type to the console window
     * ----------------------------------------------------
     * @param txt the log description
     * @param data the data passed and display it to the console
     * @param filename the method file name that used to invoke this class
     */
    public error(txt: string, data: any, filename: string): void {
        return this.log(chalk.red('ERROR'), txt, data, filename, true);
    }
}

export default Logger;