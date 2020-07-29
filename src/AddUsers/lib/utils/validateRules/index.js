export default function validate(values, passType) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (passType) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 7) {
      errors.password = "Password must be 6 or more characters";
    }
  }

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name Minumum 3 Characters";
  }
  if (!values.userCountryCode) {
    errors.country = "Country is required";
  } else if (!values.userCountryCode.label && !values.userCountryCode.value) {
    errors.country = "Country is required";
  }

  return errors;
}
