import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { fetchSignIn, fetchSignUp } from "../store/slices/auth";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();

  const [signInForm, setSignInForm] = useState({
    email: "",
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
  return (
    <div>
      <Tabs
        defaultActiveKey="sign-in"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="sign-in" title="Sign In">
          <Form onSubmit={signIn}>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmailSignIn"
              onSubmit={signIn}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={changeSignInForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordSignIn">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={changeSignInForm}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="sign-up" title="Sign Up">
          <Form onSubmit={signUp}>
            <Form.Group className="mb-3" controlId="formBasicFirstNameSignUp">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                type="text"
                onChange={changeSignUpForm}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastNameSignUp">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                type="text"
                placeholder="Enter Last Name"
                onChange={changeSignUpForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmailSignUp">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={changeSignUpForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordSignUp">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
