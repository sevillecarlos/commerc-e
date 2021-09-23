import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  postCreditUser,
  postUserReceipts,
} from "../store/slices/transaction";
import { Table, Button} from "react-bootstrap";
import { codeGenerator } from "../helper/codeGenerator";
import "./style/CostTotalTable.css";
import { MdAttachMoney } from "react-icons/md";
import { MdPersonPin } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import { BiDonateHeart } from "react-icons/bi";
import { cartActions } from "../store/slices/cart";

import MsgModal from "../ui/MsgModal";

const CostTotalTable = (props: { productsQuantity: any }) => {
  const dispatch = useDispatch();
  const userSession = useSelector((state: RootStateOrAny) => state.transaction);
  const authUser = useSelector((state: RootStateOrAny) => state.auth);

  const { productsQuantity } = props;
  const [costTable, setCostTable] = useState<any>([]);
  const [totatCost, setTotatCost] = useState(0);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

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

  const checkOut = () => {
    const { userCredit } = userSession;
    const userCreditAmount = userCredit.amount;
    if (userCreditAmount) {
      const debitCredit: any = userCreditAmount - totatCost;

      if (debitCredit < 0) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      } else {
        setShow2(true);
        dispatch(
          postCreditUser({
            user_id: userSession.userCredit.user_id,
            amount: debitCredit,
          })
        );
        const uniqueCode = codeGenerator(12);
        dispatch(
          postUserReceipts({
            articles: costTable,
            code: uniqueCode,
            total: totatCost,
            user_id: userSession.userCredit.user_id,
          })
        );
        localStorage.removeItem("cart");

        setTimeout(() => {
          dispatch(cartActions.clearCart());
          setShow2(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="cost-total-table">
      <MsgModal
        show={show}
        handleClose={handleClose}
        title="Error CheckOut"
        msg={`You dont enough credit to checkout  $${totatCost}`}
        color="rgba(48, 6, 6, 0.95)"
        icon={<BiErrorAlt />}
        error={true}
      />
      <MsgModal
        show={show2}
        handleClose={handleClose2}
        title="Thanks for your purchase"
        msg=""
        color="rgba(0, 0, 0, 0.95)"
        icon={<BiDonateHeart />}
        error={false}
      />

      <Table borderless className="total-cost-table">
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
          <tr className="total-row">
            <td>Total</td>
            <td></td>
            <td>${totatCost}</td>
          </tr>
        </tbody>
      </Table>
      {authUser.token ? (
        <Button className="checkout-btn" onClick={checkOut}>
          Checkout <MdAttachMoney size={20} />
        </Button>
      ) : (
        <Button className="checkout-btn" href="/authentication">
          Sign In first to checkout<MdPersonPin  />
        </Button>
      )}
    </div>
  );
};

CostTotalTable.propTypes = {
  productsQuantity: PropTypes.array.isRequired,
};

export default CostTotalTable;
