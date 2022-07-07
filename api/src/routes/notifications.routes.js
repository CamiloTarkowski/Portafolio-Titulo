import { Router } from "express";
import { getAllNotifications } from "../controllers/notifications.controller.js";
const router = Router();

// Obtiene todas las notificaciones  para un usuario especifico
router.get("/notifications/:id", getAllNotifications);

export default router;
