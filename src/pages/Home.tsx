import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchCategories } from "../store/slices/categories";

import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";

import "./style/Home.css";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const categoriesStore = useSelector(
    (state: RootStateOrAny) => state.categories
  );

  useEffect(() => {
    if (categoriesStore.status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const goProductListPage = (categoriesName: string) =>
    history.push(`/products/${categoriesName}`, {
      query: false,
    });
    console.log(categoriesStore.status);

  return (
    <div className="home">
      <SearchBar />
      {categoriesStore.status === "reject" && <>Fetch Reject</>}
      {categoriesStore.status === "loading" && <div>...Loading </div>}
      {categoriesStore.status === "success" && (
        <>
          {categoriesStore.categories.map(
            (el: { id: number; name: string; image: string }) => {
              return (
                <Card key={el.id} style={{ width: "50rem" }}>
                  <Card.Img
                    style={{ width: "100px" }}
                    variant="top"
                    src={el.image}
                  />
                  <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text>Description</Card.Text>
                    <Button
                      onClick={() =>
                        goProductListPage(el.name.toLocaleLowerCase())
                      }
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
