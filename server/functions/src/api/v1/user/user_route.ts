import * as Express from 'express';
import { createUser, getAllUsers, getUser, sendToDatabase, sendToFirebase } from './user_controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const Router = Express.Router();

Router.route('/signup').post(createUser);
Router.route('/users/current').get(isAuthenticated, getUser);
Router.route('/allUsers').get(isAuthenticated, getAllUsers);
Router.route('/sendToDatabase/:id').post(isAuthenticated, sendToDatabase);
Router.route('/sendToFirebase/:id/:email').post(isAuthenticated, sendToFirebase);

export default Router;