import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

const Auth = () => {
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
    const res = await fetch(`http://127.0.0.1:5000/api/v1/session/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInForm),
    });

    const data = await res.json();

    console.log(data);
  };
  console.log(signUpForm);
  const signUp = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/api/v1/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpForm),
    });

    const data = await res.json();

    console.log(data);
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
              controlId="formBasicEmail"
              onSubmit={signIn}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={changeSignInForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
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
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                id="firstName"
                type="text"
                onChange={changeSignUpForm}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                onChange={changeSignUpForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={changeSignUpForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
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
