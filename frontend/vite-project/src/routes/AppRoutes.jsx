import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../general/Home";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import CreateFood from "../pages/food-partner/CreateFood";

import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";

import Profile from "../pages/food-partner/profile";

function AppRoutes() {

  const [showLogin , setShowLogin] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/food-partner/register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

          <Route path="/" element={<Home />} />
          <Route path="/create-food" element={<CreateFood />} />
          <Route path="/food-partner/:id" element={<Profile />} />
          {/* <Route path="/create-food" element={<CreateFood />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
