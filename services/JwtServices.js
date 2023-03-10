import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";

class JwtServices {
    static sign(payload, expiry = '60s', secret = JWT_KEY) {

        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(payload, secret = JWT_KEY) {

        return jwt.verify(payload, secret);
    }

    
}

export default JwtServices