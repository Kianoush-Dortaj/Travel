import UniqueString from 'unique-string';
import bcrypte from 'bcrypt';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';
import UserRole from './UserRole';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    nationalId: string;
    avatar: string;
    gender: string;
    userRole: UserRole[];
    birthDate: Date;
    locked: boolean;
    lockedDate: Date;
    accountFail: string;
    password: string;
    securityStamp: string;
}

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, require: true },
    email: { type: String, defult: null },
    gender: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
    isActive: { type: Boolean, default: false },
    nationalId: { type: String },
    avatar: { type: String },
    userRole: {
        type: Schema.Types.ObjectId,
        ref: 'UserRole',
    },
    birthDate: { type: Date },
    locked: { type: Boolean, default: false },
    lockedDate: { type: Date, default: null },
    accountFail: { type: Number, default: 0 },
    password: { type: String, require: true },
    securityStamp: { type: String },
},
    {
        toJSON: { virtuals: true },
    });

UserSchema.plugin(BaseSchema);

UserSchema.pre("save", async function (req,res,next) {
    console.log("req", req)
    this.securityStamp = UniqueString();

    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const hash = await bcrypte.hash(user.password, 5);
        user.password = hash;
    } catch (error) {
        return next(error);
    }
    next();
});

UserSchema.pre("updateOne",async function (req,res,next) {
console.log("req", req)
    this.securityStamp = UniqueString();
    const user = this;
    if (!this.getUpdate().$set.password) return next();
    try {
        const hash = await bcrypte.hash(this.getUpdate().$set.password, 5);
        this.getUpdate().$set.password = hash;
    } catch (error) {
        return next(error);
    }
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypte.compareSync(password, this.password);
};

export const UserModel = model<User>("User", UserSchema);

