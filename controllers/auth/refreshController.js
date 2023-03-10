import Joi from 'joi';
import { REFRESH_TOKEN } from '../../config';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtServices from '../../services/JwtServices';

const refreshController = {
    async refresh(req, res, next) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // database
        let refreshtoken;
        try {
            refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
            if (!refreshtoken) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            let userId;
            try {
                const { id } = await JwtServices.verify(refreshtoken.token, REFRESH_TOKEN);
                userId = id;
            } catch(err) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
            }

            const user = await User.findOne({ _id: userId });
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user found!'));
            }

            // Toekn
            const access_token = JwtServices.sign({ id: user._id, role: user.role });
            const refresh_token = JwtServices.sign({ id: user._id, role: user.role }, '1y', REFRESH_TOKEN);
        // database whitelist
            await RefreshToken.create({ token: refresh_token });
            res.json({ access_token, refresh_token });

        } catch(err) {
            return next(new Error('Something went wrong ' + err.message));
        }

    }
};

export default refreshController;