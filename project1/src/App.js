import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ fname: "Murali", lname: "Krishna" });
  // const [users, setUsers] = useState([]);
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
            newUser = user;
            console.log(newUser);
            newUser.fname = e.target.value;
            setUser(newUser);
          }}
        />
        <br />
        <label>Last Name : </label>
        <input
          value={user.lname}
          onChange={e => {
            setUser({ lname: e.target.value });
          }}
        />
        <br />
        <button
          onClick={() => {
            console.log(user);
          }}
          type="button"
        >
          Add User
        </button>
      </form>
      <hr></hr>
      {/* {users.map(user => {
        return <div>user.fname</div>;
      })} */}
    </div>
  );
}

let newUser = { fname: "", lname: "" };
export default App;
