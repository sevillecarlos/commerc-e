import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Image } from "react-bootstrap";

import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchProducts, productsActions } from "../store/slices/products";

import { useHistory } from "react-router-dom";

const ListProducts = (props: { categoryId: string | number }) => {
  const dispatch = useDispatch();

  const productsStore = useSelector((state: RootStateOrAny) => state.products);

  const { categoryId } = props;

  useEffect(() => {
    dispatch(fetchProducts(categoryId));
    return () => {
      //   cleanup;
    };
  }, []);

  return (
    <div>
      {productsStore.status === "loading" && <>Loading...</>}
      {productsStore.status === "success" && (
        <div>
          {productsStore.products.map(
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
                      // onClick={() =>
                      //   goProductListPage(el.name.toLocaleLowerCase())
                      // }
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
