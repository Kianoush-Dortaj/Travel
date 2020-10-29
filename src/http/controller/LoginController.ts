import BaseCotnroller from './BaseController';
import passport from "passport";
import jwt from './../../database/respository/JWT/JWTRepository';

export default new class LoginController extends BaseCotnroller {

    constructor() {
        super();
    }

    Login(req, res, next) {
        try {
            passport.authenticate("local.login", (err, user, info) => {
                if (info) {
                    this.BadRerquest(res, info.message);
                } else if (user) {
                    req.login(user, err => {
                        if (err) console.log(err)
                        return this.OkObjectResult(res, jwt.GenerateToken(user));
                    })
                } else if (err) {
                    this.BadRerquest(res, err);
                }
            })(req, res, next);
        } catch (error) {
            this.BadRerquest(res, error.message);
        }
    }

}