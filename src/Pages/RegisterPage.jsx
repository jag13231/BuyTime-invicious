import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/Buytown logo 1.png";
import "../Styles/RegisterPage/Register.css";
import { RegisterApi } from "../Services/Api";
import { storeUserData } from "../Services/Storage";
import { isAuthenticated } from "../Services/Auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const RegisterPage = () => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };
  const [txt, setTxt] = useState("");
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
  const handleText = (e) => {
    const { value } = e.target;
    const re = /^[A-Za-z]+$/;
    if (value === "" || re.test(value)) {
      setTxt(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (txt === "") {
      errors.name.required = true;
      submitError = true;
    }
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
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if ((err.response.data.message = "EMAIL_EXISTS")) {
            setErrors({
              ...errors,
              custom_error: "Already this email has been registered !",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setErrors({ ...errors });
  };
  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <div className="main_default_container">
        <div className="main_logo">
          <img src={logo} alt="" />
        </div>
        <div className="Login_form">
          <form onSubmit={handleSubmit} action="">
            <p>Create An Account</p>

            <h5>Name</h5>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              id=""
              onChange={handleText}
              value={txt}
            />
            {errors.name.required ? (
              <span>
                <h6>Name is required</h6>
              </span>
            ) : null}
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

            {errors.custom_error ? (
              <div className="Danger">
                <p className="custom">{errors.custom_error}</p>
              </div>
            ) : null}

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
              disabled={loading}
              type="submit"
              value="Submit"
            />

            <div className="re-direct">
              <span>
                {" "}
                Already You Have an Account ?{" "}
                <Link to="/login">
                  <label>Log In</label>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
