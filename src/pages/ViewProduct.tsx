import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { Card, Button } from "react-bootstrap";

import { cartActions } from "../store/slices/cart";

import {
  fetchProducts,
  productsDataActions,
} from "../store/slices/productsData";

const ViewProduct = (props: { categoryId: { id: string; type: string } }) => {
  const dispatch = useDispatch();
  const { categoryId } = props;

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
    console.log(exist);
    const allProduct = products
      ? exist
        ? [...addProductQuantity]
        : [...JSON.parse(products), localCart]
      : [localCart];

    localStorage.setItem("cart", JSON.stringify(allProduct));
  };

  return (
    <div>
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
            <Card key={el.id} style={{ width: "50rem" }}>
              <Card.Img
                style={{ width: "100px" }}
                variant="top"
                src={`http://localhost:1337${el.image.url}`}
              />
              <Card.Body>
                <Card.Title>{el.title}</Card.Title>
                <Card.Text>{el.description}</Card.Text>
                <Card.Text>${el.price}</Card.Text>
                <Button
                  onClick={() =>
                    addCart({
                      id: el.id,
                      name: el.title,
                      price: el.price,
                      image: `http://localhost:1337${el.image.url}`,
                      quantity: 1,
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
