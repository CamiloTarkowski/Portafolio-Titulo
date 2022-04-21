import { Router } from "express";
import { check } from "express-validator";
import { _ } from "../controllers/orders.controller.js";

const router = Router();

router.get("/", _);

export default router;
