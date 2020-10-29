import passport from 'passport';
import { UserModel } from './../database/model/User';
import UserRepository from './../database/respository/User/UserRepository';
const localStrategy = require("passport-local").Strategy;


passport.serializeUser((user, done) => {
    done(null, user.userId);
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    })
})


passport.use('local.login',
    new localStrategy(
        { usernameField: "userName", passwordField: "password", passReqToCallback: true },
        function (req, email, password, done) {
            try {
                UserRepository.GetUserforLogin(email, password)
                    .then((data) => {
                        return done(null, data);
                    })
                    .catch((error) => {
                        return done(null, false, { message: error });
                    });
            } catch (error) {
                return done(null, false, { message: error.message });
            }
        }
    )
);


export class PassportLocal {


    constructor() { }



}