import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchCategories } from "../store/slices/categories";

import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const categoriesStore = useSelector(
    (state: RootStateOrAny) => state.categories
  );

  console.log(categoriesStore);

  useEffect(() => {
    if (categoriesStore.status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const goProductListPage = (categoriesName: string) =>
    history.push(`/products/${categoriesName}`);

  return (
    <div className="home">
      {categoriesStore.status === "loading" && <div>...Loading </div>}
      {categoriesStore.status === "success" && (
        <>
          {categoriesStore.categories.map(
            (el: { id: number; name: string }) => {
              return (
                <Card key={el.id} style={{ width: "50rem" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
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
