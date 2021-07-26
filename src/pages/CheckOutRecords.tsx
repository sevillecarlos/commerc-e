import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { fetchReceipts } from "../store/slices/transaction";
import { Table, Button } from "react-bootstrap";

import { formatDate } from "../helper/formatDate";

const CheckOutRecords = () => {
  const dispatch = useDispatch();
  const userSession = useSelector((state: RootStateOrAny) => state.transaction);

  const [receiptRecords, setReceiptRecords] = useState<any>([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (userSession.userCredit) {
      dispatch(fetchReceipts(userSession.userCredit.user_id));
    }
  }, [dispatch, userSession.userCredit]);

  useEffect(() => {
    if (userSession.userReceipt) {
      setReceiptRecords(userSession.userReceipt);
    }
    return () => {
      //   cleanup
    };
  }, [userSession.userReceipt]);

  console.log(receiptRecords);

  useEffect(() => {
    let grantTotal = 0;
    receiptRecords.map((v: any) => {
      grantTotal += v.total;
      return 0;
    });
    setGrandTotal(Number(grantTotal.toFixed(2)));
    return () => {
      //   cleanup
    };
  }, [receiptRecords]);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Purchase Date</th>
            <th>Receipt Code</th>
            <th>Spend</th>
          </tr>
        </thead>
        <tbody>
          {receiptRecords.map((v: any) => {
            return (
              <tr key={v.id}>
                <td>{formatDate(v.created_at)}</td>
                <td>{v.code}</td>
                <td>${v.total}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td>Grand Total</td>
            <td>${grandTotal}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

CheckOutRecords.propTypes = {};

export default CheckOutRecords;
