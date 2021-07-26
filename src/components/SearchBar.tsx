import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import {MdSearch} from 'react-icons/md'
import "./style/SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  const [query, setQuery] = useState("");

  const goSearchProducts = (e: any) => {
    e.preventDefault();

    history.push(`/search/query/${query}`);
  };

  const onChangeQuery = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setQuery(value.toLowerCase());
  };
  return (
    <div className="search-bar">
      <Form className="d-flex" onSubmit={goSearchProducts}>
        <FormControl
          id="search"
          className="form-input-search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={onChangeQuery}
        />
        <Button className="search-btn" type="submit">
          <MdSearch size={25}/>
        </Button>
      </Form>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
