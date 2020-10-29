import { Schema, model, Document } from 'mongoose';
import  {BaseSchema} from './BaseSchema';

export default interface Permission extends Document {
    name: string;
    parentId: string;
    permissionId: string;
    isDelete: boolean;
}

const PermissionSchema = new Schema({
    name: { type: String, require: true },
    parentId: { type: String },
    permissionId: { type: String, require: true },
    isDelete: { type: Boolean, default: false }
},
{
    toJSON: { virtuals: true },
});

PermissionSchema.plugin(BaseSchema);

export const PermissionModel = model<Permission>("Permission", PermissionSchema);
