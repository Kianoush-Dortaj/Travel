import { Schema, model, Document } from 'mongoose';
import httpContext from 'express-http-context';

export default interface BaseSchemaModel extends Document {
  isDelete: boolean;
  owner: string;
  updateDate: string;
  updateBy: string;
  deleteDate: string;
  deleteby: string;
  createDate: string;
  createBy: string;
}
export function BaseSchema(schema) {
  schema.add({
    isDelete: { type: Boolean, default: false },
    owner: { type: String },
    updateDate: { type: String },
    updateBy: { type: String },
    deleteDate: { type: String },
    deleteby: { type: String },
    createDate: { type: String },
    createBy: { type: String },
  });

  schema.pre("save",async function (req, res, next) {
  console.log("BaseSchema -> req",await req)
    if (!schema.isNew) {
      this.createDate = new Date();
      this.createBy = `${req.user.firstName} ${req.user.lastName}`;
    }
    next();
  });

  schema.pre("updateOne",async function (req, res, next) {
    if (this.getUpdate().$set.isDelete) {
      this.set({
        deleteDate: new Date(),
        deleteby: `${req.user.firstName} ${req.user.lastName}`,
      });
    } else {
      this.set({
        updateDate: new Date(),
        updateBy: `${req.user.firstName} ${req.user.lastName}`,
      });
    }
    next();
  });
};
