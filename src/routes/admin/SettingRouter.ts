import express from 'express';
import SettingController from '../../http/controller/SettingController';
import atuhrization from './../../http/middlwares/Authrization';

const router = express.Router();

router.put("/SetRegisterSetting", atuhrization.AuthToken, SettingController.SetRegisterSetting);
router.get("/GetRegisterSetting", atuhrization.AuthToken, SettingController.GetRegisterSetting);

router.put("/SetAccountSetting", atuhrization.AuthToken, SettingController.SetAthniticationSetting);
router.get("/GetAccountSetting", atuhrization.AuthToken, SettingController.GetAthniticationSetting);

router.put("/SetSliderSetting", atuhrization.AuthToken, SettingController.SetAthniticationSetting);
router.get("/GetSliderSetting", atuhrization.AuthToken, SettingController.GetAthniticationSetting);

export default router;
