export const getReportData = (sales) => {
  const orderProductsArray = sales.map((sale) => sale.order_products).flat();
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
