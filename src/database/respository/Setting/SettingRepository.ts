import { SettingModel, SETTING_ENUM } from './../../model/Setting';
import redis from './../../../utilitie/Redis/RedisRepository';

export default new class SettingRepository {

    /***
 *
 * Set Setting
 *
 ****/
    async SetSetting(key, item) {
        const setting = await SettingModel.findOne({
            field: key,
        });
        if (setting) {
            await SettingModel.updateOne(
                { field: key },
                { value: JSON.stringify(item) },
                (error, res) => {
                    if (error) throw error;
                    redis.ResetSingleItem(key, item);
                }
            );
        } else {
            var newSetting = new SettingModel();
            newSetting.field = key;
            newSetting.value = JSON.stringify(item);
            newSetting
                .save()
                .then((data) => {
                    redis.Set(key, data.value);
                })
                .catch((error) => {
                    throw error;
                });
        }
    }

    async GetRegisterSetting(key) {
        return redis.Get(key).then((data) => {
            if (data) {
                return { value: data };
            } else {
                return SettingModel.findOne({ field: key }).select("value");
            }
        });
    }

}