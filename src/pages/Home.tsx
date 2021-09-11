import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

import { useHistory } from "react-router-dom";
import { productsDataActions } from "../store/slices/productsData";
import { MdKeyboardArrowRight } from "react-icons/md";

import "./style/Home.css";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const productsDataStore = useSelector(
    (state: RootStateOrAny) => state.productsData
  );
  
  useEffect(() => {
    dispatch(productsDataActions.getCategories(productsDataStore.data));
    return () => {
      // cleanup
    };
  }, [productsDataStore.data, dispatch]);

  const goToCategory = (categoryName: string) =>
    history.push(`/products/${categoryName.toLocaleLowerCase()}`);

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
                    style={{ width: "200px", margin: "auto" }}
                    variant="top"
                    src={el.image}
                  />
                  <Card.Body>
                    <Card.Title className="category-name">{el.name}</Card.Title>
                    <Card.Text className="category-desc">Description</Card.Text>
                    <Button
                      className="button-categories"
                      onClick={() => goToCategory(el.name)}
                    >
                      Take a watch <MdKeyboardArrowRight size={25} />
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
