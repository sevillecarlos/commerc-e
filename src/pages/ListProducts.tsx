import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Image } from "react-bootstrap";

import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchProducts, productsActions } from "../store/slices/products";

import {
  fetchsearchQuery,
  searchQueryActions,
} from "../store/slices/searchQuery";

import { useHistory } from "react-router-dom";

const ListProducts = (props: { categoryId: string | number }) => {
  const history: { location: { state: { query: boolean } } } | any =
    useHistory();

  const isQuery: boolean = history.location.state?.query;

  console.log(history.location.state);
  const dispatch = useDispatch();

  const productsStore = useSelector((state: RootStateOrAny) => state.products);
  const queryStore = useSelector((state: RootStateOrAny) => state.searchQuery);

  const { categoryId } = props;

  useEffect(() => {
    if (isQuery) {
      if (queryStore.status === "idle") {
        dispatch(fetchsearchQuery(categoryId));
      }
    } else {
      if (productsStore.status === "idle") {
        dispatch(fetchProducts(categoryId));
      }
    }
    return () => {
      //   cleanup;
    };
  }, []);

  const products: any = () => (isQuery ? queryStore : productsStore);
  const requestProducts = products();

  const goProductListPage = (productName: string) =>
    history.push(`/${categoryId}/${productName}`);

  return (
    <div>
      {requestProducts.status === "loading" && <>Loading...</>}
      {requestProducts.status === "success" && (
        <div>
          {requestProducts.products.map(
            (el: {
              id: number;
              title: string;
              description: string;
              image: { id: number; url: string };
              price: number;
            }) => {
              return (
                <Card key={el.id} style={{ width: "50rem" }}>
                  <Card.Img
                    style={{ width: "100px" }}
                    variant="top"
                    src={`http://localhost:1337${el.image.url}`}
                  />
                  <Card.Body>
                    <Card.Title>{el.title}</Card.Title>
                    <Card.Text>{el.description}</Card.Text>
                    <Card.Text>{el.price}</Card.Text>
                    <Button
                      onClick={() =>
                        goProductListPage(el.title.toLocaleLowerCase())
                      }
                      variant="primary"
                    >
                      Check
                    </Button>
                  </Card.Body>
                </Card>
              );
            }
          )}
        </div>
      )}{" "}
    </div>
  );
};

ListProducts.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default ListProducts;
