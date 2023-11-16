import React from 'react';

export function useForm(inputValues={}) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (evt) => {
    const {value, name} = evt.target;
    setValues({...values, [name]: value});
  };

  const handleCheckbox = (evt) => {
    const {checked, name} = evt.target;
    setValues({...values, [name]: checked});
  };

  return {values, handleChange, handleCheckbox, setValues};
}
