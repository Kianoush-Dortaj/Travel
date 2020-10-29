import express from "express";
import UserValidation from "../../http/validations/UserValidation";
import UploadHanlder from "../../utilitie/avatarUpload";
import UserController from "../../http/controller/UserController";
import FileToField from "../../http/middlwares/FileToField";
import atuhrization from './../../http/middlwares/Authrization';
// const accessUser = require("./../../http/middllware/AccessUser");
// const authrization = require("./../../http/middllware/Authourize");
// const { Cache } = require("./../../utilitie/Redis/CacheMiddllware");

const router = express.Router();

router.post(
  "/Create",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:Create"),
  // UserValidation.CreateHandle(),
  UserController.Create
);

router.put(
  "/UpdateInforamtion/:id",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:UpdateInforamtion"),
  UploadHanlder.single("avatar"),
  FileToField.fileToAvatar,
  UserValidation.UpdateHandle(),
  UserController.Update
);

router.put(
  "/UpdateAccountInfo/:id",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:UpdateAccountInfo"),
  UserValidation.EditAccountInfoHandle(),
  UserController.EditAccountInfoUser
);

router.put(
  "/ChangePassword/:id",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:ChangePassword"),
  UserValidation.ChangePasswordHandle(),
  UserController.ChangePassword
);

router.put(
  "/SetPermissions",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:ChangeUserRole"),
  UserController.ChangeUseRole
);

router.delete(
  "/DeleteUser/:id",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:DeleteUser"),
  UserController.DeleteUser
);

router.get(
  "/GetAll",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:GetAll"),
  UserController.GetAllUsers
);


router.post(
  "/GetUSerLogin",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:GetAll"),
  UserController.GetUserForLogin
);


router.get(
  "/GetPersonalInformation/:id",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:GetPersonalInformation"),
  // Cache,
  UserController.GetPersonalInforamtion
);

router.get(
  "/GetAccountInformation/:id",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:GetAccountInformation"),
  // Cache,
  UserController.GetAccountInforamtion
);

router.get(
  "/SearchUser",
  atuhrization.AuthToken,
  // accessUser.AccessUser("User:GetAccountInformation"),
  // Cache,
  // UserController.SearchUser
);

router.get(
  "/GetManagerImage/:id",
  // authrization.AuthToken,
  // accessUser.AccessUser("User:GetManagerImage"),
  UserController.GetUserImage
);

export default router;
