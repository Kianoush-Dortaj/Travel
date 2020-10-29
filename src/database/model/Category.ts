import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export default interface Category extends Document {
    name: string;
    icon: string;
    parentId: string;
}

const CategorySchema = new Schema({
    name: { type: String, require: true },
    icon: { type: String, require: true },
    parentId: { type: String },
}, {
    toJSON: { virtuals: true }
});

CategorySchema.plugin(BaseSchema);

export const CategoryModel = model<Category>("Category", CategorySchema)