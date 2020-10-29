import BaseCotnroller from './BaseController';
import CategoryRepository from './../../database/respository/Category/CategoryRepository';

export default new class CategoryController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Create Category ****/
    async CreateCategory(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            CategoryRepository.CreateCategory(req.body)
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
    /*** Set Category ****/
    async SetCategory(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            CategoryRepository.SetCategory(req.body)
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
    /*** Delete Category ****/
    async DeleteCategory(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            CategoryRepository.DeleteCategory(req.params.id)
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
    /*** GetAll Category ****/
    async GetAllCategoryPaging(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            CategoryRepository.GetAllCategoryPaging()
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
    /*** GetAll Category Select ****/
    async GetAllCategorySelect(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            CategoryRepository.GetAllCategory()
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
    /*** GetById Category ****/
    async GetByIdCategory(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            CategoryRepository.GetByIdCategory(req.params.id)
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