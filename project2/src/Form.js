import React from "react";
import { useForm } from "./Hook";
import { Link } from "react-router-dom";
import axios from "axios";

import { useHistory } from "react-router-dom";

function Form() {
  let history = useHistory();

  const validateForms = values => {
    let errors = {};
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (values.firstName === "") {
      errors.firstName = "First Name is required";
    }
    if (values.lastName === "") {
      errors.lastName = "First Name is required";
    }
    if (values.email === "") {
      errors.email = "email Is required";
    } else {
      if (emailPattern.test(values.email) == false) {
        errors.email = "email Is required";
      }
    }

    return errors;
  };
  const addUser = () => {
    console.log("addUser called");
  };

  const { errors, values, onFormChange, onFormSubmit } = useForm(
    addUser,
    {
      firstName: "",
      lastName: "",
      email: ""
    },
    validateForms
  );
  const handleSubmit = e => {
    onFormSubmit(e);
    axios.post("http://localhost:3000/users", values).then(res => {
      console.log(res);
      history.push("/user");
    });
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="email"
            className={`form-control ${errors.firstName && "is-invalid"}`}
            value={values.firstName}
            name="firstName"
            onChange={e => {
              onFormChange(e);
            }}
          />
          {errors.firstName && (
            <span style={{ color: "red" }}>{errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName && "is-invalid"}`}
            name="lastName"
            value={values.lastName}
            onChange={e => {
              onFormChange(e);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Email</label>
          <input
            type="text"
            className={`form-control ${errors.email && "is-invalid"}`}
            name="email"
            value={values.email}
            onChange={e => {
              onFormChange(e);
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={e => {
            handleSubmit(e);
          }}
          disabled={Object.values(values).length === 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
