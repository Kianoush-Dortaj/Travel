import BaseCotnroller from './BaseController';
import { SETTING_ENUM } from './../../database/model/Setting';
import SettingRepository from './../../database/respository/Setting/SettingRepository';

export default new class SettingController extends BaseCotnroller {

    constructor() {
        super();
    }

    /**********
 *
 * Set Register Setting
 *
 ************/
    async SetRegisterSetting(req, res, next) {
        SettingRepository.SetSetting(SETTING_ENUM.REGISTER_SETTING, req.body)
            .then(() => {
                this.Ok(res);
            })
            .catch((error) => {
                this.BadRerquest(res, error);
            });
    }
    /**********
   *
   * Get Register Setting
   *
   ************/
    async GetRegisterSetting(req, res, next) {
        SettingRepository.GetRegisterSetting(SETTING_ENUM.REGISTER_SETTING)
            .then((data) => {
                this.OkObjectResult(res, data.value);
            })
            .catch((error) => {
                this.BadRerquest(res, error);
            });
    }
    /**********
   *
   * Set Athnitication Setting
   *
   ************/
    async SetAthniticationSetting(req, res, next) {
        SettingRepository.SetSetting(SETTING_ENUM.AUTHENTICATED_SETTING, req.body)
            .then(() => {
                this.Ok(res);
            })
            .catch((error) => {
                this.BadRerquest(res, error);
            });
    }
    /**********
   *
   * Get Athnitication Setting
   *
   ************/
    async GetAthniticationSetting(req, res, next) {
        SettingRepository.GetRegisterSetting(SETTING_ENUM.AUTHENTICATED_SETTING)
            .then((data) => {
                this.OkObjectResult(res, data.value);
            })
            .catch((error) => {
                this.BadRerquest(res, error);
            });
    }

}