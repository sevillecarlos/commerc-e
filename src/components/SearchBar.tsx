import React, { useEffect, useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchProducts } from "../store/slices/productsData";

import { productsDataActions } from "../store/slices/productsData";
import './style/SearchBar.css'

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  const [query, setQuery] = useState("");

  const goSearchProducts = (e: any) => {
    e.preventDefault();
    dispatch(
      productsDataActions.getProductsByQuery({
        data: productsDataStore.data,
        query: query,
      })
    );
    history.push(`/query/${query}`);
  };

  useEffect(() => {
    return () => {
      dispatch(fetchProducts());
      // cleanup
    };
  }, [dispatch]);

  const onChangeQuery = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setQuery(value.toLowerCase());
  };
  console.log(productsDataStore.queryProducts);
  return (
    <div className="search-bar">
      <Form className="d-flex" onSubmit={goSearchProducts}>
        <FormControl
          id="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={onChangeQuery}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
