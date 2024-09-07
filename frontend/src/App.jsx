import React from "react";
import {
  BrowserRouter as Router, // This will act as your Router
  Routes,
  Route,
} from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import SellerDashboard from "./pages/SellerDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
