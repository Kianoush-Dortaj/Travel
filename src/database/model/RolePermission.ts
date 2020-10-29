import { Schema, model, Document } from 'mongoose';
import Role from './Role';
import Permission from './Permission';


export interface RolePermission extends Document {
    roleId: Role,
    permissionId: Permission[]
}

const RolePermission = Schema(
    {
        roleId: { type: Schema.Types.ObjectId, ref: "Role" },
        permissionId: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    },
    {
        toJSON: { virtuals: true },
    }
);

export const RolePermissionModel = model<RolePermission>("RolePermission", RolePermission)

