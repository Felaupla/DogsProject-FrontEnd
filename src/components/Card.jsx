import React from "react";
import "../styles/Card.css";

export default function Card({ image, name, temperaments, weight }) {
  function listTemperaments() {
    if (typeof temperaments === "string") {
      return temperaments;
    }
    if (Array.isArray(temperaments)) {
      let temps = temperaments.map((el) => el.name);
      return temps.join(", ");
    }
  }
  return (
    <div className="card">
      <h1 className="info">{name}</h1>
      <h3 className="info">{listTemperaments(temperaments)}</h3>
      <img src={image} alt={`${name}`} className="imageDog" />
      {name !== "GRRR!!! I cannot find your dog" ? (
        <h3 className="info">Weight: {weight} </h3>
      ) : (
        <></>
      )}
    </div>
  );
}
