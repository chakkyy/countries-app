import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getActivities } from "../../redux/actions";
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar({ sort, contFilter, actFilter, actNameFilter }) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  let actividades = activities.map((e) => {
    return e.name;
  });
  const actividadesFiltradas = new Set(actividades);
  let resultActividades = [...actividadesFiltradas];

  function handleClick(e) {
    dispatch(getAllCountries());
  }

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/countries" className="link">
          <h1 className="earth" onClick={handleClick}>
            My 🌎 <span className="app">APP</span>
          </h1>
        </Link>
        <Searchbar />
        <div className="filterContainer">
          {/* filtro por continente */}
          <select className="filter" onChange={(e) => contFilter(e)}>
            <option value="All">Filter by region...</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          {/* filtro por estacion */}
          <select className="filter" onChange={(e) => actFilter(e)}>
            <option value="All">Filter activities by season...</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>

          {/* filtro por actividad */}
          <select className="filter" onChange={(e) => actNameFilter(e)}>
            <option value="All">Seleccionar</option>
            {resultActividades[0] ? (
              resultActividades.map((e) => (
                <option className="options" value={e}>
                  {e}
                </option>
              ))
            ) : (
              <option value="No Activity"> No Hay Actividades </option>
            )}
          </select>

          {/* orden por nombre o poblacion */}
          <select className="filter" onChange={(e) => sort(e)}>
            <option value="AZ">Sort by...</option>
            <option value="AZ">Name (A-Z)</option>
            <option value="ZA">Name (Z-A)</option>
            <option value="populationAsc">Population (asc)</option>
            <option value="populationDesc">Population (desc)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
