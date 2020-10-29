import BaseCotnroller from './BaseController';
import SubscribeRepository from '../../database/respository/Subscribe/SubscribeRepository';

export default new class SubscribeController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Create Subscribe ****/
    async CreateSubscribe(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            SubscribeRepository.CreateSubscribe(req.body)
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
    /*** Set Subscribe ****/
    async SetSubscribe(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            SubscribeRepository.SetSubscribe(req.body)
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
    /*** Delete Subscribe ****/
    async DeleteSubscribe(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            SubscribeRepository.DeleteSubscribe(req.params.id)
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
    /*** GetAll Subscribe ****/
    async GetAllSubscribePaging(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            SubscribeRepository.GetAllSubscribePaging()
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
    /*** GetAll Subscribe Select ****/
    async GetAllSubscribeSelect(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            SubscribeRepository.GetAllSubscribe()
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
    /*** GetById Subscribe ****/
    async GetByIdSubscribe(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            SubscribeRepository.GetByIdSubscribe(req.params.id)
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