import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export default interface Discount extends Document {
    name: string;
    percent: string;
    numberOfUse: string;
    use: number;
    startDate: Date;
    expireDate: Date;
}

const DiscountSchema = new Schema({
    name: { type: String, require: true },
    percent: { type: String, require: true },
    numberOfUse: { type: Number },
    use: { type: Number },
    startDate: { type: Date, require: true },
    expireDate: { type: Date, require: true }
}, {
    toJSON: { virtuals: true }
});

DiscountSchema.plugin(BaseSchema);

export const DiscountModel = model<Discount>("Discount", DiscountSchema)