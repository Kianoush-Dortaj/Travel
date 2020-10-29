import { Schema, model, Document } from 'mongoose';
import { BaseSchema } from './BaseSchema';

export const SETTING_ENUM = {
    REGISTER_SETTING: "Register Setting",
    AUTHENTICATED_SETTING: "Authenticated Setting",
    SLIDER_SETTING: "Slider Setting",
};

export default interface Setting {
    field: string;
    value: string;
}

const SettingSchema = Schema({
    field: { type: String, enums: [SETTING_ENUM], require: true },
    value: { type: String, require: true },
});

export const SettingModel = model<Setting>("Setting", SettingSchema);