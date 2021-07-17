import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Card, Button } from "react-bootstrap";

const Cart = () => {
  const cartProducts = useSelector(
    (state: RootStateOrAny) => state.cart.cartProducts
  );

  console.log(cartProducts);
  return (
    <div>
      {" "}
      {cartProducts.length !== 0 &&
        cartProducts.map(
          (
            el: { id: number; name: string; image: string; price: number },
            i: number
          ) => {
            return (
              <Card key={i} style={{ width: "50rem" }}>
                <Card.Img
                  style={{ width: "100px" }}
                  variant="top"
                  src={el.image}
                />
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <Card.Text>{el.price}</Card.Text>
                </Card.Body>
              </Card>
            );
          }
        )}
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
