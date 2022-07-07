import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import notificationRoutes from "./routes/notifications.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reportRoutes from "./routes/report.routes.js";

// configura el archivo .env (variable e entorno de la aplicacion)
dotenv.config();

// crea una instancia de express
const app = express();

// permite que se puedan hacer peticiones desde cualquier origen
app.use(cors());

app.use("/api", notificationRoutes);
app.use("/api", paymentRoutes);
app.use("/api", reportRoutes);

// CONTROLLERS: son archivos que contienen la logica y tienen 2 parametros en sus funciones: req (request) y res (response)

// ROUTES: son las rutas que se usan para acceder a los controladores y son las que se usan en el frontend

// Se crea el proxy que actua como intermediario para redireccionar las peticiones a la API
app.use(
  createProxyMiddleware({
    target: "http://localhost:1337",
    changeOrigin: true,
  })
);

// Se crea el server y se pone en escucha
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
