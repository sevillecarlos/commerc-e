import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { postCreditUser, postUserReceipts } from "../store/slices/transaction";
import { Table, Button, Modal } from "react-bootstrap";
import { codeGenerator } from "../helper/codeGenerator";

const CostTotalTable = (props: { productsQuantity: any }) => {
  const dispatch = useDispatch();
  const userSession = useSelector((state: RootStateOrAny) => state.auth);
  const { productsQuantity } = props;
  const [costTable, setCostTable] = useState<any>([]);
  const [totatCost, setTotatCost] = useState(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  console.log(userSession.userReceipt)

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

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  console.log(userSession.userCredit);
  const checkOut = () => {
    const debitCredit: any = userSession.userCredit.amount - totatCost;
    console.log(debitCredit);
    if (debitCredit < 0) {
      setShow(true);
    } else {
      console.log(userSession);
      dispatch(
        postCreditUser({
          user_id: userSession.userCredit.user_id,
          amount: debitCredit,
        })
      );
      const uniqueCode = codeGenerator(12);
      dispatch(
        postUserReceipts({
          code: uniqueCode,
          total: totatCost,
          user_id: userSession.userCredit.user_id,
        })
      );
      setShow2(true);
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error CheckOut</Modal.Title>
        </Modal.Header>
        <Modal.Body>You dont enough credit to checkout ${totatCost}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Congrats to your new sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>:)</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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

      <Button onClick={checkOut}>Checkout</Button>
    </div>
  );
};

CostTotalTable.propTypes = {
  productsQuantity: PropTypes.array.isRequired,
};

export default CostTotalTable;
