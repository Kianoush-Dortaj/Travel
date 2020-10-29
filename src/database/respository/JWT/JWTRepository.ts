import jwt from "jsonwebtoken";
import { ReponseModel } from "../User/UserRepository";

export default new class JWTRepository {

    GenerateToken(info) {
        var payload = {
            iss: "a57bb14a44455e98800d6a513953fc0",
            sub: "a57bb14a445541e98800d6a513953fc0",
            aud: "TravelBudy.com",
            expiresIn: 360,
            iat: 360,
        };
        return jwt.sign({ info: info, payload }, "shhhhh", { expiresIn: 60 * 24 });
    }

    DecodeToken(req): Promise<ReponseModel> {
        return new Promise((resolve, reject) => {
            const getTokenFrom = (req) => {
                const authorization = req.headers["authorization"];
                if (
                    authorization &&
                    authorization.toLowerCase().startsWith("bearer ")
                ) {
                    return authorization.substring(7);
                }
                return null;
            };

            const token = getTokenFrom(req);
            jwt.verify(token, "shhhhh", (err, decoded) => {
                if (err) reject(err);
                resolve(decoded.info);
            });
        });
    }
};
