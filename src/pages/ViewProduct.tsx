import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import {
  Card,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

import { useHistory } from "react-router";

import { cartActions } from "../store/slices/cart";

import { FaCartPlus } from "react-icons/fa";

import MsgModal from "../ui/MsgModal";

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
  const [showMsgModal, setShowMsgModal] = useState(false);

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

  const addCart = (product: any) => {
    setShowMsgModal(true);
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
    dispatch(cartActions.addCartProducts(allProduct));
    localStorage.setItem("cart", JSON.stringify(allProduct));

    setTimeout(() => {
      setShowMsgModal(false);
      history.goBack();
    }, 2000);
  };

  const onChangeQuantity = (e: any) => {
    const { value } = e.target;
    setProductQuantity(Math.max(1, value));
  };

  const getPriceQuantity = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  return (
    <div className="view-products">
      <MsgModal
        show={showMsgModal}
        handleClose={() => setShowMsgModal(false)}
        msg=""
        title={"The product was added to the cart "}
        icon={<FaCartPlus />}
        color="rgba(0, 0, 0, 0.911)"
        error={false}
      />
      {/* need to fix the strict mode */}
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
            <Card className="view-product-card" key={el.id}>
              <Container>
                <Row>
                  <Col sm={8}>
                    <div className="view-product-image-container">
                      <Image
                        className="card-image-product"
                        src={`${process.env.REACT_APP_CMS_URL}${el.image.url}`}
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <Card.Body className="card-body-product">
                      <Card.Title className="view-product-name">
                        {el.title}
                      </Card.Title>
                      <Card.Text>{el.description}</Card.Text>
                      <InputGroup className="form-input-quantity">
                        <InputGroup.Text style={{ borderRadius: "20px" }}>
                          Quantity
                        </InputGroup.Text>
                        <FormControl
                          value={productQuantity}
                          className="quantity-product-view"
                          name="input-product"
                          min="1"
                          step="1"
                          onChange={onChangeQuantity}
                          type="number"
                          aria-label="quantity"
                        />
                      </InputGroup>
                      <Card.Text>
                        Price: <strong>${el.price}</strong>
                      </Card.Text>
                      <Card.Text>
                        Total Price: $
                        <strong>
                          {" "}
                          {getPriceQuantity(el.price, productQuantity)}
                        </strong>
                      </Card.Text>
                    </Card.Body>

                    <Card.Footer
                      onClick={() =>
                        addCart({
                          id: el.id,
                          name: el.title,
                          price: el.price,
                          image: `${process.env.REACT_APP_CMS_URL}${el.image.url}`,
                          quantity: productQuantity,
                        })
                      }
                      className="view-product-card-footer"
                    >
                      Add to Cart <FaCartPlus />
                    </Card.Footer>
                  </Col>
                </Row>
              </Container>
            </Card>
          );
        }
      )}
    </div>
  );
};

ViewProduct.propTypes = {
  categoryId: PropTypes.object.isRequired,
};

export default ViewProduct;
