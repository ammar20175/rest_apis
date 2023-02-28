import express from "express"
import { registerController, loginController, userController, refreshController, productController } from "../controllers";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin"

const router = express.Router();

//routes
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout)

//products routes
router.post('/products', [auth, admin], productController.store);

router.put('/products/:id', [auth, admin], productController.update);
router.delete('/products/:id', [auth, admin], productController.destory)
router.get('/products', productController.index)
router.get('/products/:id', productController.single)

export default router