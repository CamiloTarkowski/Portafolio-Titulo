import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import notificationRoutes from "./routes/notifications.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reportRoutes from "./routes/report.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use("/api", notificationRoutes);
app.use("/api", paymentRoutes);
app.use("/api", reportRoutes);

app.use(
  createProxyMiddleware({
    target: "http://localhost:1337",
    changeOrigin: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
