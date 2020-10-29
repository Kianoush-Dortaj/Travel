import { PermissionModel } from './../../model/Permission';

export default new class PermissionRepository {

    /****
      *
      * Create Permission
      *
      ****/
     CreatePermission(value): Promise<any> {
        return new Promise((resolve, reject) => {
            const permission = new PermissionModel({ ...value });
            return permission
                .save()
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /****
      *
      * Set Permission
      *
      ****/
    SetPermission(permission): Promise<any> {
    console.log("PermissionRepository -> permission", permission)
        return new Promise((resolve, reject) => {
            PermissionModel.updateOne(
                { _id: permission.id },
                { $set: { ...permission } },
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    /****
     *
     * Delete Permission
     *
     ****/
    DeletePermission(id): Promise<any> {
        return new Promise((resolve, reject) => {
            PermissionModel.updateOne(
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
    GetAllPermission() {
        return PermissionModel.find({})
            .where("isDelete")
            .equals(false)
            .select("name parentId permissionId");
    }
    /****
   *
   * Get ById Permission
   *
   ****/
    GetByIdPermission(id) {
        return PermissionModel.findById({ _id: id })
            .where("isDelete")
            .equals(false)
            .select("name permissionId parentId ");
    }

}