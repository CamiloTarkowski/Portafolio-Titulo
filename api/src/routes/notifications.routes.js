import { Router } from "express";
import {
  createNotification,
  getNotification,
  getAllNotifications,
} from "../controllers/notifications.controller.js";
const router = Router();

router.get("/notifications", getAllNotifications);
// router.get("/notification/:id", getNotification);
router.post("/notification", createNotification);

export default router;
