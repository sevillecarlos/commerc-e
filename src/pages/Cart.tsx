import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Card, Button } from "react-bootstrap";

const Cart = () => {
  // const cartProducts = useSelector(
  //   (state: RootStateOrAny) => state.cart.cartProducts
  // );

  const [token, setToken] = useState("");
  const cartValues: any = localStorage.getItem("cart");
  const cartProducts: any = JSON.parse(cartValues);

  useEffect(() => {
    const token: any = localStorage.getItem("$@token");
    if (token) setToken(token);
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      {" "}
      {cartProducts !== null ? (
        <div>
          {cartProducts.map(
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
          )}{" "}
          {token ? (
            <Button href="">Checkout</Button>
          ) : (
            <Button href="http://localhost:3000/authentication">
              Sign In first for checkout
            </Button>
          )}
        </div>
      ) : (
        <h1>Nothing the cart</h1>
      )}
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
