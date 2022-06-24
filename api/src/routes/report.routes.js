import { Router } from "express";
import { createReport } from "../controllers/report.controller.js";
const router = Router();

router.post("/report", createReport);

export default router;
