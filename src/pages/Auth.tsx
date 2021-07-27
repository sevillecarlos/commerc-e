import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";
import { Form, Button, Image } from "react-bootstrap";
import { fetchSignIn, fetchSignUp } from "../store/slices/auth";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import logo from "../assets/img/commerc-e-logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdWhatshot } from "react-icons/md";
import "./style/Auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootStateOrAny) => state.auth);

  const [signInForm, setSignInForm] = useState({
    user: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const changeSignInForm = (e: any) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const changeSignUpForm = (e: any) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    dispatch(fetchSignIn(signInForm));
  };
  const signUp = async (e: any) => {
    e.preventDefault();
    dispatch(fetchSignUp(signUpForm));
  };

  useEffect(() => {
    if (authUser.userCredentials) {
      console.log(authUser.userCredentials);
      dispatch(fetchSignIn(authUser.userCredentials));
    }
  }, [authUser.userCredentials, dispatch]);

  const tokenExist = localStorage.getItem("$@token");

  const authTabHeader = (title: string) => {
    return (
      <div style={{ textAlign: "center" }}>
        <h5 style={{ fontSize: "25px" }}>{title}</h5>
        <Image
          src={logo}
          style={{ width: "120px" }}
          className="logo-auth"
          alt="Logo Commerc-e"
        />
      </div>
    );
  };

  return (
    <div className="auth">
      {tokenExist ? (
        <div className="auth-msg">
          <h1>
            You are already Sign In <MdWhatshot />
          </h1>
        </div>
      ) : (
        <Tabs
          defaultActiveKey="sign-in"
          id="noanim-tab-example"
          className="mb-3 tabs-auth"
          variant="pills"
        >
          <Tab className="tab-auth" eventKey="sign-in" title="Sign In">
            {authTabHeader("Log In")}
            <Form onSubmit={signIn}>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmailSignIn"
                onSubmit={signIn}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="user"
                  type="email"
                  className="input-auth"
                  placeholder="Enter email"
                  onChange={changeSignInForm}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordSignIn">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  className="input-auth"
                  onChange={changeSignInForm}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button className="auth-btn" type="submit">
                Log In <MdKeyboardArrowRight size={25} />
              </Button>
            </Form>
          </Tab>
          <Tab className="tab-auth" eventKey="sign-up" title="Sign Up">
            {authTabHeader("Register")}
            <Form onSubmit={signUp}>
              <Form.Group className="mb-3" controlId="formBasicFirstNameSignUp">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  className="input-auth"
                  onChange={changeSignUpForm}
                  placeholder="Enter First Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastNameSignUp">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  className="input-auth"
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={changeSignUpForm}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmailSignUp">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  className="input-auth"
                  type="email"
                  placeholder="Enter email"
                  onChange={changeSignUpForm}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordSignUp">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  className="input-auth"
                  type="password"
                  onChange={changeSignUpForm}
                  placeholder="Password"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Password"
              onChange={changeSignUpForm}
            />
          </Form.Group> */}
              <Button className="auth-btn" type="submit">
                Register <MdKeyboardArrowRight size={25} />
              </Button>
            </Form>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
