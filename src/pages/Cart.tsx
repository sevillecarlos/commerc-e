import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import { MdRemoveShoppingCart } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { cartActions } from "../store/slices/cart";
import CostTotalTable from "../components/CostTotalTable";
import "./style/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state: RootStateOrAny) => state.cart);
  const [productsQuantity, setProductsQuantity] = useState<any | undefined>({});
  const costTable = [] as any;

  useEffect(() => {
    dispatch(cartActions.getCartProducts());
    return () => {
      // cleanup
    };
  }, [dispatch]);

  const onChangeQuantity = (e: any) => {
    const { value, name } = e.target;
    setProductsQuantity((prevState: any) => {
      if (prevState) {
        return { ...prevState, [name]: Math.max(1, value) };
      }
    });
  };

  const removeProductCart = (id: number) => {
    const newCart = cartProducts.cart.filter((v: any) => v.id !== id);
    dispatch(cartActions.addCartProducts(newCart));
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
        {cartProducts.cart?.length !== 0 ? (
          <Row>
            <Col>
              {cartProducts.cart?.map(
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
                    >
                      <Image
                        className='cart-image'
                        src={el.image}
                      />
                      <Card.Body>
                        <Card.Title className="product-title">
                          {el.name}
                        </Card.Title>
                        <Card.Text>
                          
                          ${getPrice(el.price, getQuatity(el), el.name)}
                        </Card.Text>
                      </Card.Body>
                      <InputGroup className="quantity-product">
                        <FormControl
                          value={getQuatity(el)}
                          min="1"
                          step="1"
                          name={el.name}
                          onChange={onChangeQuantity}
                          type="number"
                          aria-label="quantity"
                          className="quantity-product-view"
                        />
                      </InputGroup>
                      <Button
                        onClick={() => removeProductCart(el.id)}
                        className="cart-remove-btn"
                      >
                        Remove <MdRemoveShoppingCart />
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
          <div className="empty-cart-msg">
            <h1>
              The cart is empty <MdShoppingCart />
            </h1>
          </div>
        )}
      </Container>
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
