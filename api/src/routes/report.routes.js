import { Router } from "express";
import { createReport } from "../controllers/report.controller.js";
const router = Router();

// Crea un reporte de todos los pedidos
router.post("/report", createReport);

export default router;
