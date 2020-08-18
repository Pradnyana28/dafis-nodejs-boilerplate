import { Router, Application } from 'express';
import route from '@routes/route';

import HomeController from '@app/Controllers/Frontend/HomeController';
import validate from '@utils/validator';
import * as validation from '@app/Validators';
import { redirectLoggedUser, isAuthenticated } from '@app/Middlewares';
import AuthController from '@app/Controllers/Frontend/AuthController';

/**
 * @method FrontEndRoute
 * -------------------------------------------
 * Initiate your front end web route here
 * -------------------------------------------
 * @param _ app
 * @param cache cache module
 */
export default (_: Application, cache: any) => {
  // init router
  const router = Router();
  // GET
  router.get(route.home, cache, HomeController.Index);
  router.get(route.signin, redirectLoggedUser, cache, HomeController.SignIn);
  router.get(route.register, redirectLoggedUser, cache, HomeController.Register);
  router.get(route.forgot, redirectLoggedUser, cache, HomeController.ForgotPassword);
  router.get(route.flashMessage, validation.flashMessage(), validate, cache, HomeController.FlashMessage);
  router.get(route.logout, isAuthenticated, AuthController.Logout);
  router.get(route.confirmation, AuthController.Confirmation);
  router.get(route.resetPassword, validation.resetPassword(), validate, AuthController.ResetPassword);
  // POST
  router.post(route.signin, validation.signin(), validate, AuthController.SignIn);
  router.post(route.register, validation.register(), validate, AuthController.Register);
  router.post(route.forgot, validation.forgotPassword(), validate, AuthController.ForgotPassword);
  router.post(route.resetPassword, validation.resetPassword(), validate, AuthController.UpdatePassword);

  // export router
  return router;
}