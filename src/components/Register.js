import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const vbirthday = (value) => {
  if (value < 18) {
    return (
      <div className="invalid-feedback d-block">
        Still to young!
      </div>
    );
  }
};


const vcity = (value) => {
  if (value.length < 3 ) {
    return (
      <div className="invalid-feedback d-block">
        The city must greater 3.
      </div>
    );
  }
};

const vpostalCode = (value) => {
  if (value.length < 3 ) {
    return (
      <div className="invalid-feedback d-block">
        The vpostalCode must greater 3 digits .
      </div>
    );
  }
};


const vstreetNameAndNumber = (value) => {
  if (value.length < 3) {
    return (
      <div className="invalid-feedback d-block">
        The Street and number greeter be greater than 3 .
      </div>
    );
  }
};


const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};


const vfirstname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The firstname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vsurname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The lastname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vcountry = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The country must be between 3 and 20 characters.
      </div>
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
  if (!value===vpassword) {
    return (
      <div className="invalid-feedback d-block">
        The password must be same.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [surname, setsurname] = useState("");
  const [birthday, setbirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setcheckPassword] = useState("");
  const [city, setcity] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [country, setcountry] = useState("");
  const [streetNameAndNumber, setstreetNameAndNumber] = useState("");


  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
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

  
  const onChangefirstname = (e) => {
    const firstname = e.target.value;
    setfirstname(firstname);
  };

  const onChangesurname = (e) => {
    const surname = e.target.value;
    setsurname(surname);
  };

  const onChangecountry = (e) => {
    const country = e.target.value;
    setcountry(country);
  };


  const onChangebirthday = (e) => {
    const currentYear = new Date().getFullYear();
    const agebirth = e.target.value.split("-")[0];
    const birthday = currentYear - agebirth;

    setbirthday(birthday);
}


const onChangeCity = (e) => {
  const city = e.target.value;
  setcity(city);
  
};

const onChangePostalCode = (e) => {
  const postalCode = e.target.value;
  setpostalCode(postalCode);
  
};

const onChangeStreetNameAndNumber = (e) => {
  const streetNameAndNumber = e.target.value;
  setstreetNameAndNumber(streetNameAndNumber);
};


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register( username,firstname,
        surname,
        birthday,
        email, password,checkpassword,
        city,postalCode,country,
        streetNameAndNumber).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
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
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>

              <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangefirstname}
                  validations={[required, vfirstname]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <Input
                  type="text"
                  className="form-control"
                  name="surname"
                  value={surname}
                  onChange={onChangesurname}
                  validations={[required, vsurname]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <Input
                type="date"
                 className="form-control"
                 name="birthday"
                 value={birthday}
                placeholder="mm/dd/yyyy"
                 aria-describedby="button-addon2"
                onChange={onChangebirthday}
              validations={[ vbirthday]}
                />
               </div>


              <div className="form-group">
                <label htmlFor="country">Country</label>
                <Input
                  type="text"
                  className="form-control"
                  name="country"
                  value={country}
                  onChange={onChangecountry}
                  validations={[required, vcountry]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="city">City</label>
                <Input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={onChangeCity}
                  validations={[required, vcity]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="streetNameAndNumber">Street name and number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="streetNameAndNumber"
                  value={streetNameAndNumber}
                  onChange={onChangeStreetNameAndNumber}
                  validations={[required, vstreetNameAndNumber]}
                />
              </div>



              <div className="form-group">
                <label htmlFor="city">Postal Code</label>
                <Input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={postalCode}
                  onChange={onChangePostalCode}
                  validations={[required, vpostalCode]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="checkpassword">Password Verify</label>
                <Input
                  type="password"
                  className="form-control"
                  name="checkpassword"
                  value={checkpassword}
                  onChange={onChangecheckPassword}
                  validations={[required, vcheckpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};


export default Register;
