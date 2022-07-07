import axios from "axios";
import { response } from "express";
import writeXlsxFile from "write-excel-file/node";
import { getReportData } from "../helpers/getReportData.js";

// Crea un reporte de los pedidos de un usuario
export const createReport = async (req, res = response) => {
  const { data: orders } = await axios.get(`http://localhost:1337/orders`);

  // filtra los pedidos que tengan estado "Pedido"
  const sales = orders.filter((order) => order.order_state.state == "Pedido");
  const salesData = getReportData(sales);

  // crea los headers del excel
  const HEADER_ROW = [
    {
      value: "Nombre producto",
      fontWeight: "bold",
      backgroundColor: "#71afbd",
      borderStyle: "thin",
    },
    {
      value: "Codigo",
      fontWeight: "bold",
      backgroundColor: "#71afbd",
      borderStyle: "thin",
    },
    {
      value: "Talla",
      fontWeight: "bold",
      backgroundColor: "#71afbd",
      borderStyle: "thin",
    },
    {
      value: "Cantidad",
      fontWeight: "bold",
      backgroundColor: "#71afbd",
      borderStyle: "thin",
    },
    {
      value: "Precio",
      fontWeight: "bold",
      backgroundColor: "#71afbd",
      borderStyle: "thin",
    },
  ];

  // Itera por cada orden y la va escribiendo en el excel
  const DATA_ROWS = salesData.map((sale) => {
    return [
      {
        value: sale.productName,
        borderStyle: "thin",
      },
      {
        value: sale.productCode,
        borderStyle: "thin",
      },
      {
        value: sale.productSize,
        borderStyle: "thin",
      },
      {
        value: sale.quantity,
        borderStyle: "thin",
      },
      {
        value: parseInt(sale.price),
        type: Number,
        format: "$#,##0",
        borderStyle: "thin",
      },
      {
        value: "",
      },
    ];
  });

  const data = [HEADER_ROW, ...DATA_ROWS];

  // crea el excel en el escritorio
  await writeXlsxFile(data, {
    filePath: `${process.env.HOMEPATH}/Desktop/report.xlsx`,
  });

  return res.json({ message: "Reporte creado" });
};
