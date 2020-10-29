import BaseCotnroller from './BaseController';
import UserRepository from './../../database/respository/User/UserRepository';
import UserRoleRepository from './../../database/respository/UserRole/UserRoleRepository';
import { UserModel } from './../../database/model/User';
import fs from 'fs';
import redis from './../../utilitie/Redis/RedisRepository';
export default new class UserController extends BaseCotnroller {

    constructor() {
        super();
    }

    /***
      * Create
      */
    async Create(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.Create(req.body)
                .then(() => {
                    return this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Update
     */
    async Update(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.Update(req)
                .then(() => {
                    return this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Edit Account Info
     */
    async EditAccountInfoUser(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.UpdateAccountInfo(req.body, req.params.id)
                .then(() => {
                    return this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Change Password
     */
    async ChangePassword(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.ChangePassword(req.body.password, req.params.id)
                .then(() => {
                    return this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Delete User
     */
    async DeleteUser(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.DeleteUser(req.params.id)
                .then(() => {
                    return this.Ok(res);
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Get All Managers
     */
    async GetAllUsers(req, res, next) {
        // if (filters) {
        //     filters.forEach((element) => {
        //         if (element["op"] === "eq") {
        //             manag.where(element["field"]).equals(element["data"]);
        //         } else if (element["op"] === "gte") {
        //             let f = element["field"];
        //             manag.find({ f: { $gte: element["data"] } });
        //         } else if (element["op"] === "lte") {
        //             manag.find({ field: { $lte: element["data"] } });
        //         } else if (element["op"] === "cn") {
        //             manag.find({ userName: { $regex: `(.*)${element["data"]}(.*)` } });
        //         }
        //     });
        // }

        const manager = await UserModel.find({})
            .select("firstName lastName email visitorCode phoneNumber isActive")
            .where("isAdmin")
            .equals(true)
            .where("isDelete")
            .equals(false)
        // .skip((req.body.page - 1) * req.body.rows)
        // .limit(req.body.rows)
        // .sort(`{${sortField}:${req.body.sort}}`);
        if (!manager) return this.Notfound(res);
        return this.OkObjectResultPager(
            res,
            {
                count: 30,
                data: manager
            }
        );
    }
    /***
     * Get Personal Information
     */
    async GetPersonalInforamtion(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.GetPersonalInforamtion(req.params.id)
                .then((data) => {
                    redis.Set(req.path, data).then(() => {
                        return this.OkObjectResult(res, data);
                    });
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Get User Search
     */
    //   async SearchUser(req, res, next) {
    //     let result = await this.ValidationAction(req, res);
    //     if (result[0]) {
    //         UserRepository.SearchUser(req.query)
    //         .then((data) => {
    //           redis.Set(req.path, data).then(() => {
    //             return this.OkObjectResult(res, data);
    //           });
    //         })
    //         .catch((error) => {
    //           return this.BadRerquest(res, error);
    //         });
    //     } else {
    //       return this.BadRerquest(res, result[1]);
    //     }
    //   }
    /***
     * Get Account Information
     */
    async GetAccountInforamtion(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRepository.GetAccountInforamtion(req.params.id)
                .then((data) => {
                    redis.Set(req.path, data).then(() => {
                        return this.OkObjectResult(res, data);
                    });
                })
                .catch((error) => {
                    return this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * Change UserRole
     */
    async ChangeUseRole(req, res, next) {
        let validationData = await this.ValidationAction(req, res);
        if (!validationData.haveError) {
            UserRoleRepository
                .ChangeUserRole(req.body.userId, req.body.rolesId)
                .then((data) => {
                    this.Ok(res);
                })
                .catch((error) => {
                    this.BadRerquest(res, error);
                });
        } else {
            return this.BadRerquest(res, validationData.errorMessage);
        }
    }
    /***
     * GetManagerImage
     */
    async GetUserImage(req, res, next) {
        let manager = await UserModel.findById(req.params.id).select("avatar");
        if (!manager.avatar) {
            return this.Notfound(res);
        }
        fs.readFile(`./src/public${manager.avatar}`, (error, data) => {
            if (error) throw error;
            res.writeHead(200, { "Content-Type": "image/png" });
            res.end(data);
        });
    }

    /******Get User Id *******/
    async GetUserForLogin(req, res, next) {
        UserRepository.GetUserforLogin(req.body.email, req.body.password)
            .then((data) => {
                this.OkObjectResult(res, data);
            })
            .catch((error) => {
                this.BadRerquest(res, error);
            });
    }

}