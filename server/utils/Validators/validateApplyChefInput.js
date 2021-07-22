module.exports.validateApplyChefInput = ({
  firstName,
  lastName,
  handle,
  email,
  phone,
  password,
  confirmPassword,
  cuisine,
  zipCode,
}) => {
  const errors = {};

  if (firstName.trim() === "") {
    errors.firstName = "First name field Shouldn't be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name field Shouldn't be empty";
  }

  if (handle.length < 4) {
    errors.handle = "Handle field Should have at least 4 characters";
  }

  if (cuisine.length < 1) {
    errors.cuisine = "You must add at least one cuisine";
  }

  if (zipCode < 1) {
    errors.zipCode = "Please Enter a valid Zip Code";
  }

  if (phone.trim() === "") {
    errors.phone = "Phone field Shouldn't be empty";
  }

  if (password === "") {
    errors.password = "password field shouldn't be empty";
  } else {
    if (password != confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
  }

  if (confirmPassword === "") {
    errors.confirmPassword = "Confirm password field shouldn't be empty";
  }

  // Validate email
  if (email.trim() === "") {
    errors.email = "Email field shouldn't be empty";
  } else {
    let regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExp)) {
      errors.email = "Invalid Email";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
