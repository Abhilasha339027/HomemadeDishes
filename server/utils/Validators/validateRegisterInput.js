module.exports.validateRegisterInput = (
  firstName,
  lastName,
  handle,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  // Validate firstName
  if (firstName.trim() === "") {
    errors.firstName = "First name shouldn't be empty";
  }

  // Validate Handle
  if (handle.trim() === "") {
    errors.handle = "Handle shouldn't be empty";
  } else if (handle.trim().length < 4) {
    errors.handle = "Handle should be at least 4 characters";
  }

  // Validate lastName
  if (lastName.trim() === "") {
    errors.lastName = "Last name shouldn't be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email field shouldn't be empty";
  } else {
    let regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExp)) {
      errors.email = "Invalid Email";
    }
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

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
