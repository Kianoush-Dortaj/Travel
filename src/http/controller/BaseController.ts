"use strict";

import { validationResult } from "express-validator";
import autoBind from 'auto-bind';

import {
    BadRequestResponse,
    SuccessResponse,
    InternalErrorResponse,
    SuccessMsgResponse, Data
} from "./../../core/api/ApiRespose";

export class ValidationResult {
    haveError: boolean;
    errorMessage: string[];

    constructor(haveError: boolean, errorMessage: string[]) {
        this.errorMessage=errorMessage;
        this.haveError=haveError;
     }
}

export default class BaseCotnroller {

    constructor() {
        autoBind(this);
    }

    BadRerquest(res, message) {
        return new BadRequestResponse(message).send(res);
    }


    InternalServerError(res) {
        return new InternalErrorResponse().send(res);
    }

    Ok(res) {
        return new SuccessMsgResponse().send(res);
    }

    Notfound(res, message="not Found") {
        return new BadRequestResponse(message).send(res);
    }

    OkObjectResult(res, value) {
        return new SuccessResponse(value).send(res);
    }

    OkObjectResultPager(res, value: Data) {
        return new SuccessResponse(value).send(res);
    }

    async ValidationAction(req, res): Promise<ValidationResult> {
        const result = await validationResult(req);
        if (!result.isEmpty()) {
            let errors = result.array();
            let message = [];
            errors.forEach((element) => {
                message.push(element.msg);
            });
            return new ValidationResult(true, message);
        }
        return new ValidationResult(false, null);
    }

}