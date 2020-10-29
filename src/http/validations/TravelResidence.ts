import { check } from 'express-validator';

export default new class TravelResidenceValidation {


    Create() {
        return [
            check("name").notEmpty().withMessage("TravelResidence Name Cannot be Empty"),
            check("icon").notEmpty().withMessage("TravelResidence Icon cannot be Empty"),
        ];
    }

    Update() {
        return [
            check("id").notEmpty().withMessage("TravelResidence Id cannot be Empty"),
            check("name").notEmpty().withMessage("TravelResidence Name Cannot be Empty"),
            check("icon").notEmpty().withMessage("TravelResidence Icon cannot be Empty"),
        ];
    }

    Delete() {
        return [
            check("id").notEmpty().withMessage("TravelResidence Id cannot be Empty"),
        ];
    }


}