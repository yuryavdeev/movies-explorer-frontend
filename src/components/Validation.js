import React, { useCallback } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value}); // разобраться - обнуляется форма
  };

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    //validationMessage возвр. span c сообщ. об ошибке проверки для текущего поля формы
    setErrors({...errors, [name]: target.validationMessage });
    // checkValidity возвр. true, если значение элемента проходит валидацию, иначе - false
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback( //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}