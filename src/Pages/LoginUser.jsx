import React, { useState } from "react";
import "../Styles/LoginUser/LoginUser.css";
import logo from "../assets/Buytown logo 1.png";
import { Link } from "react-router-dom";
import { LoginApi } from "../Services/Api";
import { storeUserData } from "../Services/Storage";
import { isAuthenticated } from "../Services/Auth";
import { Navigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginUser = () => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;

    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      LoginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if ((err.code = "ERR_BAD_REQUEST")) {
            setErrors({ ...errors, custom_error: "INVALID_LOGIN_CREDENTIALS" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setErrors({ ...errors });
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="main_default_container">
      <div className="main_logo">
        <img src={logo} alt="" />
      </div>
      <div className="Login_form">
        <form onSubmit={handleSubmit} action="">
          <p className="wel">Welcome Back !</p>
          <h3>Log In</h3>
          <h4>Your Account to Continue</h4>
          <h5>Email</h5>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            id=""
            onChange={handleInput}
          />
          {errors.email.required ? (
            <span>
              <h6>Email is required</h6>
            </span>
          ) : null}
          <h5>Password</h5>
          <div className="password">
            <input
              className="Pass"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              id=""
              onChange={handleInput}
            />
            <span onClick={handleClick}>
              {show ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          {errors.password.required ? (
            <span>
              <h6>Password is required</h6>
            </span>
          ) : null}

          <div className="Danger">
            {errors.custom_error ? (
              <p className="custom">{errors.custom_error}</p>
            ) : null}
          </div>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary " role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            true
          )}

          <input
            className="Login_submit"
            type="submit"
            disabled={loading}
            value="Login"
          />

          <div className="re-direct">
            <span>
              {" "}
              Don't You Have an Account ?{" "}
              <Link to="/register">
                <label>Sign Up</label>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
