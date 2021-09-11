import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { MdSearch } from "react-icons/md";
import "./style/SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  const [query, setQuery] = useState("");
  const [closeSuggestions, setCloseSuggestions] = useState(true);

  const goSearchProducts = (e?: any) => {
    e?.preventDefault();
    history.push(`/search/query/${query}`);
  };

  const onChangeQuery = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setCloseSuggestions(false);
    setQuery(value.toLowerCase());
  };

  const autoCompleteSearch = () => {
    const allProducts = productsDataStore.data.flatMap(
      (category: { products: {}[] }) => {
        return category.products;
      }
    );

    const searchProducts = allProducts
      .map(
        (v: any) =>
          v.title.toLowerCase().indexOf(query) !== -1 && v.title.toLowerCase()
      )
      .filter((v: any) => v)
      .sort()
      .filter((v: any, i: number, arr: any) => v !== arr[i + 1]);
    return searchProducts;
  };

  const setSuggestionQuery = (e: any) => {
    const { outerText } = e.target;
    setQuery(outerText);
    setCloseSuggestions(true);
    history.push(`/search/query/${outerText}`);
  };

  console.log(query);
  const querySearch = autoCompleteSearch();

  return (
    <div className="search-bar">
      <div className='search-input'>
      <Form className="d-flex" autoComplete="off" onSubmit={goSearchProducts} >
        <FormControl
          id="search"
          className="form-input-search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={onChangeQuery}
          value={query}
        />
        <Button className="search-btn" type="submit">
          <MdSearch size={25} />
        </Button>
      </Form>

      </div>
      <div>
        {!closeSuggestions && query !== "" && (
          <div className="autocomplete-lists">
            <ul className="autocomplete-item">
              {querySearch.length !== 0 ? (
                querySearch.map((v: any, i: number) => (
                  <li
                    className="item-autocomplete"
                    onClick={setSuggestionQuery}
                    key={i}
                  >
                    {v}
                  </li>
                ))
              ) : (
                <span>not search matching</span>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
