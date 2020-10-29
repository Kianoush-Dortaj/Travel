import express from 'express';
import controller from './../../http/controller/CategoryController';
import validation from './../../http/validations/Category';
import atuhrization from './../../http/middlwares/Authrization';

const router = express.Router();

router.post('/create',atuhrization.AuthToken, validation.Create(), controller.CreateCategory)

router.put('/update',atuhrization.AuthToken, validation.Update(), controller.SetCategory)

router.delete('/Delete/:id',atuhrization.AuthToken, validation.Delete(), controller.DeleteCategory)

router.get('/GetAll/Paging',atuhrization.AuthToken, controller.GetAllCategoryPaging)

router.get('/GetAll/Select',atuhrization.AuthToken, controller.GetAllCategorySelect)

router.get('/GetById/:id',atuhrization.AuthToken, controller.GetByIdCategory)


export default router;