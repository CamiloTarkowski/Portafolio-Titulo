import { Router } from "express";
import { getAllNotifications } from "../controllers/notifications.controller.js";
const router = Router();

router.get("/notifications/:id", getAllNotifications);

export default router;
