import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { cartActions } from "../store/slices/cart";
import { MdRemoveShoppingCart } from "react-icons/md";

import CostTotalTable from "../components/CostTotalTable";
import "./style/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [productsQuantity, setProductsQuantity] = useState<any | undefined>({});
  const [cartProducts, setCartProducts] = useState<any>([]);
  const costTable = [] as any;

  useEffect(() => {
    const token: any = localStorage.getItem("$@token");
    if (token) setToken(token);
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    const cartValues: any = localStorage.getItem("cart");
    if (cartValues) {
      setCartProducts(JSON.parse(cartValues));
    }
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

  const removeProductCart = (id: number) => {
    const itemCart: any = localStorage.getItem("cart");
    const parseItemCart = JSON.parse(itemCart);
    const newCart = parseItemCart.filter((v: any) => v.id !== id);
    dispatch(cartActions.addCart(newCart));
    setCartProducts(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getQuatity = (el: any) => {
    return productsQuantity[el.name] ?? el.quantity;
  };

  const getPrice = (price: number, quantity: number, name: string) => {
    const pricePerQuantity = (price * quantity).toFixed(2);
    costTable.push({
      name: name,
      price: Number(pricePerQuantity),
      quantity: Number(quantity),
    });
    return pricePerQuantity;
  };
  return (
    <div className="cart">
      <Container>
        {" "}
        {cartProducts.length !== 0 ? (
          <Row>
            <Col>
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
                    <Card
                      className="cart-product"
                      key={i}
                      style={{ width: "45rem" }}
                    >
                      <Card.Img
                        style={{ width: "120px", margin: "auto" }}
                        variant="top"
                        src={el.image}
                      />
                      <Card.Body>
                        <Card.Title className="product-title">{el.name}</Card.Title>
                        <Card.Text>
                          ${getPrice(el.price, getQuatity(el), el.name)}
                        </Card.Text>
                      </Card.Body>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>Quantity</InputGroup.Text>
                        <FormControl
                          value={getQuatity(el)}
                          min="1"
                          max="5"
                          name={el.name}
                          onChange={onChangeQuantity}
                          type="number"
                          aria-label="quantity"
                        />
                      </InputGroup>
                      <Button
                        onClick={() => removeProductCart(el.id)}
                        className="cart-remove-btn"
                      >
                        Remove from cart <MdRemoveShoppingCart />
                      </Button>
                    </Card>
                  );
                }
              )}
            </Col>
            <Col>
              <CostTotalTable productsQuantity={costTable} />
            </Col>
          </Row>
        ) : (
          <h1>Nothing the cart</h1>
        )}
      </Container>
    </div>
  );
};

Cart.propTypes = {};

export default Cart;

// {!token && (
//   <Button href="http://localhost:3000/authentication">
//     Sign In first for checkout
//   </Button>
// )}
