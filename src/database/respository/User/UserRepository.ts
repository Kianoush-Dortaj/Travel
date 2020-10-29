import redis from './../../../utilitie/Redis/RedisRepository';
import UserRoleRepository from "./../../respository/UserRole/UserRoleRepository";
import RolePermissionRepository from './../RolePermission/RolePermissionRepository';
import { UserModel } from "./../../model/User";
import UniqueString from "unique-string";
import Utilite from './../../../utilitie/Utilite';

export interface ReponseModel {
    userId: string,
    userName: string,
    userSucuritystamp: string,
    roleId: string[],
    roleSecurityStamp: string[],
    permission: string[];
}

export default new class UserModelRepository {

    /***
  *
  * Create UserModel
  *
  ****/
    Create(item) {
        return new Promise((resolve, reject) => {
            const user = new UserModel();
            user.firstName = item.firstName;
            user.gender = item.gender;
            user.isAdmin = true;
            user.password = item.password;
            user.phoneNumber = item.phoneNumber;
            user.lastName = item.lastName;
            user.email = item.email;

            UserRoleRepository
                .SetUserRole(user._id)
                .then((data) => {
                    user.userRole = data['_id'];
                    user.save().then((data) => {
                        resolve(data);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
    /***
     *
     * Update User
     *
     ****/
    Update(item) {
        return new Promise((resolve, reject) => {
            UserModel.updateOne(
                { _id: item.body.id },
                {
                    $set: {
                        firstName: item.body.firstName,
                        gender: item.body.gender,
                        phoneNumber: item.body.phoneNumber,
                        lastName: item.body.lastName,
                        avatar: item.file
                            ? Utilite.getDirectoryImage(
                                `${item.file.destination}/${item.file.originalname}`
                            )
                            : null,
                    },
                }
            )
                .then((data) => {
                    redis.Remove(
                        "/GetPersonalInformation/" + item.body.id
                    );
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    /***
     *
     * Edit Account Info
     *
     ****/
    UpdateAccountInfo(item, id) {
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ _id: id }, { $set: { ...item } }, (error, res) => {
                if (error) reject(error);
                resolve(res);
            });
        });
    }

    /***
     *
     * Change Password
     *
     ****/
    ChangePassword(item, id) {
        return new Promise((resolve, reject) => {
            UserModel.updateOne(
                { _id: id },
                { $set: { password: item } },
                (error, res) => {
                    if (error) reject(error);
                    resolve(res);
                }
            );
        });
    }
    /***
     *
     * Delete Manager
     *
     ****/
    DeleteUser(id) {
        return new Promise((resolve, reject) => {
            UserModel.updateOne(
                { _id: id },
                { $set: { isDelete: true } },
                (error, res) => {
                    if (error) reject(error);
                    redis.Remove(id);
                    resolve(res);
                }
            );
        });
    }
    /***
     *
     * Get Persoanl Inforamtion
     *
     ****/
    GetPersonalInforamtion(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById({ _id: id }, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
                .populate("userRole")
                .select("firstName lastName phoneNumber");
        });
    }
    /***
     *
     * Get Account Inforamtion
     *
     ****/
    GetAccountInforamtion(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById({ _id: id }, (err, res) => {
                if (err) reject(err);
                resolve(res);
            }).select("email isActive");
        });
    }
    /***
     *
     * Get UserModel ById
     *
     ****/
    async GetUserModelById(id) {
        const vuser = await UserModel.findById(id).exec();
    }
    /***
     *
     * Get UserModel ById
     *
     ****/
    async SearchUser(query) {
        try {
            return await UserModel.find(query).where("isDelete").equals(false).exec();
        } catch (err) { }
    }
    /***
     *
     * Get User ByEmail
     *
     ****/
    async GetUserforLogin(email, password) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: email }, (error, user) => {
                if (!user) {
                    reject("نام کاربری یا رمز عبور اشتباه است");
                }
                if (user.comparePassword(password)) {
                    if (!user.isActive) {
                        reject(
                            "حساب کاربری شما فعال نیست . لطفا برای فعال شدن درخواست کد بدید"
                        );
                    }
                    if (user.isDelete) {
                        reject("کاربری با چنین مشخصاتی یافت نشد");
                    }
                    if (user.locked === true) {
                        if (user.lockedDate < new Date(new Date().toUTCString())) {
                            user.accountFail = 0;
                            user.locked = false;
                            user.lockedDate = null;
                            user.save();
                            resolve(user);
                        } else {
                            reject(`حساب کاربری شما تا تاریخ  ${user.lockedDate} قفل میباشد`);
                        }
                    } else {
                        let reponseModel: ReponseModel = {
                            userId: user._id,
                            userName: user.email,
                            userSucuritystamp: user.securityStamp,
                            roleId: [],
                            roleSecurityStamp: [],
                            permission: []
                        };

                        UserModel.findOne({ _id: user._id })
                            .populate({
                                path: "userRole",
                                populate: {
                                    path: "roleId",
                                    select: 'id securityStamp'
                                },
                            })
                            .exec()
                            .then((user) => {

                                user.userRole.roleId.forEach((role) => {
                                    reponseModel.roleId.push(role.id)
                                    reponseModel.roleSecurityStamp.push(role.securityStamp)
                                })
                                RolePermissionRepository.GetAllPermissonsByRoles(
                                    user.userRole.roleId
                                ).then(async (data) => {
                                    reponseModel.permission = data;
                                    resolve(reponseModel);
                                })
                            })
                    }
                } else {
                    if (user.accountFail <= 5) {
                        user.accountFail++;
                        user.save(() => {
                            reject("نام کاربری یا رمز عبور اشتباه است");
                        });
                    } else {
                        user.locked = true;
                        user.lockedDate = new Date().setUTCHours(72);
                        user.save(() => {
                            reject("حساب کاربری شما بلاک شده است");
                        });
                    }
                }
            });
        });
    }
    /***
 *
 * Get User Info By Id
 *
 ****/
    async GetUserInfoById(id): Promise<ReponseModel> {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ _id: id }, (error, user) => {
                if (!user) {
                    reject("Can not find user");
                }
                let reponseModel: ReponseModel = {
                    userId: user._id,
                    userName: user.email,
                    userSucuritystamp: user.securityStamp,
                    roleId: [],
                    roleSecurityStamp: [],
                    permission: []
                };

                UserModel.findOne({ _id: user._id })
                    .populate({
                        path: "userRole",
                        populate: {
                            path: "roleId",
                            select: 'id securityStamp'
                        },
                    })
                    .exec()
                    .then((user) => {
                        user.userRole.roleId.forEach((role) => {
                            reponseModel.roleId.push(role.id)
                            reponseModel.roleSecurityStamp.push(role.securityStamp)
                        })
                        RolePermissionRepository.GetAllPermissonsByRoles(
                            user.userRole.roleId
                        ).then(async (data) => {
                            reponseModel.permission = data;
                            resolve(reponseModel);
                        })
                    })
            });
        })
    }
}