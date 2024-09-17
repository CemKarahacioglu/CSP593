import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Homework1 from "./pages/Homework1";
/* import Homework2 from "./pages/Homework2"; */
import HomePage from "./pages/HomePage"; // Home or landing page
import UnderConstructionSection from "./pages/UnderConstruction";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";

import AuthForm from "./pages/Auth/AuthForm";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className={`main-content`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route
              path="/under-construction"
              element={<UnderConstructionSection />}
            />
            <Route path="/homework1" element={<Homework1 />} />
            {/* <Route path="/homework2" element={<Homework2 />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
