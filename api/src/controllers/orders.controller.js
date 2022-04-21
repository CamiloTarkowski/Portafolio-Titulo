import { response } from "express";

export const _ = async (req, res = response) => {
  return res.status(200).json({
    hola: "hola",
  });
};
