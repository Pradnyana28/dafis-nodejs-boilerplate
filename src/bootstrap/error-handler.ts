import {
    Application,
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from 'express';
import errorLib from 'errorhandler';

/**
 * Error Handler
 * -------------------------------------------
 * Handle the error that invoked by next(err) method
 * We still display the error log on development mode
 * -------------------------------------------
 * @param app express application
 */
const errorHandler = (app: Application): Application => {
    // handle 404 page
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404);
        req.api
            ? res.json({ success: false, message: 'Module not found' })
            : res.render('frontend/errors/404', {
                  pageTitle:
                      res.__('page_not_found') +
                      ' | ' +
                      global.config.app.title,
                  errors: {
                      code: 404,
                      title: res.__('page_not_found'),
                      description: res.__('page_not_found_information'),
                  },
              });
    });

    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'testing'
    ) {
        // handle error
        app.use(errorLib());
    } else {
        // error handler for api
        app.use(
            (
                err: ErrorRequestHandler,
                req: Request,
                res: Response,
                next: NextFunction
            ) => {
                res.status(500);
                req.api
                    ? res.json({
                          success: false,
                          message: 'Something went wrong!',
                      })
                    : res.render('frontend/errors/500', {
                          pageTitle:
                              res.__('internal_server_error') +
                              ' | ' +
                              global.config.app.title,
                          errors: {
                              code: 500,
                              title: res.__('internal_server_error'),
                              description: res.__(
                                  'internal_server_error_information'
                              ),
                          },
                      });
            }
        );
    }

    return app;
};

export default errorHandler;
