import BaseCotnroller from './BaseController';
import RoleRepository from './../../database/respository/Role/Role';
import RolePermissionRepository from './../../database/respository/RolePermission/RolePermissionRepository';


export default new class RoleController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Create Role ****/
    async CreateRole(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            RoleRepository.CreateRole(req.body)
                .then(() => {
                    return this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** Set Role ****/
    async SetRole(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            RoleRepository.SetRole(req.body)
                .then(() => {
                    this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** Delete Role ****/
    async DeleteRole(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            RoleRepository.DeleteRole(req.params.id)
                .then(() => {
                    this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** GetAll Role ****/
    async GetAllRole(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            RoleRepository.GetAllRole()
                .then((data) => {
                    this.OkObjectResult(res, data);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** GetAll Role Paging ****/
    async GetAllRolePaging(req, res, next) {

        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            await RoleRepository.GetAllRolePaging()
                .then((data) => {
                    this.OkObjectResultPager(res, {
                        count: data.count,
                        data: data.result
                    });
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** GetById Role ****/
    async GetByIdRole(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            RoleRepository.GetByIdRole(req.params.id)
                .then((data) => {
                    return this.OkObjectResult(res, data);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }

    /*** Get All Permission ById Role ****/
    async GetAllPermissionByRoleId(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            RolePermissionRepository.GetAllPermissonsByRoleId(req.params.id)
                .then((data) => {
                    return this.OkObjectResult(res, data);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }



}