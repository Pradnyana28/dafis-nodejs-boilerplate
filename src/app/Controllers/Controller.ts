import Logger, { ILogger } from '@utils/logger';

class Controller {
    public logger: ILogger;

    constructor() {
        this.logger = new Logger();
    }

    protected pageTitle(title: string): string {
        return title +' | '+ global.config.app.title;
    }
}

export default Controller;