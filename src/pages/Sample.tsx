import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";

const Sample = () => {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();

  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });

  return (
    <>
      <Button onClick={increment} variant="primary">
        Increment
      </Button>
      <Button onClick={decrement} variant="primary">
        Decrement
      </Button>
      <p> {counter} </p>
    </>
  );
};

Sample.propTypes = {};

export default Sample;
