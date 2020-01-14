import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
    state: "",
    subjects: []
  });
  const [users, setUsers] = useState([]);

  const handleChange = e => {
    console.log("Name ", e.target.name);
    console.log("Value ", e.target.value);

    //If Not Radio Buttons & Check Boxes , values can be Captured Directly .. No need to Loop
    if (e.target.name !== "gender" && e.target.name !== "subjects") {
      setUser({ ...user, [e.target.name]: e.target.value });
    } else if (e.target.name === "gender") {
      //If It is Gender , then we need to Capture all the HTML Radio Buttons as follows
      let allGenders = document.getElementsByName("gender");

      //Looping Through all the radio Buttons , and finding which element is checked , then that elements value will be captured
      allGenders.forEach(ele => {
        console.log(ele.checked);
        if (ele.checked) {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      });
    } else if (e.target.name === "subjects") {
      let checkBoxValues = [];
      let allCheckBoxes = document.getElementsByName("subjects");
      allCheckBoxes.forEach(cbox => {
        if (cbox.checked) {
          checkBoxValues.push(cbox.value);
        }
      });
      setUser({ ...user, [e.target.name]: checkBoxValues });
    }
  };

  const editUser = () => {
    console.log("editUser is Called");
  };

  const deleteUser = () => {
    console.log("editUser is Called");
  };

  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <form>
        <label>First Name : </label>
        <input
          type="text"
          value={user.fname}
          name="fname"
          onChange={e => {
            handleChange(e);
          }}
        />
        <br />
        <label>Last Name : </label>
        <input
          value={user.lname}
          name="lname"
          onChange={e => {
            handleChange(e);
          }}
        />
        <br />
        <label>Email</label>
        <input
          value={user.email}
          name="email"
          onChange={e => {
            handleChange(e);
          }}
        />
        <br />
        <label>Phone Number : </label>
        <input
          value={user.phone}
          name="phone"
          onChange={e => {
            handleChange(e);
          }}
        />
        <br />
        <label>Gender</label>
        Male
        <input
          type="radio"
          value="Male"
          name="gender"
          onChange={e => {
            handleChange(e);
          }}
        />
        Female
        <input
          type="radio"
          value="Female"
          name="gender"
          onChange={e => {
            handleChange(e);
          }}
        />
        <br />
        <label>City : </label>
        <select
          onChange={e => {
            handleChange(e);
          }}
        >
          <option value="Bangalore">Bangalore</option>
          <option value="Kochin">Kochin</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
        <br />
        <label>Subjects : </label>
        <input
          type="checkbox"
          value="HTML"
          name="subjects"
          onChange={e => {
            handleChange(e);
          }}
        />
        HTML
        <input
          type="checkbox"
          value="CSS"
          name="subjects"
          onChange={e => {
            handleChange(e);
          }}
        />
        CSS
        <input
          type="checkbox"
          value="Javascript"
          name="subjects"
          onChange={e => {
            handleChange(e);
          }}
        />
        Javascript
        <input
          type="checkbox"
          value="ReactJS"
          name="subjects"
          onChange={e => {
            handleChange(e);
          }}
        />
        ReactJS
        <br />
        <button
          onClick={() => {
            let newUsers = [...users];
            newUsers.push(user);
            setUsers(newUsers);
          }}
          type="button"
        >
          Add User
        </button>
      </form>
      <hr></hr>
      {users.map(user => {
        return (
          <div key={user.fname}>
            {Object.values(user).map(val => {
              return <p key={val}>{val}</p>;
            })}
            <button onClick={editUser}>Edit</button>
            <button onClick={deleteUser}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
