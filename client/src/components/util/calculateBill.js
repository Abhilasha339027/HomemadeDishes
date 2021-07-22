export const calculateBill = ({ pricePerItem, miscData, orderItems, pref }) => {
  const finalPrice = {};
  finalPrice.pricePerItem = pricePerItem.reduce((a, b) => a + b, 0);
  // finalPrice.tax = miscData.getMisc.tax;
  if (pref?.deliveryOption === "delivery") {
    finalPrice.deliveryFee = orderItems[0].chefAll?.deliveryFee;
  }

  if (finalPrice.deliveryFee) {
    finalPrice.total = finalPrice.pricePerItem + finalPrice.deliveryFee;
  } else {
    finalPrice.total = finalPrice.pricePerItem;
  }
  // finalPrice.serviceFee = 0.25 * finalPrice.total;
  finalPrice.finalPrice = finalPrice.total;

  return finalPrice;
};
