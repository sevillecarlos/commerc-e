import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { urlParser } from "../helper/urlParser";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { fetchProducts, productsActions } from "../store/slices/products";
import { Card, Button } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";

import { useHistory } from "react-router-dom";

import { cartActions } from "../store/slices/cart";

const ViewProduct = (props: { categoryId: string }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryId } = props;

  const [cart, setCart] = useState(Array<string>());
  const urlData = urlParser(categoryId);

  const product = useSelector((state: RootStateOrAny) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(urlData[0]));
    console.log("algo");
    dispatch(productsActions.getProduct(urlData[1]));
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    if (cart.length !== 0) {
      dispatch(cartActions.addCart(cart));
    }

    return () => {
      // cleanup
    };
  }, [cart, dispatch]);

  const addCart = (product: any) => {
    setCart([...cart, product]);
  };

  const goToCart = () => history.push("/cart");

  return (
    <div>
      <MdShoppingCart
        onClick={goToCart}
        style={{ width: "150px", height: "150px" }}
      />
      <p>{cart.length}</p>
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
                  onClick={() =>
                    addCart({
                      id: el.id,
                      name: el.title,
                      price: el.price,
                      image: `http://localhost:1337${el.image.url}`,
                    })
                  }
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
