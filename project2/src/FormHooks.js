import { useState } from "react";

//Will receive 3 Parameters Callback , state and validate function
export const useForm = () => {
  // Create a values with initial State
  const [values, setValues] = useState({});

  return {
    values
  };
};
