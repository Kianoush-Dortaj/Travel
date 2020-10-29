import { check } from 'express-validator';
import { SubscribeModel } from './../../database/model/Subscribe';

export default new class SubscribeValidation {


    Create() {
        return [
            check("name").notEmpty().withMessage("Subscribe Name Cannot be Empty"),
            check("price").notEmpty().withMessage("Subscribe price cannot be Empty"),
        ];
    }

    Update() {
        return [
            check("id").notEmpty().withMessage("Subscribe Id cannot be Empty"),
            check("name").notEmpty().withMessage("Subscribe Name Cannot be Empty"),
            check("price").notEmpty().withMessage("Subscribe price cannot be Empty"),
        ];
    }

    Delete() {
        return [
            check("id").notEmpty().withMessage("Subscribe Id cannot be Empty"),
        ];
    }


}