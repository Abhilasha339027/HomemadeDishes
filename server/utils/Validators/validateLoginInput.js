module.exports.validateLoginInput = (email, password) => {
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

  if (password === "") {
    errors.password = "password field shouldn't be empty";
  } else {
    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
