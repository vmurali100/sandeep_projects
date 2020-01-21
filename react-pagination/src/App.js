import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import UsersTable from "./UsersTable";
import Pagination from "./Pagination";
import { UserContext } from "./UserContext";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    const getusers = () => {
      axios
        .get(
          "http://www.filltext.com/?rows=100&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&zip={zip}&pretty=true"
        )
        .then(res => {
          console.log(res.data);
          setUsers(res.data);
        });
    };
    getusers();
  }, []);

  console.log(users);

  //Calculating Last User
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const changePage = number => {
    console.log(number);
    setCurrentPage(number);
  };
  return (
    <UserContext.Provider
      value={{ currentUsers, users, usersPerPage, changePage }}
    >
      <div className="App container">
        <UsersTable />
        <Pagination />
      </div>
    </UserContext.Provider>
  );
}

export default App;
