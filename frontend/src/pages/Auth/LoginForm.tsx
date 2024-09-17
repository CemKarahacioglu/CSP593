// this file handles UI logic for the login form

import React, { useState } from "react";
import "./AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  validateLoginForm,
  ValidationErrors,
  LoginValues,
} from "./LoginValidation";
import LottieAnimation from "../../components/LottieAnimation";
import LoaderSpinner from "../../assets/LoaderSpinner.json";
import { useAuth } from "../../context/AuthContext";

const LoginForm: React.FC = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loginError, setLoginError] = useState<string>(""); // State to handle login errors from the server
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to handle loading state
  const { login } = useAuth(); // Get the login function from the AuthContext
  const navigate = useNavigate(); // To navigate after login

  // Function to simulate a delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value })); // Update the specific field
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors); // Set validation errors

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Start loading spinner

      try {
        console.log("Adding delay before processing login...");
        await delay(3000); // Delay of 3 seconds

        const response = await axios.post("http://localhost:8081/login", {
          email: values.email,
          password: values.password,
        });

        // Handle the response if login is successful
        if (response.status === 200) {
          console.log("Login successful");
          setLoginError(""); // Clear any previous errors

          const { name, email } = response.data; // Get the name and email from the response
          login({ name, email }); // Pass the name and email to the login function from AuthContext
          // Redirect the user to the home or dashboard page after login
          navigate("/");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setLoginError("Invalid credentials. Please try again.");
          // Clear both email and password fields
          setValues({ email: "", password: "" });
        } else {
          setLoginError("An error occurred during login. Please try again.");
        }
        console.error("There was an error logging in:", error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    } else {
      setIsLoading(false); // Stop loading spinner if validation errors exist
      console.log("Validation errors found:", validationErrors); // Log validation errors
    }
  };

  return (
    <div className="form-container" id="login">
      <h1>Welcome Back!</h1>
      <div>
        <form onSubmit={handleSubmit} className="form-content" noValidate>
          <div>
            <div className="field-wrap">
              <label htmlFor="email">
                <span className="req">*</span> Email Address
              </label>
              <input
                id="email"
                name="email"
                placeholder="me@example.com"
                type="email"
                required
                value={values.email}
                onChange={handleInput}
              />
              {errors.email && <p className="error">{errors.email}</p>}{" "}
              {/* Display email error */}
            </div>
            <div className="field-wrap">
              <label htmlFor="password">
                <span className="req">*</span> Password
              </label>
              <input
                id="password"
                name="password"
                placeholder="Your Password"
                type="password"
                required
                value={values.password}
                onChange={handleInput}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {loginError && <p className="error">{loginError}</p>}
            {/* Display login error */}
            <p className="forgot">
              <a href="#">Forgot Password?</a>
            </p>
          </div>
          <div className="button-wrapper">
            <button
              type="submit"
              className="button button-block"
              disabled={isLoading}
            >
              <div className="button-content">
                <div className="spinner-container">
                  {isLoading && (
                    <LottieAnimation
                      width="25px"
                      height="25px"
                      animationData={LoaderSpinner}
                    />
                  )}
                </div>
                <span className="button-text">Log in</span>
              </div>
            </button>

            <p>
              Not a client yet?{" "}
              <Link className="signup-link" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
