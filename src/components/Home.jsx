import React, { useState, useEffect, useCallback, Suspense } from "react";
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
import Paging from "./Paging";
import "../styles/Home.css";

const Card = React.lazy(() => import("./Card"));
const SearchBar = React.lazy(() => import("./SearchBar"));

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const [, setOrden] = useState("");

  const paging = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getDogs());
  }, [dispatch]);

  const handleFilterTemperaments = useCallback((e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByTemperament(e.target.value));
  }, [dispatch]);

  const handleFilterOrigin = useCallback((e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogsByOrigin(e.target.value));
  }, [dispatch]);

  const handleSortByName = useCallback((e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }, [dispatch]);

  const handleSortByWeight = useCallback((e) => {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }, [dispatch]);

  return (
    <div className="home">
      <div className="divNB">
        <ul className="navbar">
          <li>
            <button onClick={handleClick} className="elementNB">Home</button>
          </li>
          <li>
            <Link to="/dogs">
              <button className="elementNB">Create dog</button>
            </Link>
          </li>
          <li className="content-select">
            <select onChange={handleSortByName}>
              <option value="selected" hidden className="elementNB">
                Sort breeds by name
              </option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </li>
          <li className="content-select">
            <select onChange={handleSortByWeight}>
              <option value="selected" hidden>
                Sort by weight
              </option>
              <option value="asc">Lighter to heavier</option>
              <option value="desc">Heavier to lighter</option>
            </select>
          </li>
          <li className="content-select">
            <select onChange={handleFilterTemperaments}>
              <option key={0} value="all">All temperaments</option>
              {allTemperaments
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((el) => (
                  <option key={el.id} value={el.name}>{el.name}</option>
                ))}
            </select>
          </li>
          <li className="content-select">
            <select onChange={handleFilterOrigin}>
              <option value="all">All breeds</option>
              <option value="api">Existent breeds</option>
              <option value="created">Created breeds</option>
            </select>
          </li>
          <li>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
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
        <Suspense fallback={<div>Loading...</div>}>
          {currentDogs.map((el) => (
            <div key={el.id} className="cardHome">
              <Link to={"/home/" + el.id} style={{ textDecoration: "none" }}>
                <Card
                  name={el.name}
                  image={el.image}
                  temperaments={el.temperaments}
                  weight={el.weight}
                />
              </Link>
            </div>
          ))}
        </Suspense>
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
