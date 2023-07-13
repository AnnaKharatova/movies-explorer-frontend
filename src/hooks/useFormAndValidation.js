import React, { useState, useCallback } from 'react';
import { nameRegex } from '../utils/constants'
import validator from 'validator';
import { INPUT_VALUE_MIN_LENGTH, INPUT_VALUE_MAX_LENGTH } from '../utils/constants'

export function useFormAndValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setIsValid(false)
    if (name === "name") {
      if (!nameRegex.test(value)) {
        setErrors({ ...errors, [name]: "Введите правильное имя" });
      } else if (!value) {
        setErrors({ ...errors, [name]: 'Введите имя' });
      } else if (value.length < INPUT_VALUE_MIN_LENGTH || value.length > INPUT_VALUE_MAX_LENGTH) {
        setErrors({
          ...errors, [name]: `Значение должно быть больше ${INPUT_VALUE_MIN_LENGTH} букв и меньше ${INPUT_VALUE_MAX_LENGTH}`
        });
      }
      else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    if (name === "email") {
      if (!validator.isEmail(value)) {
        setErrors({ ...errors, [name]: "Введите правильный адрес электронной почты" });
      } else if (!value) {
        setErrors({ ...errors, [name]: 'Введите адрес электронной почты' });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors };
}
