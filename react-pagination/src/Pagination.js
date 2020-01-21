import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Pagination(props) {
  const { users, usersPerPage, changePage } = useContext(UserContext);

  console.log(changePage);
  const pageNumbers = [];
  const totalPages = Math.ceil(users.length / usersPerPage);
  for (let i = 1; i < totalPages; i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

  const message = useContext(UserContext);
  console.log(message);
  return (
    <div>
      <nav>
        <ul class="pagination">
          {pageNumbers.map(number => (
            <li class="page-item" key={number}>
              <a
                class="page-link"
                href="!#"
                aria-label="Previous"
                onClick={() => {
                  changePage(number);
                }}
              >
                <span aria-hidden="true">{number}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
