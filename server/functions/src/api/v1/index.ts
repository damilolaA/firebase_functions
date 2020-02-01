import { Router } from 'express';
import UserRoute from './user/user_route';
import AuthRoute from './authentication/auth_route';

const api = Router();

api.use('/api/v1', UserRoute);
api.use('/api/v1', AuthRoute);

export default api;