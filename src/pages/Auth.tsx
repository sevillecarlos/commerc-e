import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Form, Button, Image, Spinner } from "react-bootstrap";
import { fetchSignIn, fetchSignUp } from "../store/slices/auth";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import logo from "../assets/img/commerc-e-logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdWhatshot } from "react-icons/md";
import { useHistory } from "react-router";
import { authActions } from "../store/slices/auth";
import "./style/Auth.css";

const Auth = () => {
  const history = useHistory();
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
    password_digest: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [showloader, setShowLoader] = useState(false);
  const [formError, setFormError] = useState("");
  const changeSignInForm = (e: any) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const changeSignUpForm = (e: any) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    setShowLoader(true);
    dispatch(fetchSignIn(signInForm));
  };
  const signUp = async (e: any) => {
    e.preventDefault();
    setShowLoader(true);

    dispatch(fetchSignUp(signUpForm));
  };

  useEffect(() => {
    if (authUser.userCredentials) {
      dispatch(fetchSignIn(authUser.userCredentials));
    }
  }, [authUser.userCredentials, dispatch]);

  useEffect(() => {
    if (authUser.token) {
      history.push("/");
    }
  }, [authUser.token, history]);

  useEffect(() => {
    if (authUser.errorSignIn !== "" || authUser.errorSignUp !== "") {
      setFormError(authUser.errorSignIn || authUser.errorSignUp);
      setShowLoader(false);
      dispatch(authActions.clearError());
    }
  }, [authUser.errorSignIn, authUser.errorSignUp, dispatch]);

  const tokenExist = localStorage.getItem("$@token");

  const authTabHeader = (title: string) => {
    return (
      <div style={{ textAlign: "center" }}>
        <h5 style={{ fontSize: "2vw" }}>{title}</h5>
        <Image src={logo} className="logo-auth" alt="Logo Commerc-e" />
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
          id="auth-tab"
          className="mb-3 tabs-auth"
          variant="pills"
        >
          <Tab
            className="tab-auth"
            eventKey="sign-in"
            tabClassName="tab-title-auth"
            title="Sign In"
          >
            {authTabHeader("Log In")}
            <Form onSubmit={signIn} autoComplete='off'>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmailSignIn"
                onSubmit={signIn}
              >
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control
                  name="user"
                  type="email"
                  required
                  className="input-auth"
                  placeholder="Enter email"
                  onChange={changeSignInForm}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordSignIn">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  name="password"
                  className="input-auth"
                  required
                  onChange={changeSignInForm}
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  className="form-label"
                  type="checkbox"
                  label="Show Password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Form.Group>
              <div className="error-msg-container">
                <span className="error-msg">{formError}</span>
              </div>
              {!showloader ? (
                <Button className="auth-btn" type="submit">
                  Log In <MdKeyboardArrowRight />
                </Button>
              ) : (
                <Button className="auth-btn">
                  <Spinner className="spinner-auth" animation="border" />
                </Button>
              )}
            </Form>
          </Tab>
          <Tab
            className="tab-auth"
            eventKey="sign-up"
            tabClassName="tab-title-auth"
            title="Sign Up"
          >
            {authTabHeader("Register")}
            <Form onSubmit={signUp} autoComplete='off'>
              <Form.Group className="mb-3" controlId="formBasicFirstNameSignUp">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  required
                  className="input-auth"
                  onChange={changeSignUpForm}
                  placeholder="Enter first name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastNameSignUp">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  className="input-auth"
                  type="text"
                  required
                  placeholder="Enter last name"
                  onChange={changeSignUpForm}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmailSignUp">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control
                  name="email"
                  className="input-auth"
                  type="email"
                  required
                  placeholder="Enter email"
                  onChange={changeSignUpForm}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordSignUp">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  name="password_digest"
                  className="input-auth"
                  type={`${showPassword2 ? "password" : "text"}`}
                  required
                  onChange={changeSignUpForm}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  className="form-label"
                  type="checkbox"
                  label="Show Password"
                  onClick={() => setShowPassword2(!showPassword2)}
                />
              </Form.Group>
              <div className="error-msg-container">
                <span className="error-msg">{formError}</span>
              </div>

              {!showloader ? (
                <Button className="auth-btn" type="submit">
                  Register <MdKeyboardArrowRight />
                </Button>
              ) : (
                <Button className="auth-btn">
                  <Spinner className="spinner-auth" animation="border" />
                </Button>
              )}
            </Form>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
