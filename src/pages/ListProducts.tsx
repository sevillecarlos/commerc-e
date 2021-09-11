import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { MdCancel } from "react-icons/md";

import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  fetchProducts,
  productsDataActions,
} from "../store/slices/productsData";

import { useHistory } from "react-router-dom";
import "./style/ListProducts.css";
import { MdKeyboardArrowRight } from "react-icons/md";

const ListProducts = (props: { categoryId: { id: string; type: string } }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  const { categoryId } = props;

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

  const getCategorieOfProduct = (productName: string) => {
    const productsData: string[] = productsDataStore.data;
    const refName = productName?.toLowerCase();
    const categoryName: any = productsData.filter((v: any) => {
      const checkProductName = v.products.some(
        (v: any) => v.title.toLowerCase() === refName
      );
      return checkProductName && v;
    });
    const [category] = categoryName;
    const { slug } = category;
    history.push(`/${slug}/${refName}`);
  };

  const requestProducts = productsDataStore;

  return (
    <div className="products-list">
      {requestProducts.status === "loading" && <>Loading...</>}
      {requestProducts.status === "success" && (
        <Container>
          <Row style={{ marginLeft: "10%" }}>
            {requestProducts[
              categoryId.type ? "queryProducts" : "productsCategories"
            ]?.length !== 0 ? (
              requestProducts[
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
                      style={{ width: "20rem" }}
                    >
                      <Card.Img
                        style={{ width: "100px", margin: "auto" }}
                        variant="top"
                        src={`http://localhost:1337${el.image.url}`}
                      />
                      <Card.Body>
                        <Card.Title className="product-name">
                          {el.title}
                        </Card.Title>
                        <Card.Text>{el.description}</Card.Text>
                        <Card.Text>${el.price}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="product-card-footer">
                        <Button
                          className="view-product"
                          onClick={() => getCategorieOfProduct(el.title)}
                        >
                          View Product <MdKeyboardArrowRight size={20} />
                        </Button>
                      </Card.Footer>
                    </Card>
                  );
                }
              )
            ) : (
              <div className='search-not-found-msg'>
                <span>Sorry, nothing match your search <MdCancel /></span>
              </div>
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
