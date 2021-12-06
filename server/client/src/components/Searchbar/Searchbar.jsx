import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import "./Searchbar.scss";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  function handleChange(e) {
    e.preventDefault();
    //mediante el estado local 'value' controlo el formulario
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      dispatch(getCountriesByName(value));
      setValue("");
    }
  }

  return (
    <div className="sb__container">
      <input
        className="sb__input"
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder="Search countries..."
      />
      <button
        className="sb__button"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Search
      </button>
    </div>
  );
}
