import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/DogCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Your breed must have a name";
  }
  if (input.name.length > 20) {
    errors.name = "That´s way too long a name. Keep it simple!!";
  }
  if (!input.height || input.height.length > 10) {
    errors.height = "Valid height range is required!!";
  }
  if (!input.weight || input.weight.length > 10) {
    errors.weight = "Valid weight range is required!!";
  }
  if (!input.life_span || input.life_span.length > 10) {
    errors.life_span = "Valid life span is required!!";
  }
  if (!input.image || !input.image.type === "url") {
    errors.image = "Valid image URL is required!!";
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperaments = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    //On each change brings previous value

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelect(e) {
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
      console.log(input);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(errors);
    if (
      !Object.getOwnPropertyNames(errors).length &&
      input.name &&
      input.height &&
      input.weight &&
      input.life_span &&
      input.temperaments.length
    ) {
      dispatch(postDog(input));
      alert(" WUF!!!Dog Successfully created");
      setInput({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
      history.push("/home");
    } else {
      alert(" GRRR We can´t create Dog with missing data");
    }
  }

  function handleDeleteTemperament(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== el),
    });
  }
  return (
    <div className="divCreate">
      <Link to="/home">
        <button className="buttonHome">Home</button>
      </Link>
      <h1 className="title"> Create your own dog breed</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            <strong>Breed Name:</strong>
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className="error">
              <strong>{errors.name}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Height range: </strong>
          </label>
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> cm</strong>
          </label>
          {errors.height && (
            <p className="error">
              <strong>{errors.height}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Weight range: </strong>
          </label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> kg</strong>
          </label>
          {errors.weight && (
            <p className="error">
              <strong>{errors.weight}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Expected life span: </strong>
          </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          <label>
            <strong> years</strong>
          </label>
          {errors.life_span && (
            <p className="error">
              <strong>{errors.life_span}</strong>
            </p>
          )}
        </div>
        <div>
          <label>
            <strong>Image URL: </strong>
          </label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && (
            <p className="error">
              <strong>{errors.image}</strong>
            </p>
          )}
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="selected" hidden>
              Temperaments
            </option>
            {allTemperaments
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((temp) => {
                return (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                );
              })}
          </select>

          {input.temperaments.map((el) => {
            return (
              <ul className="allTemps" key={el}>
                <li>
                  <p className="temp">
                    <strong>{el}</strong>
                  </p>
                  <button
                    onClick={() => handleDeleteTemperament(el)}
                    className="x"
                  >
                    X
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
        <button type="submit" className="boop">
          <strong>Create Dog</strong>
        </button>
      </form>
    </div>
  );
}
