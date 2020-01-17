import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "DELTE_USER":
      return {
        users: action.payLoad
      };
    case "UPDATE_USER":
      return {
        users: state
      };
    case "GET_CONTACTS":
      return {
        users: action.payLoad
      };

    default:
      break;
  }
};
const defaultState = { users: [] };

export default function User() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const getUsers = type => {
    axios.get("http://localhost:3000/users").then(response => {
      dispatch({ type: type, payLoad: response.data });
    });
  };
  useEffect(() => {
    getUsers("GET_CONTACTS");
  }, []);

  const deleteUser = user => {
    axios.delete("http://localhost:3000/users/" + user.id).then(res => {
      getUsers("DELTE_USER");
    });
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map(user => {
            return (
              <tr>
                {Object.values(user).map(val => {
                  return <td>{val}</td>;
                })}
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUser(user);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
