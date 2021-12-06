import React from "react";
import "./Pagination.scss";

export default function Pages({ amountPerPage, totalAmount, pageNumber }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAmount / amountPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="numBar">
      <div className="numContainer">
        {pageNumbers &&
          pageNumbers.map((num) => {
            return (
              <button
                key={num}
                className="number"
                onClick={() => pageNumber(num)}
              >
                {num}
              </button>
            );
          })}
      </div>
    </nav>
  );
}
