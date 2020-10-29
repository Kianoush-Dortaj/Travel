import express from 'express';
import controller from './../../http/controller/TravelTypeController';
import validation from './../../http/validations/TravelType';
import atuhrization from './../../http/middlwares/Authrization';


const router = express.Router();

router.post('/create',atuhrization.AuthToken, validation.Create(), controller.CreateTravelType)

router.put('/update',atuhrization.AuthToken, validation.Update(), controller.SetTravelType)

router.delete('/Delete/:id',atuhrization.AuthToken, validation.Delete(), controller.DeleteTravelType)

router.get('/GetAll/Paging',atuhrization.AuthToken, controller.GetAllTravelTypePaging)

router.get('/GetAll/Select',atuhrization.AuthToken, controller.GetAllTravelTypeSelect)

router.get('/GetById/:id',atuhrization.AuthToken, controller.GetByIdTravelType)


export default router;