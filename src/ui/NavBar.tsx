import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Watch from "../components/NavBarWatch";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { authActions } from "../store/slices/auth";
import jwt_decode from "jwt-decode";
import { fetchCredit } from "../store/slices/auth";
import logo from "../assets/img/commerc-e-logo.png";
import "./style/NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state: RootStateOrAny) => state.cart);
  const authUser = useSelector((state: RootStateOrAny) => state.auth);

  interface User {
    first_name: string;
    id: number;
  }

  const [cartValues, setCartValues] = useState([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState("");
  const [showModelCredit, setShowModelCredit] = useState(false);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    const localCartProducta: any = localStorage.getItem("cart");
    setCartValues(JSON.parse(localCartProducta));
    return () => {
      // cleanup;
    };
  }, [cartProducts.cartProducts]);

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
    if (authUser.userCredit) {
      setCredit(authUser.userCredit.amount);
    }
  }, [authUser.userCredit]);

  const logOut = () => {
    localStorage.removeItem("$@token");
    dispatch(authActions.removeUser());
  };

  const handleClose = () => setShowModelCredit(false);

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
      <Navbar className="nav-bar" expand="lg">
        <Navbar.Brand href="http://localhost:3000/">
          <Image src={logo} style={{ width: "200px" }} alt="Logo Commerc-e" />
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
                title={<h1>Hi, {user?.first_name}</h1>}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#action4">${credit}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  <Button onClick={logOut}>Log Out</Button>
                </NavDropdown.Item>
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
              <MdShoppingCart className="shop-cart" />
              <span id="lblCartCount" className="products-cart">
                {cartValues ? cartValues.length : ""}
              </span>
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
