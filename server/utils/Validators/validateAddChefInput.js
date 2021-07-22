const { postcodeValidator } = require("postcode-validator");

module.exports.validateAddChefInput = ({ ...info }) => {
  const errors = {};

  // Validate firstName
  if (info.firstName.trim() === "") {
    errors.firstName = "First name shouldn't be empty";
  }

  // Validate Handle
  if (info.handle.trim() === "") {
    errors.handle = "Handle shouldn't be empty";
  } else if (info.handle.trim().length < 4) {
    errors.handle = "Handle should be at least 4 characters";
  }

  // Validate lastName
  if (info.lastName.trim() === "") {
    errors.lastName = "Last name shouldn't be empty";
  }

  if (info.email.trim() === "") {
    errors.email = "Email field shouldn't be empty";
  } else {
    let regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!info.email.match(regExp)) {
      errors.email = "Invalid Email";
    }
  }

  if (info.avatar?.trim() === "") {
    errors.avatar = "Avatar field shouldn't be empty";
  }

  if (info.phone.trim() === "") {
    errors.phone = "Phone field shouldn't be empty";
  }

  if (!info.zipCode || !postcodeValidator(info.zipCode.toString(), "US")) {
    errors.zipCode = "Zip Codes must be US based";
  }

  if (info.cuisine.length < 1 || info.cuisine.length > 5) {
    errors.cuisine = "Cuisine should not be empty";
  }

  if (info.bio.trim() === "") {
    errors.bio = "Bio should not be empty";
  }

  if (info.placeId.trim() === "") {
    errors.streetAddress = "Street Address field shouldn't be empty";
  }

  if (info.dietary.length < 1) {
    errors.dietary = "Add at least one diet element";
  }

  if (info.tags.length < 1) {
    errors.tags = "Add at least one diet element";
  }

  if (info.deliveryDays.length < 1) {
    errors.deliveryDays = "Add at least one delivery day";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
