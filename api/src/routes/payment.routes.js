import { json, Router } from "express";
import { myPayments, pay } from "../controllers/payment.controller.js";
const router = Router();

router.post("/pay", json(), pay);
router.get("/my-payments", myPayments);

export default router;
