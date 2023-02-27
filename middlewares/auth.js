import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtServices from "../services/JwtServices";
const auth = async (req, res, next) => {

    let authHeader = req.headers.authorization;


    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(" ")[1];

    try {
        const { id, role } = await JwtServices.verify(token)

        const user = {
            id,
            role
        }
        
        req.user = user;

        next();

    } catch (err) {

        return next(CustomErrorHandler.unAuthorized());
    }

}

export default auth