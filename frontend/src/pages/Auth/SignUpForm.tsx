import React, { useState } from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";
import {
  validateSignUpForm,
  ValidationErrors,
  SignUpValues,
} from "./SignUpValidation";
import axios from "axios";
import successImage from "/src/assets/success.jpg";
import LottieAnimation from "../../components/LottieAnimation";
import LoaderSpinner from "../../assets/LoaderSpinner.json";

const SignUpForm: React.FC = () => {
  const [values, setValues] = useState<SignUpValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to handle loading state

  // Function to simulate a delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Start loading spinner
      console.log(
        "No validation errors. Proceeding to submit the form to the backend."
      );

      try {
        console.log(
          "Adding delay before sending POST request to the backend..."
        );
        await delay(3000); // Simulate a 3 second delay
        console.log("Sending POST request to the backend...");
        const response = await axios.post(
          "http://localhost:8081/users/signup",
          {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          }
        );
        console.log("Response from server:", response.data);
        setSuccess(true); // on success set the success state to true
      } catch (error) {
        console.error("There was an error registering the user:", error);
      } finally {
        setIsLoading(false); // Stop spinner
      }
    } else {
      console.log("Validation errors found:", validationErrors); // Log validation errors
    }
  };

  if (success) {
    // Show success message if registration was successful
    return (
      <div className="success-message">
        <img src={successImage} alt="Success" className="" />
        <h2>Great! You've successfully signed up.</h2>
        <p>
          We've sent you a link to confirm your email address. Please check your
          inbox. It could take up to 10 minutes to show up in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="form-container" id="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form-content" noValidate>
        <div>
          <div className="top-row">
            <div className="field-wrap">
              <label htmlFor="firstName">
                <span className="req">*</span> First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Your First Name"
                type="text"
                required
                value={values.firstName}
                onChange={handleInput}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="field-wrap">
              <label htmlFor="lastName">
                <span className="req">*</span> Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Your Last Name"
                type="text"
                required
                value={values.lastName}
                onChange={handleInput}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>
          <div className="field-wrap">
            <label htmlFor="email">
              <span className="req">*</span> Email Address
            </label>
            <input
              id="email"
              name="email"
              placeholder="Your Email Address"
              type="email"
              required
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="field-wrap">
            <label htmlFor="password">
              <span className="req">*</span> Set A Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Create a Password"
              type="password"
              required
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
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
              <span className="button-text">Get Started</span>
            </div>
          </button>

          <p>
            Already a member?{" "}
            <Link className="login-link" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
