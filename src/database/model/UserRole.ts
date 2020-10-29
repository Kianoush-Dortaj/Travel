import { Schema, model, Document } from 'mongoose';
import User from './User';
import Role from './Role';

export default interface
    UserRole extends Document {
    roleId: Role[];
    userId: User;
}

const UserRoleSchema = Schema({
    roleId: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    toJSON: { virtuals: true }
});

export const UserRoleModel = model<UserRole>("UserRole", UserRoleSchema);