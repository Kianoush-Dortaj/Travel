import BaseCotnroller from './BaseController';
import RolePermissionRepository from './../../database/respository/RolePermission/RolePermissionRepository';

export default new class RoleController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Set Role Permission ****/
    // async SetRolePermission(req, res, next) {
    //     let validationData = await this.ValidationAction(req, res);
    //     if (!validationData.haveError) {
    //         RolePermissionRepository.SetPermissionsForRole(req.body)
    //             .then(() => {
    //                 this.Ok(res);
    //             })
    //             .catch((error) => {
    //                 return this.BadRerquest(res, error);
    //             });
    //     } else {
    //         return this.BadRerquest(res, validationData.errorMessage);
    //     }
    // }

}