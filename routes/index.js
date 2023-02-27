import express from "express"
import { registerController, loginController, userController } from "../controllers";
import auth from "../middlewares/auth";

const router = express.Router();

//routes
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);

export default router