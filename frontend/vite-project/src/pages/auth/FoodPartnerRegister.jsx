import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

function FoodPartnerRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [contactName, setcontactname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");

  //    const businessName = e.target.businessName.value;

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post(
        
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/food-partner/register`,
        {
          name,
          contactName,
          phone,
          email,
          password,
          address,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/create-food");

      console.log(Response.data);
      toast.success("Successfully Register", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.Response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 ">
        <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 ">
          <h2 className="text-3xl font-bold text-center text-white">
            Create Account
          </h2>
          <p className="text-gray-400 text-center">
            Create your Account to become Partner
          </p>

          <form className="space-y-5" onSubmit={formHandler}>
            {/* Row 1: Full Name + Contact Name */}
            <div className="flex flex-col md:flex-row gap-4 ">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Contact Name
                </label>
                <input
                  value={contactName}
                  onChange={(e) => setcontactname(e.target.value)}
                  type="text"
                  placeholder="Contact Name"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 2: Phone + Address */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  type="text"
                  placeholder="00000000000"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <input
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 3: Email + Password */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="**********"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold text-white"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/food-partner/login"
              className="text-blue-400 hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default FoodPartnerRegister;
