import express from 'express';
import loginController from './../../http/controller/LoginController';
import validation from './../../http/validations/Role';

const router = express.Router();

router.post('/login', loginController.Login)


export default router;