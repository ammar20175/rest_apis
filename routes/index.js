import express from "express"
import { registerController } from "../controllers";
const router = express.Router();

//routes
router.post('/register', registerController.register);


export default router