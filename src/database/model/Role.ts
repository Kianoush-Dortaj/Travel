import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export default interface Role extends Document {
    name: string;
    securityStamp: string;
}

const RoleSchema = new Schema({
    name: { type: String, require: true },
    securityStamp: { type: String }
}, {
    toJSON: { virtuals: true }
});

RoleSchema.plugin(BaseSchema);

RoleSchema.pre("save", function (next) {
    this.securityStamp = UniqueString();
    next();
});

RoleSchema.pre("updateOne", function (next) {
    this.set({ securityStamp: UniqueString() })
    next();
})

export const RoleModel = model<Role>("Role", RoleSchema)