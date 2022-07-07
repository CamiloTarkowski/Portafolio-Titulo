import { response } from "express";
import { Stripe } from "stripe";
import axios from "axios";

// token para hacer transacciones con stripe
const stripe = new Stripe(
  "sk_test_51LCowUBKpY1HISMEgZvr9juQoEhSj5zepd3L75768L61KMQAwbKpHf4Xb1UNJc6q7aPtZHHgnJprrHHbVqjCKnku00an9Eyimi"
);

/* Crea un intento de pago, si sale bien retorna el secreto del cliente, si falla retorna un error */
export const pay = async (req, res = response) => {
  try {
    // se extrae el monto del body de la peticion
    const { amount } = req.body;

    // se pasan de dinero en clp a centavos de dolar
    const DOLAR_TO_CENTS = (Number(amount) / 950) * 100;
    const UsdAmount = Math.round(DOLAR_TO_CENTS);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: UsdAmount,
      currency: "USD",
      payment_method_types: ["card"],
    });

    res.status(201).json(paymentIntent.client_secret);
  } catch (error) {
    return res.json({
      type: "error",
      message: "Error al realizar el pago",
      error: error.message,
    });
  }
};

export const myPayments = async (req, res = response) => {
  const { id } = req.body;

  const { data } = await axios.get(`http://localhost:1337/orders`);

  const orders = data.filter(
    (order) =>
      (order.client.id == id && order.order_state.state == "Pedido") ||
      order.order_state.state == "Agendado"
  );

  return res.json(orders);
};
