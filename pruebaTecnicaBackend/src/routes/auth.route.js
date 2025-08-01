import express from "express";
import { loginUser, registerUser, reNewToken } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth-user.middleware.js";


const router = express.Router();

//define las rutas para la entidad auth
router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/re-new-token', authUser, reNewToken);


export default router;

