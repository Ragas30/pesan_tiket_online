import express from 'express';
import { login, register } from '../controllers/authController.js';
const routes = express.Router();

routes.post('/login', login);
routes.post('/register', register);

export default routes;