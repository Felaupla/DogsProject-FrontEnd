import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
  filterDogsByOrigin,
  sortByName,
  sortByWeight,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paging from "./Paging";
import SearchBar from "./SearchBar";
import "../styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  // Paging:
  const [currentPage, setCurrentPage] = useState(1); // Saves  local state and sets de actual state. It`s 1 because it´s the start page.
  const [dogsPerPage /*_setDogsPerPage*/] = useState(8); // How much dogs needed by page.
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Los perros mostrados en cada página serán los que estén en la porción que va desde el primero hasta el último de cada página, de la lista total de perros.

  const [, /*_orden*/ setOrden] = useState(""); // Local state to change order of dogs and renderize them by the way that I want.

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //---------------------------------------------------------------------

  // Ahora voy a traerme del estado los perros cuando el componente se monta:
  useEffect(() => {
    // useEffect simula los lifecycles de los estados locales.
    dispatch(getDogs()); // Este dispatch es lo mismo que hacer el mapDispatchToProps
  }, [dispatch]); // El segundo parámetro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse.

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getDogs());
  }

  function handleFilterTemperaments(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilterOrigin(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByOrigin(e.target.value));
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="home">
      <div className="divNB">
        <ul className="navbar">
          <li>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="elementNB"
            >
              Home
            </button>
          </li>
          <li>
            <Link to="/dogs">
              <button className="elementNB">Create dog</button>
            </Link>
          </li>
          <li className="content-select">
            <select onChange={(e) => handleSortByName(e)}>
              <option value="selected" hidden className="elementNB">
                Sort breeds by name
              </option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </li>
          <li className="content-select">
            <select onChange={(e) => handleSortByWeight(e)}>
              <option value="selected" hidden>
                Sort by weight
              </option>
              <option value="asc">Lighter to heavier</option>
              <option value="desc">Heavier to lighter</option>
            </select>
          </li>
          <li className="content-select">
            <select onChange={(e) => handleFilterTemperaments(e)}>
              <option key={0} value="all">
                All temperaments
              </option>
              {allTemperaments
                ?.sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </li>
          <li className="content-select">
            <select onChange={(e) => handleFilterOrigin(e)}>
              <option value="all">All breeds</option>
              <option value="api">Existent breeds</option>
              <option value="created">Created breeds</option>
            </select>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>

      <Link to="/">
        <button className="welcome">
          <span>Welcome Page</span>
        </button>
      </Link>

      <h1> Dog Finder / Creator </h1>

      <h3> Browse by pages </h3>

      <Paging
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paging={paging}
      />

      <div className="container">
        {currentDogs.map((el) => {
          return (
            <div key={el.id} className="cardHome">
              <Link to={"/home/" + el.id} style={{ textDecoration: "none" }}>
                <Card
                  name={el.name}
                  image={el.image}
                  temperaments={el.temperaments}
                  weight={el.weight}
                  key={el.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <h3> Browse by pages </h3>
      <Paging
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paging={paging}
      />
      <Link to="/">
        <button className="welcome">
          <span>Welcome Page</span>
        </button>
      </Link>
    </div>
  );
}
