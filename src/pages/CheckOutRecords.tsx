import React, { useState, useEffect } from "react";
import MsgModal from "../ui/MsgModal";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getReceipts, getReceiptArticles } from "../store/slices/transaction";
import { Table } from "react-bootstrap";
import { FaSearchDollar, FaReceipt } from "react-icons/fa";

import { formatDate } from "../helper/formatDate";
import "./style/CheckOutRecord.css";

const CheckOutRecords = () => {
  const dispatch = useDispatch();
  const userSession = useSelector((state: RootStateOrAny) => state.transaction);
  const authUser = useSelector((state: RootStateOrAny) => state.auth);

  const [receiptRecords, setReceiptRecords] = useState<string[]>([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [receiptCode, setReceiptCode] = useState("");

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (userSession.userCredit) {
      dispatch(getReceipts(userSession.userCredit.user_id));
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

  const getArticles = (recieptId: number, receiptCode: string) => {
    setReceiptCode(receiptCode);
    dispatch(getReceiptArticles(recieptId));
  };

  useEffect(() => {
    if (userSession.receiptArticles?.length !== 0) {
      setShowModal(true);
    }
  }, [userSession.receiptArticles]);

  const articlesTable = () => {
    const { receiptArticles } = userSession;
    return (
      <Table className="table-checkout-record" borderless size="sm">
        <thead>
          <tr>
            <th>Article Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {receiptArticles?.map((v: any) => {
            return (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.quantity}</td>
                <td>${v.total_price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
  return (
    <div className="checkout-record">
      <MsgModal
        show={showModal}
        handleClose={handleCloseModal}
        title={`Receipt: ${receiptCode}`}
        msg={articlesTable()}
        color="black"
        icon={<FaReceipt />}
        error={false}
      />
      {authUser.token ? (
        receiptRecords.length !== 0 ? (
          <Table className="table-checkout-record" borderless size="sm">
            <thead>
              <tr>
                <th>Receipt Code</th>
                <th>Purchase Date</th>
                <th>Spend</th>
              </tr>
            </thead>
            <tbody>
              {receiptRecords.map((v: any) => {
                return (
                  <tr key={v.id}>
                    <td>
                      <div
                        onClick={() => getArticles(v.id, v.code)}
                        className="checkout-record-code"
                      >
                        <span>{v.code}</span>
                      </div>
                    </td>
                    <td>{formatDate(v.created_at)}</td>
                    <td>${v.total}</td>
                  </tr>
                );
              })}
              <tr className="total-row-checkout-record">
                <td>Grand Total</td>
                <td></td>
                <td>${grandTotal}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <div className="empty-checkout-record">
            <h1>
              You don't checkout nothing yet <FaSearchDollar />
            </h1>
          </div>
        )
      ) : (
        <div className="empty-checkout-record">
          <h1>
            Need sign in to see your checkout records <FaSearchDollar />
          </h1>
        </div>
      )}
    </div>
  );
};

export default CheckOutRecords;
