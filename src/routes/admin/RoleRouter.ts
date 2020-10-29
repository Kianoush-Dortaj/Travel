import express from 'express';
import roleController from './../../http/controller/RoleController';
import validation from './../../http/validations/Role';
import atuhrization from './../../http/middlwares/Authrization';

const router = express.Router();

router.post('/create', atuhrization.AuthToken, validation.Create(), roleController.CreateRole)

router.put('/update', atuhrization.AuthToken, validation.Update(), roleController.SetRole)

router.delete('/Delete/:id', atuhrization.AuthToken, validation.Delete(), roleController.DeleteRole)

router.get('/GetAll/Select', atuhrization.AuthToken, roleController.GetAllRole)

router.get('/GetAll/Paging', atuhrization.AuthToken, roleController.GetAllRolePaging)

router.get('/GetById/:id', atuhrization.AuthToken, roleController.GetByIdRole)

router.get('/GetById/:id', atuhrization.AuthToken, roleController.GetByIdRole)

router.get('/RolePermission/:id', atuhrization.AuthToken, roleController.GetAllPermissionByRoleId)

// router.get('/RolePermissionById/:id', roleController.get)



export default router;