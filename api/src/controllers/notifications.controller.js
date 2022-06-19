import axios from "axios";
import { response } from "express";

export const getAllNotifications = async (req, res = response) => {
  const { id } = req.params;

  const { data } = await axios.get(`http://localhost:4444/notifications`);

  console.log("a");
  console.log(data);
  return res.json("a");
};
export const getNotification = async (req, res) => {};
export const createNotification = async (req, res) => {};
