import { check } from 'express-validator';

export default new class TravelTypeValidation {


    Create() {
        return [
            check("name").notEmpty().withMessage("TravelType Name Cannot be Empty"),
            check("icon").notEmpty().withMessage("TravelType Icon cannot be Empty"),
        ];
    }

    Update() {
        return [
            check("id").notEmpty().withMessage("TravelType Id cannot be Empty"),
            check("name").notEmpty().withMessage("TravelType Name Cannot be Empty"),
            check("icon").notEmpty().withMessage("TravelType Icon cannot be Empty"),
        ];
    }

    Delete() {
        return [
            check("id").notEmpty().withMessage("TravelType Id cannot be Empty"),
        ];
    }


}