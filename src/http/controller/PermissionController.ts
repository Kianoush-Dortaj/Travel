import BaseCotnroller from './BaseController';
import PermissionRepository from './../../database/respository/Permission/PermissionRrepository';

export default new class PermissionController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Create Permission ****/
    async CreatePermission(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            PermissionRepository.CreatePermission(req.body)
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
    /*** Set Permission ****/
    async SetPermission(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            PermissionRepository.SetPermission(req.body)
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
    /*** Delete Permission ****/
    async DeletePermission(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            PermissionRepository.DeletePermission(req.params.id)
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
    /*** GetAll Permission ****/
    async GetAllPermission(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            PermissionRepository.GetAllPermission()
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
    /*** GetById Permission ****/
    async GetByIdPermission(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            PermissionRepository.GetByIdPermission(req.params.id)
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

}