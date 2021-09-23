import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const CostTotalTable = (props: { productsQuantity: any }) => {
  const { productsQuantity } = props;
  const [costTable, setCostTable] = useState<any>([]);
  const [totatCost, setTotatCost] = useState(0);

  useEffect(() => {
    setCostTable(productsQuantity);
    return () => {
      //   cleanup
    };
  }, [productsQuantity]);

  useEffect(() => {
    let total = 0;
    costTable.map((v: any) => {
      total += v.price;
      return 0;
    });
    const totalCost = Number(total?.toFixed(2));
    setTotatCost(totalCost);
    return () => {
      //   cleanup
    };
  }, [costTable]);

  console.log(totatCost);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price x Quantity</th>
        </tr>
      </thead>
      <tbody>
        {costTable.map((v: any) => {
          return (
            <tr key={v.name}>
              <td>{v.name}</td>
              <td>{v.quantity}</td>
              <td>${v.price}</td>
            </tr>
          );
        })}
        <tr>
          <td>Total</td>
          <td></td>
          <td>${totatCost}</td>
        </tr>
      </tbody>
    </Table>
  );
};

CostTotalTable.propTypes = {
  productsQuantity: PropTypes.array.isRequired,
};

export default CostTotalTable;
