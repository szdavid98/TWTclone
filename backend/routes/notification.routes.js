import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications,getAdminNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.get("/log", protectRoute,getAdminNotifications);
router.delete("/", protectRoute, deleteNotifications);

export default router;