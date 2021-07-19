import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Watch from "../components/NavBarWatch";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { authActions } from "../store/slices/auth";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state: RootStateOrAny) => state.cart);
  const authUser = useSelector((state: RootStateOrAny) => state.auth.user);

  const goToCart = () => history.push("/cart");

  interface User {
    first_name: string;
  }

  const [cartValues, setCartValues] = useState([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState("");

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
      setUser(decodedUser);
      setToken(token);
    } else {
      setUser(undefined);
      setToken("");
    }
    return () => {
      // cleanup
    };
  }, [authUser]);

  console.log(authUser);

  const logOut = () => {
    localStorage.removeItem("$@token");
    dispatch(authActions.removeUser());
  };

  const history = useHistory();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="http://localhost:3000/">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Watch />
          <Nav.Link href="http://localhost:3000/cart">
            <div>
              {/* <h1>{cartValues ? cartValues.length : ""}</h1> */}
              <MdShoppingCart style={{ width: "50px", height: "150px" }} />
            </div>
          </Nav.Link>
          <SearchBar />

          {token ? (
            <NavDropdown
              title={<h1>Hi, {user?.first_name}</h1>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action4"></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <Button onClick={logOut}>Log Out</Button>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="http://localhost:3000/authentication">
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
