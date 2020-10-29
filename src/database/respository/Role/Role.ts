import { RoleModel } from './../../model/Role';
import RolePermissionRepository from './../RolePermission/RolePermissionRepository';
export default new class RoleRepository {

    /****
      *
      * Create Role
      *
      ****/
    CreateRole(item): Promise<any> {
        return new Promise((resolve, reject) => {
            const role = new RoleModel({ name: item.name });
            return role
                .save()
                .then((data) => {
                    RolePermissionRepository.UpdatePermission({ roleId: data._id, permissionId: item.permissions })
                        .then(() => {
                            resolve();
                        }).catch((error) => {
                            return reject(error);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /****
      *
      * Set Role
      *
      ****/
    SetRole(item): Promise<any> {
        return new Promise((resolve, reject) => {
            RoleModel.updateOne(
                { _id: item.id },
                { $set: { name: item.name } },
                (err, res) => {
                    if (err) return reject(err);
                    RolePermissionRepository.UpdatePermission({ roleId: item.id, permissionId: item.permissions })
                        .then(() => {
                            return resolve();
                        }).catch((error) => {
                            return reject(error);
                        });
                }
            );
        });
    }

    /****
     *
     * Delete Role
     *
     ****/
    DeleteRole(id): Promise<any> {
        return new Promise((resolve, reject) => {
            RoleModel.updateOne(
                { _id: id },
                { $set: { isDelete: true } },
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }
    /****
 *
 * GetAll Permission
 *
 ****/
    GetAllRole() {
        return RoleModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name");
    }
    /****
*
* GetAll Role Paging
*
****/
    async GetAllRolePaging() {
        let data;

        let result = await RoleModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name");
        let count = await RoleModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name")
            .estimatedDocumentCount();
        data = {
            result: result,
            count: count
        };
        return data;
    }
    /****
   *
   * Get ById Permission
   *
   ****/
    GetByIdRole(id) {
        return RoleModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .select("name");
    }

}