import React from "react";
import "./AuthForm.css";
import LoginForm from "./LoginForm";

const AuthForm: React.FC = () => {
  return (
    <div className="form-container">
      <LoginForm />
    </div>
  );
};

export default AuthForm;
