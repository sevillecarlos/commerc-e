import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { urlParser } from "../helper/urlParser";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { fetchProducts, productsActions } from "../store/slices/products";
import { Card, Button } from "react-bootstrap";

const ViewProduct = (props: { categoryId: string }) => {
  const dispatch = useDispatch();
  const { categoryId } = props;

  const urlData = urlParser(categoryId);

  console.log(urlData);

  const product = useSelector((state: RootStateOrAny) => state.products);

  console.log();
  useEffect(() => {
    dispatch(fetchProducts(urlData[0]));
    console.log("algo");
    dispatch(productsActions.getProduct(urlData[1]));
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      {product.product.map(
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
                  //   goProductListPage(el.title.toLocaleLowerCase())
                  // }
                  variant="primary"
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          );
        }
      )}
    </div>
  );
};

ViewProduct.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default ViewProduct;
