import { json, Router } from "express";
import { myPayments, pay } from "../controllers/payment.controller.js";
const router = Router();

router.post("/pay", json(), pay);
router.post("/my-payments", json(), myPayments);

export default router;
