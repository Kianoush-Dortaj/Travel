import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export default interface TravelResidence extends Document {
    name: string;
    icon: string;
}

const TravelResidenceSchema = new Schema({
    name: { type: String, require: true },
    icon: { type: String, require: true }
}, {
    toJSON: { virtuals: true }
});

TravelResidenceSchema.plugin(BaseSchema);

export const TravelResidenceModel = model<TravelResidence>("TravelResidence", TravelResidenceSchema)