import BaseCotnroller from './BaseController';
import TravelTypeRepository from './../../database/respository/TravelType/TravelTypeRepository';

export default new class TravelTypeController extends BaseCotnroller {

    constructor() {
        super();
    }

    /*** Create TravelType ****/
    async CreateTravelType(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            TravelTypeRepository.CreateTravelType(req.body)
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
    /*** Set TravelType ****/
    async SetTravelType(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            TravelTypeRepository.SetTravelType(req.body)
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
    /*** Delete TravelType ****/
    async DeleteTravelType(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            TravelTypeRepository.DeleteTravelType(req.params.id)
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
    /*** GetAll TravelType ****/
    async GetAllTravelTypePaging(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            TravelTypeRepository.GetAllTravelTypePaging()
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
    /*** GetAll TravelType Select ****/
    async GetAllTravelTypeSelect(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            TravelTypeRepository.GetAllTravelType()
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
    /*** GetById TravelType ****/
    async GetByIdTravelType(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            TravelTypeRepository.GetByIdTravelType(req.params.id)
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