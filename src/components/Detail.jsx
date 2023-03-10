import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import "../styles/Detail.css";
import "../images/loading.gif";
import "../images/searchFail.gif";

export default function Detail(props) {
  const dispatch = useDispatch();

  const id = props.match.params.id; // To Access ID of the detail object

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);

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
      {myDog.length > 0 ? (
        <div>
          <h1 className="name">{myDog[0].name}</h1>
          <ul className="asd">
            <li>
              <div>
                <img
                  src={myDog[0].image}
                  alt={myDog[0].name}
                  className="image"
                />
              </div>
            </li>
            <li>
              <div>
                <h4 className="caracts">Temperaments:</h4>
                <ul className="allTemps">
                  {myDog[0].createdInDb === true
                    ? myDog[0].temperaments.map((el) => {
                        return (
                          <li key={el.id}>
                            <label>{el.name}</label>
                          </li>
                        );
                      })
                    : myDog[0].temperament
                    ? myDog[0].temperament.split(", ").map((el) => {
                        return (
                          <li key={el}>
                            <label>{el}</label>
                          </li>
                        );
                      })
                    : "GRR!!!! There are no temperaments for this dog"}
                </ul>
                <h4 className="caracts">Height</h4>
                <p>{myDog[0].height}</p>
                <h4 className="caracts">Weight</h4>
                <p>{myDog[0].weight}</p>
                <h4 className="caracts">Life span</h4>
                <p className="last">{myDog[0].life_span}</p>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className="loading">
          <h1>
            <strong>Searching Dog...</strong>
            <img src="../images/Loading_icon.gif" alt="Sorry"></img>
          </h1>
        </div>
      )}
    </div>
  );
}

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from "react-router-dom";
// import { getDetail } from '../actions';
// import { GiDogBowl, GiDogHouse, GiSittingDog } from 'react-icons/gi';
// import '../styles/Detail.css';

// class Detail extends Component {

//     componentDidMount() {
//         const dogId = this.props.match.params.id;
//         this.props.getDetail(dogId);
//     };

//     render() {

// function mapStateToProps(state) {
//     return {
//         dog: state.detail,
//     };
// };

// function mapDispatchToProps(dispatch) {
//     return {
//         getDetail: id => dispatch(getDetail(id)),
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Detail);
