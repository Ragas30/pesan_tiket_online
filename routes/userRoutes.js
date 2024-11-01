import express from 'express';
import { getUserById, getUsers } from '../controllers/authController.js';

const routes = express.Router();

routes.get('/:id', getUserById);
routes.get('/', getUsers);

export default routes;