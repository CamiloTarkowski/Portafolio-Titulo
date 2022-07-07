// Obtiene toda la info de las ordenes para crear el excel
export const getReportData = (sales) => {
  // crea un array con todas las ordenes y los aplana (que todo este en un solo array)
  const orderProductsArray = sales.map((sale) => sale.order_products).flat();

  // crea un array con la info en especifico que se retorna: productCode, productName, productSize, quantity, etc.
  const saleProducts = orderProductsArray.map((sale) => {
    return {
      productCode: sale.product.code,
      productName: sale.product.name,
      productSize: sale.product.size,
      price: parseInt(sale.product.price) * parseInt(sale.quantity),
      quantity: sale.quantity,
    };
  });

  return saleProducts;
};
