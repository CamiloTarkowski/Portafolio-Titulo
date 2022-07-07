import { json, Router } from "express";
import { myPayments, pay } from "../controllers/payment.controller.js";
const router = Router();

// crea un intento de pago
router.post("/pay", json(), pay);

// obtiene todos los pagos del usuario
router.post("/my-payments", json(), myPayments);

export default router;
