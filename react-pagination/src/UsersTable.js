import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function UsersTable(props) {
  const { currentUsers } = useContext(UserContext);
  console.log(currentUsers);
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Tel</th>
            <th>Address</th>
            <th>City</th>
            <th>Tel</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              {Object.values(user).map(val => (
                <td key={val}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
