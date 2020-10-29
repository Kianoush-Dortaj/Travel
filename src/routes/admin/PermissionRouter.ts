import express from 'express';
import permission from './../../http/controller/PermissionController';
import validation from './../../http/validations/Permission';
import atuhrization from './../../http/middlwares/Authrization';

const router = express.Router();

router.post('/create',atuhrization.AuthToken, validation.Create(), permission.CreatePermission)

router.put('/update',atuhrization.AuthToken, validation.Update(), permission.SetPermission)

router.delete('/Delete/:id',atuhrization.AuthToken, validation.Delete(), permission.DeletePermission)

router.get('/GetAll',atuhrization.AuthToken, permission.GetAllPermission)

router.get('/GetById/:id',atuhrization.AuthToken, permission.GetByIdPermission)


export default router;