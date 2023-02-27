import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";

const userController = {

    async me(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user.id }).select('-password -updatedAt -__v')
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }

            res.json(user);

        } catch (err) {

            return next(err);

        }

    }
}

export default userController;