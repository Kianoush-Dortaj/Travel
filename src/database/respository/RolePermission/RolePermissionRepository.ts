import { RolePermissionModel } from './../../model/RolePermission';
import { PermissionModel } from './../../model/Permission';


export default new class RolePermissionRepository {

    async UpdatePermission(item) {

        const roles = await this.GetRolePermissionsByRoleId(item.roleId);
        if (roles.length > 0) {
            await RolePermissionModel.update(
                {
                    roleId: item.roleId,
                },
                { $set: { permissionId: [...item.permissionId] } }
            );
        } else {
            const rolePermission = new RolePermissionModel();
            rolePermission.roleId = item.roleId;
            rolePermission.permissionId.push(...item.permissionId);
            rolePermission.save();
        }
    }

    /****
 *
 * Get Role Permissions By RoleId
 *
 ****/
    async GetRolePermissionsByRoleId(id) {
        return await RolePermissionModel.find({
            roleId: id,
        }).select("permissionId");
    }

    /****
 *
 * Get All Permissions By RoleId
 *
 ****/
    async GetAllPermissonsByRoleId(id) {
        let model = [];
        try {

            let permissions = await PermissionModel.find({})
                .where("isDelete")
                .equals(false);
            let rolePermissions = await RolePermissionModel.find({ roleId: id }).select(
                "permissionId"
            );

            permissions.forEach((permission) => {
                rolePermissions.forEach((elment) => {
                    model.push({
                        id: permission._id,
                        isChilde: false,
                        parentId: permission.parentId,
                        selected:
                            elment.permissionId.indexOf(permission._id) !== -1 ? true : false,
                        name: permission.name,
                    });
                });
            });
        } catch (error) { }
        return model;
    }

    /****
*
* Get All Permissions By Roles
*
****/
    async GetAllPermissonsByRoles(ids) {
        let model: string[] = [];
        try {

            await Promise.all(ids.map(async (role) => {
                let permission = await RolePermissionModel.find({ roleId: role._id })
                    .populate({
                        path: 'permissionId',
                        model: 'Permission',
                        select: 'permissionId'
                    });
                permission.forEach((elment) => {
                    elment.permissionId.forEach((per) => {
                        model.push(per.permissionId);
                    })
                });
            }))
        } catch (error) { }

        return model;
    }

}