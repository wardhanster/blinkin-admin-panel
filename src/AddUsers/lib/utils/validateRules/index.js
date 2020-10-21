export default function validate(values, passType) {
  let errors = {};
  if (!values.email) {
    errors.email =
      window.strings.Dashboard_emailRequired || "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = window.strings.emailInvalid || "Email address is invalid";
  }
  if (passType) {
    if (!values.password) {
      errors.password =
        window.strings.Dashboard_passwordRequired || "Password is required";
    } else if (values.password.length < 6) {
      errors.password =
        window.strings.Dashboard_passwordCases ||
        "Password must be 6 or more characters";
    }
  }

  if (!values.name) {
    errors.name = window.strings.Dashboard_nameRequired || "Name is required";
  } else if (values.name.length < 3) {
    errors.name =
      window.strings.Dashboard_nameCases || "Name Minumum 3 Characters";
  }
  if (!values.userCountryCode) {
    errors.country =
      window.strings.Dashboard_countryRequired || "Country is required";
  } else if (!values.userCountryCode.label && !values.userCountryCode.value) {
    errors.country =
      window.strings.Dashboard_countryRequired || "Country is required";
  }

  return errors;
}
