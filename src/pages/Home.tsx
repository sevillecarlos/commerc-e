import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchProducts } from "../store/slices/productsData";

import { useHistory } from "react-router-dom";
import { productsDataActions } from "../store/slices/productsData";
import "./style/Home.css";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );

  useEffect(() => {
    if (productsDataStore.status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsDataStore.status]);

  useEffect(() => {
    dispatch(productsDataActions.getCategories(productsDataStore.data));
    return () => {
      // cleanup
    };
  }, [productsDataStore.data, dispatch]);

  const goProductListPage = (productsDataName: string) =>
    history.push(`/products/${productsDataName}`);

  return (
    <div className="home">
      {productsDataStore.status === "reject" && <>Fetch Reject</>}
      {productsDataStore.status === "loading" && <div>...Loading </div>}
      {productsDataStore.status === "success" && (
        <>
          {productsDataStore.categories.map(
            (el: { id: number; name: string; image: string }) => {
              return (
                <Card
                  className="categories-card"
                  key={el.id}
                  style={{ width: "100%" }}
                >
                  
                  <Card.Img
                    style={{ width: "200px", margin:"auto" }}
                    variant="top"
                    src={el.image}
                  />
                  <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text>Description</Card.Text>
                    <Button
                    className="button-categories"
                      // onClick={() =>
                      //   goProductListPage(el.name.toLocaleLowerCase())
                      // }
                      href={`http://localhost:3000/products/${el.name.toLocaleLowerCase()}`}
                      variant="primary"
                    >
                      Check
                    </Button>
                  </Card.Body>
                </Card>
              );
            }
          )}
        </>
      )}
    </div>
  );
};

export default Home;
