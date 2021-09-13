import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import Watch from "../components/NavBarWatch";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { authActions } from "../store/slices/auth";
import { cartActions } from "../store/slices/cart";
import jwt_decode from "jwt-decode";
import { getCredit } from "../store/slices/transaction";
import roullete from "../assets/img/roullete.png";
import lip from "../assets/img/lip.png";

import "./style/NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state: RootStateOrAny) => state.cart);
  const authUser = useSelector((state: RootStateOrAny) => state.auth);
  const authCredit = useSelector((state: RootStateOrAny) => state.transaction);

  const [user, setUser] = useState<any>({});
  const [removeUser, setRemoveUser] = useState(false);

  const logOut = () => {
    dispatch(authActions.removeUser());
    setRemoveUser(true);
  };

  const getFirstName = (name: string) => {
    return name?.split(" ").shift();
  };

  useEffect(() => {
    if (removeUser) {
      setUser(undefined);
      setRemoveUser(false);
      localStorage.removeItem("$@token");
    }
  }, [removeUser]);

  useEffect(() => {
    dispatch(cartActions.getCartProducts());
    dispatch(authActions.getToken());
  }, [dispatch]);

  useEffect(() => {
    if (authUser.token) {
      const authToken: any = localStorage.getItem("$@token");
      const decodedUser: any = jwt_decode(authToken);
      dispatch(getCredit(decodedUser.id));
      setUser(decodedUser);
    }
    return () => {
      // cleanup
    };
  }, [authUser.token, dispatch]);


  return (
    <>
      <Navbar sticky="top" className="nav-bar ml-auto" expand="lg">
        <Navbar.Brand className="nav-bar-brand" href="http://localhost:3000/">
          <div className="logo-container">
            <Image
              src={roullete}
              style={{ width: "100px" }}
              className="logo-img"
              alt="Logo Commerc-e"
            />
            <Image
              src={lip}
              style={{ width: "100px" }}
              className="logo-img-lip"
              alt="Logo Commerc-e"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Watch />
            <SearchBar />

            {authUser.token ? (
              <NavDropdown
                title={
                  <h1 className="title-dropdown">
                    Hi, {getFirstName(user?.first_name)}
                  </h1>
                }
                id="navbarScrollingDropdown"
                className="dropdown-user"
              >
                <NavDropdown.ItemText>
                  {" "}
                  Credit: ${authCredit?.userCredit?.amount}
                </NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/checkout/records">
                  Checkout Record
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.ItemText>
                  <Button className="log-out-btn" onClick={logOut}>
                    Log Out
                  </Button>
                </NavDropdown.ItemText>
              </NavDropdown>
            ) : (
              <Nav.Link
                className="sign-in-link"
                href="http://localhost:3000/authentication"
              >
                Sign In
              </Nav.Link>
            )}
          </Nav>
          <Nav.Link href="http://localhost:3000/cart">
            <div>
              <FaShoppingCart className="shop-cart" />
              <span id="cart-counter" className="products-cart">
                {cartProducts.cart ? cartProducts.cart.length : 0}
              </span>
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
