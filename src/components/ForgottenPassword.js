import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./ForgottenPassword.css";
import {forgottenPassword} from "../services/AdminAccessService";
import { useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">This is not a valid email.</div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vcheckpassword = (value, password) => {
  if (value.trim() !== password.trim()) {
    return (
      <div className="invalid-feedback d-block">The password must be the same.</div>
    );
  }
};


const validId = (value) => {
  if (!(value)) {
    return (
      <div className="invalid-feedback d-block">You must provide your Id.</div>
    );
  }
};
const ForgottenPassword = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [id , setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setcheckPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  
  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangecheckPassword = (e) => {
    const value = e.target.value;
    setcheckPassword(value);
  };

  

  const handleForgottenPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    const formIsValid = form.current.getChildContext()._errors.length === 0;

   if (formIsValid)  {
     await forgottenPassword(
        id,
        username,
        email,
        password,
      ).then(
        (response) => {
          setTimeout(() => {
            setSuccessful(true);
            setMessage(
              "reset Personal Data successful. Redirecting to login page..."
            );

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }, 2000);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="ForgottenPassword_container">
    <div className="ForgottenPassword_form">
      <Form onSubmit={handleForgottenPassword} ref={form}>
        {!successful && (
          <div>

            <div className="form-group">
              <label htmlFor="id">Your Id</label>
              <Input
                type="number"
                className="form-control"
                placeholder="Enter your ID"
                name="id"
                value={id}
                onChange={onChangeId}
                validations={[required, validId]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username"> Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">new Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkpassword">Check Password</label>
              <Input
                type="password"
                className="form-control"
                name="checkPassword"
                placeholder="repeat your password"
                value={checkpassword}
                onChange={onChangecheckPassword}
                validations={[required, () => vcheckpassword(checkpassword, password)]}
              />
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <div className="form-group">
          <button className="ButtonPasswordVergessen">Submit</button>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default ForgottenPassword;
