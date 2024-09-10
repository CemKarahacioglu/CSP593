import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Homework1 from "./pages/Homework1";
/* import Homework2 from "./pages/Homework2"; */
import HomePage from "./pages/HomePage"; // Home or landing page
import UnderConstructionSection from "./pages/UnderConstruction";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className={`main-content`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
  );
};

export default App;
