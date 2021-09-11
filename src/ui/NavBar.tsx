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
import { fetchCredit } from "../store/slices/transaction";
import roullete from "../assets/img/roullete.png";
import lip from "../assets/img/lip.png";

import "./style/NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state: RootStateOrAny) => state.cart);
  const authUser = useSelector((state: RootStateOrAny) => state.auth);
  const authCredit = useSelector((state: RootStateOrAny) => state.transaction);

  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState("");
  const [showModelCredit, setShowModelCredit] = useState(false);

  useEffect(() => {
    const token: any = localStorage.getItem("$@token");
    if (token) {
      const decodedUser: any = jwt_decode(token);
      console.log(decodedUser);
      dispatch(fetchCredit(decodedUser.id));
      setUser(decodedUser);
      setToken(token);
    } else {
      setUser(undefined);
      setToken("");
    }
    return () => {
      // cleanup
    };
  }, [authUser.user, dispatch]);

  useEffect(() => {
    setShowModelCredit(authUser.firstTime);
    return () => {
      // cleanup
    };
  }, [authUser.firstTime]);

  useEffect(() => {
    dispatch(cartActions.getCartProducts());
  }, []);

  const logOut = () => {
    dispatch(authActions.removeUser());

    localStorage.removeItem("$@token");
  };

  const handleClose = () => setShowModelCredit(false);

  const getFirstName = (name: string) => {
    return name.split(" ").shift();
  };

  return (
    <>
      <Modal show={showModelCredit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congrats</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Receive 100$ credit</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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

            {token ? (
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
