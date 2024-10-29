import express from 'express';
import {getMe, login,loginFA,logout,loginFAcheck,reqacc,/*signup*/} from '../controllers/auth_controller.js';
const router = express.Router();
import { protectRoute, protect2FA } from "../middleware/protectRoute.js";

router.get("/me",protectRoute,getMe);
//router.post("/signup",signup);
router.post("/login",login);
router.get("/ttauth",loginFA);
router.post("/ttauthcheck",protect2FA,loginFAcheck);
router.post("/logout",logout);
router.post("/acc",reqacc)



export default router