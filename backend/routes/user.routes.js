import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import {followUnfollowUser, getUserProfile, getSuggestedUsers, updateUserProfile } from '../controllers/user.controllers.js'

const router = express.Router()


router.get("/profile/:username",protectRoute, getUserProfile)
router.get("/suggested", protectRoute,getSuggestedUsers)
router.post("/follow/:id",protectRoute, followUnfollowUser)
router.post("/update",protectRoute, updateUserProfile)
export default router