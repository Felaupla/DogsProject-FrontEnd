import React, { useEffect, useCallback, Suspense } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import "../styles/Detail.css";

const Loading = React.lazy(() => import("../images/loading.gif"));
const SearchFail = React.lazy(() => import("../images/searchFail.gif"));

const Detail = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params; // To Access ID of the detail object

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);

  const renderTemperaments = useCallback((dog) => {
    if (dog.createdInDb) {
      return dog.temperaments.map((el) => (
        <li key={el.id}>
          <label>{el.name}</label>
        </li>
      ));
    } else if (dog.temperament) {
      return dog.temperament.split(", ").map((el) => (
        <li key={el}>
          <label>{el}</label>
        </li>
      ));
    } else {
      return <li>GRR!!!! There are no temperaments for this dog</li>;
    }
  }, []);

  if (!myDog || myDog.length === 0) {
    return (
      <div className="loading">
        <h1>
          <strong>Searching Dog...</strong>
          <Suspense fallback={<div>Loading...</div>}>
            <Loading />
          </Suspense>
        </h1>
      </div>
    );
  }

  const dog = myDog[0];

  return (
    <div className="divDetail">
      <Link to="/home">
        <button className="buttonHome1" id="home">
          Home
        </button>
      </Link>
      <Link to="/dogs">
        <button className="buttonHome1">Create Dog</button>
      </Link>
      <div>
        <h1 className="name">{dog.name}</h1>
        <ul className="asd">
          <li>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <img src={dog.image} alt={dog.name} className="image" />
              </Suspense>
            </div>
          </li>
          <li>
            <div>
              <h4 className="caracts">Temperaments:</h4>
              <ul className="allTemps">{renderTemperaments(dog)}</ul>
              <h4 className="caracts">Height</h4>
              <p>{dog.height}</p>
              <h4 className="caracts">Weight</h4>
              <p>{dog.weight}</p>
              <h4 className="caracts">Life span</h4>
              <p className="last">{dog.life_span}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Detail);
