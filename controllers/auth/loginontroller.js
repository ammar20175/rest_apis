import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../../models";
import JwtServices from "../../services/JwtServices"
import CustomErrorHandler from "../../services/CustomErrorHandler";

const loginController = {
    async login(req, res, next) {

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            //compare password
            const match = await bcrypt.compare(req.body.password, user.password)

            if (!match) {
                return next(CustomErrorHandler.wrongCredentials())
            }

            //token
            const access_token = JwtServices.sign({ id: user._id, role: user.role });
            res.json({ access_token });
        } catch (err) {
            return next(err)
        }
    }
}

export default loginController;