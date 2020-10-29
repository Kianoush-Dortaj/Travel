import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export default interface TravelType extends Document {
    name: string;
    icon: string;
}

const TravelTypeSchema = new Schema({
    name: { type: String, require: true },
    icon: { type: String, require: true }
}, {
    toJSON: { virtuals: true }
});

TravelTypeSchema.plugin(BaseSchema);

export const TravelTypeModel = model<TravelType>("TravelType", TravelTypeSchema)