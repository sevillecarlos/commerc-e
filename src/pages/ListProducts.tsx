import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import productsDataSlice, {
  fetchProducts,
  productsDataActions,
} from "../store/slices/productsData";
import "./style/ListProducts.css";

const ListProducts = (props: { categoryId: { id: string; type: string } }) => {
  console.log(props.categoryId);
  const dispatch = useDispatch();

  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  const { categoryId } = props;

  console.log(categoryId.id)

  useEffect(() => {
    if (productsDataStore.status === "idle") {
      dispatch(fetchProducts());
    }
    return () => {
      //   cleanup;
    };
  }, [dispatch, productsDataStore.status]);

  useEffect(() => {
    if (categoryId.type) {
      dispatch(
        productsDataActions.getProductsByQuery({
          data: productsDataStore.data,
          id: categoryId.id,
        })
      );
    } else {
      dispatch(
        productsDataActions.getCategoriesProducts({
          data: productsDataStore.data,
          id: categoryId.id,
        })
      );
    }
    return () => {
      // cleanup
    };
  }, [productsDataStore.data, dispatch, categoryId]);

  // const products: any = () => (isQuery ? queryStore : productsStore);
  const requestProducts = productsDataStore;

  // const goProductListPage = (productName: string) =>
  //   history.push(`/${categoryId}/${productName}`);

  console.log(requestProducts.queryProducts);

  return (
    <div className="products-list">
      {requestProducts.status === "loading" && <>Loading...</>}
      {requestProducts.status === "success" && (
        <Container>
          <Row>
            {requestProducts[
              categoryId.type ? "queryProducts" : "productsCategories"
            ]?.map(
              (el: {
                id: number;
                title: string;
                description: string;
                image: { id: number; url: string };
                price: number;
              }) => {
                return (
                  <Card
                    className="products-card"
                    key={el.id}
                    style={{ width: "25%" }}
                  >
                    <Card.Img
                      style={{ width: "100px", margin: "auto" }}
                      variant="top"
                      src={`http://localhost:1337${el.image.url}`}
                    />
                    <Card.Body>
                      <Card.Title>{el.title}</Card.Title>
                      <Card.Text>{el.description}</Card.Text>
                      <Card.Text>{el.price}</Card.Text>
                      <Button
                      // onClick={() =>
                      //   goProductListPage(el.title.toLocaleLowerCase())
                      // }
                      // variant="primary"
                      >
                        Check
                      </Button>
                    </Card.Body>
                  </Card>
                );
              }
            )}
          </Row>
        </Container>
      )}{" "}
    </div>
  );
};

ListProducts.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default ListProducts;
