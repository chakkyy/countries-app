import React from "react";
import "./Error.scss";

export default function Error({ text }) {
  return (
    <div class="container">
      <h1>Ups! 😥</h1>
      <h2>{text}</h2>
    </div>
  );
}
