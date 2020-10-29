import { check } from 'express-validator';
import { RoleModel } from './../../database/model/Role';

export default new class RoleValidation {


    Create() {
        return [
            check("name")
                .notEmpty()
                .withMessage("The Name Cann't be Empty")
        ];
    }


    Update() {
        return [
            check("name")
                .notEmpty()
                .withMessage("The Name Cann't be Empty"),
            check("id")
                .notEmpty()
                .withMessage("The id Cann't be Empty")
                .custom(async (value) => {
                    let item = RoleModel.findById(value);
                    if (!item) {
                        return Promise.reject("not Valid Id . Please Select a Valid Id")
                    }
                }),
        ];
    }

    Delete() {
        return [
            check("id")
                .notEmpty()
                .withMessage("The id Cann't be Empty")
                .custom(async (value) => {
                    let item = RoleModel.findById(value);
                    if (!item) {
                        return Promise.reject("not Valid Id . Please Select a Valid Id")
                    }
                })
        ];
    }


}