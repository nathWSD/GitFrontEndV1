import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./Register.css";
import AuthService from "../services/auth.service";
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

const vcheckpassword = (value) => {
  const passwordValidation = vpassword(value); // Invoke vpassword function to get the validation result
  if (passwordValidation) {
    return (
      <div className="invalid-feedback d-block">The password must be same.</div>
    );
  }
};

const ForgottenPassword = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
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

  const onChangephonenumber = (e) => {
    const phonenumber = e.target.value;
    console.log("Phone Number:", phonenumber); // Log the value of phonenumber
    const isValidPhoneNumber = /^\d{10}$/g.test(phonenumber);

    // If the input is valid, update the phone number state
    if (isValidPhoneNumber) {
      setphonenumber(phonenumber);
    }
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
    const checkpassword = e.target.value;
    setcheckPassword(checkpassword);
  };

  

  const handleForgottenPassword = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.ResetPersonalData(
        username,
        email,
        password,
        phonenumber,
        checkpassword
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
    <div>
      <Form onSubmit={handleForgottenPassword} ref={form}>
        {!successful && (
          <div>
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
              <label htmlFor="phonenumber">Phone Number</label>
              <Input
                type="text"
                className="form-control"
                name="phonenumber"
                placeholder="Enter phone number"
                value={phonenumber}
                onChange={onChangephonenumber}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber">new Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter new username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber">new Password</label>
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
              <label htmlFor="phonenumber">Check Password</label>
              <Input
                type="password"
                className="form-control"
                name="checkPassword"
                placeholder="repeat your password"
                value={checkpassword}
                onChange={onChangecheckPassword}
                validations={[required, vcheckpassword]}
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
          <button className="btn btn-primary btn-block">Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default ForgottenPassword;
