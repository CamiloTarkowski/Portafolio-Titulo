import express, { json } from "express";
import cors from "cors";
import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./database/config.js";

// Crear el servidor de express
const app = express();
dotenv.config();

connectDB();

// CORS
app.use(cors());
// JSON parser
app.use(json());

// Rutas
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/users", userRoutes);

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
