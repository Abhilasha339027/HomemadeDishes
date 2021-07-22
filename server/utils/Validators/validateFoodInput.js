module.exports.validateFoodInput = (user, args) => {
  const errors = {};

  if (args.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (args.allergyWarning.trim() === "") {
    errors.allergyWarning = "Allergy Warning is required";
  }

  if (args.description.trim() === "") {
    errors.description = "Description is required";
  }

  if (args.category.trim() === "") {
    errors.category = "Catergory is required";
  }

  if (args.portionSize < 12) {
    errors.portionSize = "Portion Size must not be less than 12 oz container";
  }

  if (args.price < 5) {
    errors.price = "Price must note be less than $5.00";
  }

  if (args.ingredients.length < 1) {
    errors.ingredients = "Ingredients must have at least one element";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};
