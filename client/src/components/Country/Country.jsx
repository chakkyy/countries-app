import React from "react";
import { Link } from "react-router-dom";
import "./Country.scss";

export function Country({ id, name, continent, flag }) {
  return (
    <Link to={`/countries/${id}`}>
      <div class="box box1">
        <div class="border"></div>
        <img src={flag} alt="national-flag" />
        <div class="caption">
          <div class="content">
            <span>{name}</span>
            <small>{continent}</small>
          </div>
        </div>
      </div>
    </Link>
  );
}
