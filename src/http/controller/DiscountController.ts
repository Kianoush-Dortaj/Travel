import BaseCotnroller from './BaseController';
import DiscountRepository from '../../database/respository/Descount/DiscountRepository';

export default new class DiscountController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Create Discount ****/
    async CreateDiscount(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            DiscountRepository.Craete(req.body)
                .then(() => {
                    this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** Set Discount ****/
    async SetDiscount(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            DiscountRepository.UpdateDiscount(req.body)
                .then(() => {
                    this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** Delete Discount ****/
    async DeleteDiscount(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            DiscountRepository.DeleteDiscount(req.params.id)
                .then(() => {
                    this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** GetAll Discount ****/
    async GetAllDiscountPaging(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            DiscountRepository.GetAllDiscountPaging()
                .then((data) => {
                    this.OkObjectResultPager(res, {
                        count: data.count,
                        data: data.result
                    });
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** GetAll Discount Select ****/
    async GetAllDiscountSelect(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            DiscountRepository.GetAllDiscount()
                .then((data) => {
                    this.OkObjectResult(res, data);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /*** GetById Discount ****/
    async GetByIdDiscount(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            DiscountRepository.GetDiscountById(req.params.id)
                .then((data) => {
                    this.OkObjectResult(res, data);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }

}