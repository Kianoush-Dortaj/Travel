import { check } from 'express-validator';
import { PermissionModel } from './../../database/model/Permission';

export default new class PermissionValidation {


    Create() {
        return [
            check("name")
                .notEmpty()
                .withMessage("The Name Cann't be Empty"),
            check("permissionId")
                .notEmpty()
                .withMessage("The PermissionId Cann't be Empty"),
            check("permissionId")
                .notEmpty()
                .withMessage("The PermissionId Cann't be Empty")
                .custom(async (value) => {
                    let item = PermissionModel.findById(value);
                    if (!item) {
                        return Promise.reject("not Valid Permission Id . Please Select a Valid Permission Id")
                    }
                })
        ];
    }


    Update() {
        return [
            check("name")
                .notEmpty()
                .withMessage("The Name Cann't be Empty"),
            check("permissionId")
                .notEmpty()
                .withMessage("The PermissionId Cann't be Empty"),
            check("permissionId")
                .notEmpty()
                .withMessage("The PermissionId Cann't be Empty")
                .custom(async (value) => {
                    let item = PermissionModel.findById(value);
                    if (!item) {
                        return Promise.reject("not Valid Permission Id . Please Select a Valid Permission Id")
                    }
                }),
            check("id")
                .notEmpty()
                .withMessage("The id Cann't be Empty")
                .custom(async (value) => {
                    let item = PermissionModel.findById(value);
                    if (!item) {
                        return Promise.reject("not Valid Id . Please Select a Valid Id")
                    }
                })
        ];
    }

    Delete() {
        return [
            check("id")
                .notEmpty()
                .withMessage("The id Cann't be Empty")
                .custom(async (value) => {
                    let item = PermissionModel.findById(value);
                    if (!item) {
                        return Promise.reject("not Valid Id . Please Select a Valid Id")
                    }
                })
        ];
    }


}