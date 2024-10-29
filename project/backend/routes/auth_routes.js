import express from 'express'
import { reqacc,login,logout,getMe} from '../controllers/auth.controllers.js';
import { protectRoute } from '../mid/protectRoute.js';
const router = express.Router();

router.post("/logout",protectRoute,logout)
router.get("/me",protectRoute,getMe)
router.post("/login",login)
router.post("/signup", reqacc)

export default router