import { check } from 'express-validator';
import { CategoryModel } from './../../database/model/Category';

export default new class CategoryValidation {


    Create() {
        return [
            check("name").notEmpty().withMessage("Category Name Cannot be Empty"),
            check("icon").notEmpty().withMessage("Category Icon cannot be Empty"),
        ];
    }

    Update() {
        return [
            check("id").notEmpty().withMessage("Category Id cannot be Empty"),
            check("name").notEmpty().withMessage("Category Name Cannot be Empty"),
            check("icon").notEmpty().withMessage("Category Icon cannot be Empty"),
        ];
    }

    Delete() {
        return [
            check("id").notEmpty().withMessage("Category Id cannot be Empty"),
        ];
    }


}