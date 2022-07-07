import axios from "axios";
import { response } from "express";

/* Obtiene todas las notificaciones  para un usuario especifico */
export const getAllNotifications = async (req, res = response) => {
  const { id } = req.params;
  const { data: notifications } = await axios.get(
    `http://localhost:1337/notifications`
  );

  // filtra las notificaciones que pertenecen al usuario
  const userNotifications = notifications.filter(
    (notification) => notification.order.client == id
  );

  // retorna las notificaciones
  return res.json(userNotifications);
};
