"use client";
import React, { useState } from "react";

import { handleError, handleSucess } from "../../utils/handling";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const signUp= () => {
  const router = useRouter();
  const [singnup, setSingnup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...singnup };
    copySignupInfo[name] = value;
    setSingnup(copySignupInfo);
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = singnup;
    if (!name || !email || !password) {
      return handleError("name email and password are required");
    }
    try {
      const url = "https://login-signup-sigma-wine.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(singnup),
      });
      const result = await response.json();

      const { message, success, error } = result;
      if (success) {
        handleSucess(message);
        setTimeout(() => {
          router.push("/components/login");
        }, 1000);
      } else if (error) {
        const detail = error?.details[0]?.message;
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container">
      <h1>signUp</h1>
      <form onSubmit={handlesignup}>
        <div>
          <label htmlFor="name">
            <input
              onChange={handlechange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter ur name"
              value={singnup.name}
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            <input
              onChange={handlechange}
              type="email"
              name="email"
              placeholder="Enter ur email"
              value={singnup.email}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              onChange={handlechange}
              type="password"
              name="password"
              placeholder="Enter ur password"
              value={singnup.password}
            />
          </label>
        </div>

        <button>signup</button>
        <span>
          already have an account
          <a href="/components/login">Login</a>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default signUp;
