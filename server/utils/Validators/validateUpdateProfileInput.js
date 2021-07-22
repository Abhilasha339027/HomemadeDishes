module.exports.validateUpdateProfileInput = (firstName, lastName, email) => {
  const errors = {};

  // Validate email
  if (email.trim() === "") {
    errors.email = "Email field shouldn't be empty";
  } else {
    let regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExp)) {
      errors.email = "Invalid Email";
    }
  }

  if (firstName.trim() === "") {
    errors.firstName = "First Name shouldn't be empty";
  }

  if (lastName.trim() === "") {
    errors.firstName = "Last Name shouldn't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
