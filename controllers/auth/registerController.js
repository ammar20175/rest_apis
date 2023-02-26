import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
import bcrypt from "bcrypt"
import JwtServices from "../../services/JwtServices";

const registerController = {
    async register(req, res, next) {

        //first validation of data.Will use joi.

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        //checking for errors.
        const { error } = registerSchema.validate(req.body);

        if (error) {

            return next(error);
        }

        //checking if the user is already in the database

        try {
            const exist = await User.exists({ email: req.body.email });

            if (exist) {

                return next(CustomErrorHandler.alreadyExist('Email already is use'));

            }
        }
        catch (err) {
            //this err will be the default one define in the errorHandler
            return next(err);

        }

        const { name, email, password } = req.body

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //prepare the model
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        let access_token;
        try {
            const result = await user.save();

            access_token = JwtServices.sign({ id: result._id, role: result.role });

        } catch (err) {
            return next(err)
        }

        res.json({ access_token: access_token });

    }
}

export default registerController;