import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Image,
  Col,
} from "react-bootstrap";

import { useHistory } from "react-router";

import { cartActions } from "../store/slices/cart";

import { MdShoppingCart } from "react-icons/md";

import lip from "../assets/img/lip.png";

import {
  fetchProducts,
  productsDataActions,
} from "../store/slices/productsData";

import "./style/ViewProduct.css";

const ViewProduct = (props: { categoryId: { id: string; type: string } }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryId } = props;

  const [productQuantity, setProductQuantity] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);

  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  useEffect(() => {
    if (productsDataStore.status === "idle") {
      dispatch(fetchProducts());
    }
    return () => {
      //   cleanup;
    };
  }, [dispatch, productsDataStore.status]);

  useEffect(() => {
    dispatch(
      productsDataActions.getProduct({
        data: productsDataStore.data,
        id: categoryId.id,
        type: categoryId.type,
      })
    );
    return () => {
      // cleanup
    };
  }, [productsDataStore.data, dispatch, categoryId]);

  const [cart, setCart] = useState(Array<string>());

  useEffect(() => {
    if (cart.length !== 0) {
      dispatch(cartActions.addCart(cart));
    }

    return () => {
      // cleanup
    };
  }, [cart, dispatch]);

  const addCart = (product: any) => {
    setShowOverlay(true);
    setCart(product);
    let localCart: any = product;
    const products: any = localStorage.getItem("cart");
    const cartProducts = JSON.parse(products)?.map((x: any) => x);
    const exist = cartProducts?.some((v: any) => v.name === product.name);
    const addProductQuantity = cartProducts?.map((v: any) =>
      v.name === product.name
        ? {
            id: v.id,
            name: v.name,
            price: v.price,
            image: v.image,
            quantity: (v.quantity += 1),
          }
        : v
    );
    const allProduct = products
      ? exist
        ? [...addProductQuantity]
        : [...JSON.parse(products), localCart]
      : [localCart];

    localStorage.setItem("cart", JSON.stringify(allProduct));

    setTimeout(() => {
      setShowOverlay(false);
      history.goBack();
    }, 3000);
  };

  const onChangeQuantity = (e: any) => {
    const { value } = e.target;
    setProductQuantity(value);
  };

  const getPriceQuantity = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  return (
    <LoadingOverlay
      active={showOverlay}
      styles={{
        overlay: (base) => ({
          ...base,
          borderRadius: "20px",
          width: "82%",
          marginLeft: "9% ",
        }),
      }}
      spinner={
        <div className="lip-spinner">
          <Image src={lip} alt="Spinner Lip" style={{ width: "110%" }} />
        </div>
      }
    >
      <div className="view-products">
        {productsDataStore.status === "loading" && <>Loading...</>}
        {productsDataStore.product?.map(
          (el: {
            id: number;
            title: string;
            description: string;
            image: { id: number; url: string };
            price: number;
          }) => {
            return (
              <Card
                className="view-product-card"
                key={el.id}
                style={{ width: "80rem" }}
              >
                <Container>
                  <Row>
                    <Col sm={8}>
                      <Card.Img
                        style={{
                          width: "450px",
                          padding: "20px",
                          margin: "auto 25% ",
                        }}
                        variant="top"
                        src={`http://localhost:1337${el.image.url}`}
                      />
                    </Col>
                    <Col sm={4}>
                      <Card.Body className="card-body-product">
                        <Card.Title className="view-product-name">
                          {el.title}
                        </Card.Title>
                        <Card.Text>{el.description}</Card.Text>
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ borderRadius: "20px" }}>
                            Quantity
                          </InputGroup.Text>
                          <FormControl
                            value={productQuantity}
                            className="quantity-product-view"
                            name="input-product"
                            onChange={onChangeQuantity}
                            type="number"
                            aria-label="quantity"
                          />
                        </InputGroup>
                        <Card.Text>
                          ${getPriceQuantity(el.price, productQuantity)}
                        </Card.Text>
                      </Card.Body>

                      <Card.Footer
                        onClick={() =>
                          addCart({
                            id: el.id,
                            name: el.title,
                            price: el.price,
                            image: `http://localhost:1337${el.image.url}`,
                            quantity: productQuantity,
                          })
                        }
                        className="view-product-card-footer"
                      >
                        Add to Cart <MdShoppingCart size={20} />
                      </Card.Footer>
                    </Col>
                  </Row>
                </Container>
              </Card>
            );
          }
        )}
      </div>
    </LoadingOverlay>
  );
};

ViewProduct.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default ViewProduct;
