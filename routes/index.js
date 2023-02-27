import express from "express"
import { registerController, loginController, userController, refreshController } from "../controllers";
import auth from "../middlewares/auth";

const router = express.Router();

//routes
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);
router.post('/refresh', refreshController.refresh);
router.get('/login', auth, loginController.login)

export default router