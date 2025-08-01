import express from "express";
import { loginUser, reNewToken } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth-user.middleware.js";
import { createUser } from "../controllers/user.controller.js";

const router = express.Router();

//define las rutas para la entidad auth
router.post('/api/auth/register', createUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/re-new-token', authUser, reNewToken);


export default router;

