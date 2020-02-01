import * as Express from 'express';
import { login } from './auth_controller';

const Router = Express.Router();

Router.route('/login').post(login);

export default Router;