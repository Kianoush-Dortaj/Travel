import express from 'express';
import controller from './../../http/controller/TravelResidenceController';
import validation from './../../http/validations/TravelResidence';
import atuhrization from './../../http/middlwares/Authrization';


const router = express.Router();

router.post('/create', atuhrization.AuthToken, validation.Create(), controller.CreateTravelResidence)

router.put('/update', atuhrization.AuthToken, validation.Update(), controller.SetTravelResidence)

router.delete('/Delete/:id', atuhrization.AuthToken, validation.Delete(), controller.DeleteTravelResidence)

router.get('/GetAll/Paging', atuhrization.AuthToken, controller.GetAllTravelResidencePaging)

router.get('/GetAll/Select', atuhrization.AuthToken, controller.GetAllTravelResidenceSelect)

router.get('/GetById/:id', atuhrization.AuthToken, controller.GetByIdTravelResidence)


export default router;