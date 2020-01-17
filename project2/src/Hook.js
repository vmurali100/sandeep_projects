import { useState } from "react";

export const useForm = (callback, initialState, validation) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [errors, setErrros] = useState({});

  const onFormChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onFormSubmit = () => {
    //The following Line will get Object Return if any Errors Exist
    const valudatedObj = validation(values);
    if (Object.keys(valudatedObj).length === 0) {
      setErrros(valudatedObj);
    } else {
      setErrros(valudatedObj);
    }
  };
  return {
    values,
    errors,
    onFormChange,
    onFormSubmit
  };
};
