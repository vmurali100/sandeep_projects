import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
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
  const [myUser, setMyUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: ""
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    updateUser();
  });
  const updateUser = () => {
    return axios.put("http://localhost:3000/users/" + myUser.id, myUser);
  };
  const handleClose = user => {
    updateUser().then(res => {
      axios.get("http://localhost:3000/users").then(response => {
        dispatch({ type: "GET_CONTACTS", payLoad: response.data });
        setShow(false);
      });
    });
  };
  const handleShow = user => {
    setMyUser(user);
    setShow(true);
  };
  const handleChange = e => {
    setMyUser({ ...myUser, [e.target.name]: e.target.value });
  };
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
          {state.users.map((user, index) => {
            return (
              <tr key={index}>
                {Object.values(user).map(val => {
                  return <td>{val}</td>;
                })}
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleShow(user);
                    }}
                  >
                    Edit
                  </Button>
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>{myUser.firstName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="test"
                            name="firstName"
                            defaultValue={myUser.firstName}
                            onChange={e => {
                              handleChange(e);
                            }}
                          />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                          <Form.Label>Last Nmae</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            defaultValue={myUser.lastName}
                            onChange={e => {
                              handleChange(e);
                            }}
                          />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            defaultValue={myUser.email}
                            onChange={e => {
                              handleChange(e);
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleClose(user);
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
