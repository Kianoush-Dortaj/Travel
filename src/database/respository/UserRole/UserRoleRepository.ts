import { SettingModel, SETTING_ENUM } from './../../model/Setting';
import redis from './../../../utilitie/Redis/RedisRepository';
import { UserRoleModel } from "./../../model/UserRole";
import { UserModel } from "./../../model/User";
import UniqueString from "unique-string";

export default new class UserRoleRepository {

    /***
     *
     * Set User Role
     *
     ****/
    SetUserRole(userId) {
        return new Promise((resolve, reject) => {
            redis.Get(SETTING_ENUM.REGISTER_SETTING).then((data) => {
                if (data) {
                    var userRole = new UserRoleModel();
                    userRole.userId = userId;
                    userRole.roleId.push(data['adminRegister']);
                    userRole
                        .save()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
        });
    }
    /***
     *
     * Change User Role
     *
     ****/
    ChangeUserRole(userId, roleId) {
        return new Promise((resolve, reject) => {
            UserRoleModel.updateOne(
                {
                    userId: userId,
                },
                { roleId: [...roleId] },
                (error, res) => {
                    if (error) reject(error);
                    UserModel.updateOne(
                        { _id: userId },
                        { $set: { securityStamp: UniqueString() } }
                    )
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((err) => reject(err));
                    resolve(res);
                }
            );
        });
    }

}