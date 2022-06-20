import axios from "axios";
import { response } from "express";

export const getAllNotifications = async (req, res = response) => {
  const { id } = req.params;
  const { data: notifications } = await axios.get(
    `http://localhost:1337/notifications`
  );

  const userNotifications = notifications.filter(
    (notification) => notification.order.client == id
  );

  return res.json(userNotifications);
};
