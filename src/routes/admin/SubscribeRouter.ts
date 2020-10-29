import express from 'express';
import controller from '../../http/controller/SubscribeController';
import validation from '../../http/validations/Subscribe';
import atuhrization from './../../http/middlwares/Authrization';

const router = express.Router();

router.post('/create',atuhrization.AuthToken, validation.Create(), controller.CreateSubscribe)

router.put('/update',atuhrization.AuthToken, validation.Update(), controller.SetSubscribe)

router.delete('/Delete/:id',atuhrization.AuthToken, validation.Delete(), controller.DeleteSubscribe)

router.get('/GetAll/Paging',atuhrization.AuthToken, controller.GetAllSubscribePaging)

router.get('/GetAll/Select',atuhrization.AuthToken, controller.GetAllSubscribeSelect)

router.get('/GetById/:id',atuhrization.AuthToken, controller.GetByIdSubscribe)


export default router;