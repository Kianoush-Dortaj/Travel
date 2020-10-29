import express from 'express';
import controller from '../../http/controller/DiscountController';
import validation from '../../http/validations/Discount';
import atuhrization from './../../http/middlwares/Authrization';

const router = express.Router();

router.post('/create',atuhrization.AuthToken, validation.Create(), controller.CreateDiscount)

router.put('/update',atuhrization.AuthToken, validation.Update(), controller.SetDiscount)

router.delete('/Delete/:id',atuhrization.AuthToken, validation.Delete(), controller.DeleteDiscount)

router.get('/GetAll/Paging',atuhrization.AuthToken, controller.GetAllDiscountPaging)

router.get('/GetAll/Select',atuhrization.AuthToken, controller.GetAllDiscountSelect)

router.get('/GetById/:id',atuhrization.AuthToken, controller.GetByIdDiscount)


export default router;