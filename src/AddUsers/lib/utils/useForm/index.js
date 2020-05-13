import { useState, useEffect } from "react";

const useForm = (callback, validate, passType) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values, passType));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const handleCountryChange = (options, e) => {
    setValues(values => ({
      ...values,
      [e.name]: { ...options }
    }));
  };

  const handleReset = () => {
    setValues({});
    // setErrors({});
    setIsSubmitting(false);
  };

  const handleClear = () => {
    setValues({});
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    handleChange,
    handleSubmit,
    handleClear,
    handleCountryChange,
    values,
    errors,
    handleReset
  };
};

export default useForm;
