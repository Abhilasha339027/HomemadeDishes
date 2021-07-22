module.exports.validateOrderInput = (order) => {
  const errors = {};

  // Validate email

  if (order.streetAddress.trim() === "") {
    errors.streetAddress = "Street Address field shouldn't be empty";
  }

  if (order.addressLine2.trim() === "") {
    errors.addressLine2 = "Address Line 2 field shouldn't be empty";
  }

  if (order.name.trim() === "") {
    errors.name = "Name field shouldn't be empty";
  }

  if (order.phone.trim() === "") {
    errors.phone = "Phone field shouldn't be empty";
  }

  if (order.deliveryInstructions.trim() === "") {
    errors.deliveryInstructions =
      "Delivery Instructions field shouldn't be empty";
  }

  if (order.deliveryDate.trim() === "") {
    errors.deliveryDate = "Delivery Date field shouldn't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
