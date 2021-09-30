import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Image } from "react-bootstrap";
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
          <Row className='view-product-row'>
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
                    <Card className="products-card" key={el.id}>
                      <Image
                        className="product-image"
                        src={`${process.env.REACT_APP_CMS_URL}${el.image.url}`}
                      />
                      <Card.Body>
                        <Card.Title className="product-name">
                          {el.title}
                        </Card.Title>
                        <Card.Text>{el.description}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="product-card-footer">
                        <Card.Text>${el.price}</Card.Text>
                        <Button
                          className="product-card-btn"
                          onClick={() => getCategorieOfProduct(el.title)}
                        >
                          View Product <MdKeyboardArrowRight className="arrow-icon" />
                        </Button>
                      </Card.Footer>
                    </Card>
                  );
                }
              )
            ) : (
              <div className="search-not-found-msg">
                <span>
                  Sorry, nothing match your search <MdCancel />
                </span>
              </div>
            )}
          </Row>
        </Container>
      )}{" "}
    </div>
  );
};

ListProducts.propTypes = {
  categoryId: PropTypes.object.isRequired,
};

export default ListProducts;
