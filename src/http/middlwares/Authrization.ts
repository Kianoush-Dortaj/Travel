import middlware from './Middlware';
import jwt from './../../database/respository/JWT/JWTRepository';
import userRepository from './../../database/respository/User/UserRepository';
import { AuthFailureResponse } from './../../core/api/ApiRespose';

export default new class Authrization extends middlware {


    async AuthToken(req, res, next) {

        jwt.DecodeToken(req)
            .then(tokenInfo => {
                userRepository.GetUserInfoById(tokenInfo.userId)
                    .then(userInfo => {
                        for (let index = 0; index < userInfo.roleSecurityStamp.length; index++) {
                            if (userInfo.roleSecurityStamp[index] != tokenInfo.roleSecurityStamp[index]) {
                                return new AuthFailureResponse().send(res);
                            }
                        }
                        if (userInfo.userSucuritystamp != tokenInfo.userSucuritystamp) {
                            return new AuthFailureResponse().send(res);
                        } else {
                            next();
                        }
                    }).catch(() => {
                        return new AuthFailureResponse().send(res);
                    })
            })
            .catch((err) => {
                return new AuthFailureResponse().send(res);
            })
    }


}