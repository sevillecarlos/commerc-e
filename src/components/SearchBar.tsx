import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchsearchQuery } from "../store/slices/searchQuery";

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const goSearchProducts = (e: any) => {
    e.preventDefault();
    dispatch(fetchsearchQuery(query));
    history.push(`/query/${query}`, {
      query: true,
    });
  };

  const onChangeQuery = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setQuery(value.toLowerCase());
  };

  return (
    <div>
      <Form className="d-flex" onSubmit={(e) => goSearchProducts(e)}>
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          onChange={(e) => onChangeQuery(e)}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
