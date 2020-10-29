import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export default interface Subscribe extends Document {
    name: string;
    price: string;
}

const SubscribeSchema = new Schema({
    name: { type: String, require: true },
    price: { type: String, require: true },
}, {
    toJSON: { virtuals: true }
});

SubscribeSchema.plugin(BaseSchema);

export const SubscribeModel = model<Subscribe>("Subscribe", SubscribeSchema)