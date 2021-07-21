import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";

const Cart = () => {
  // const cartProducts = useSelector(
  //   (state: RootStateOrAny) => state.cart.cartProducts
  // );

  const [token, setToken] = useState("");
  const [productsQuantity, setProductsQuantity] = useState<any | undefined>({});

  const cartValues: any = localStorage.getItem("cart");
  const cartProducts: any = JSON.parse(cartValues);

  useEffect(() => {
    const token: any = localStorage.getItem("$@token");
    if (token) setToken(token);
    return () => {
      // cleanup
    };
  }, []);

  const onChangeQuantity = (e: any) => {
    const { value, name } = e.target;
    setProductsQuantity((prevState: any) => {
      if (prevState) {
        return { ...prevState, [name]: value };
      }
    });
  };

  console.log(productsQuantity);

  return (
    <div>
      {" "}
      {cartProducts !== null ? (
        <div>
          {cartProducts.map(
            (
              el: {
                id: number;
                name: any;
                image: string;
                price: number;
                quantity: number;
              },
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
                    <Card.Text>${el.price}</Card.Text>
                  </Card.Body>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Quantity</InputGroup.Text>
                    <FormControl
                      value={productsQuantity[el.name] ?? el.quantity}
                      min="1"
                      max="5"
                      name={el.name}
                      onChange={onChangeQuantity}
                      type="number"
                      aria-label="quantity"
                    />
                  </InputGroup>
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
