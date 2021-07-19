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
import { Badge } from "react-bootstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

const NavBar = () => {
  const cartProducts = useSelector((state: RootStateOrAny) => state.cart);
  console.log(cartProducts);
  const goToCart = () => history.push("/cart");

  const history = useHistory();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Watch />
          <Nav>
            <MdShoppingCart
              onClick={goToCart}
              style={{ width: "50px", height: "150px" }}
            />
            <h1>{cartProducts.cartProducts.length}</h1>
          </Nav>

          {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <SearchBar />
        <Nav.Link href="http://localhost:3000/authentication">Sign In</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
