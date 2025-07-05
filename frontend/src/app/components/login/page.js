"use client";
import React, { useState } from "react";
import Link from "next/link";
import { handleError, handleSucess } from "../../utils/handling";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...login };
    copyloginInfo[name] = value;
    setLogin(copyloginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "https://login-signup-sigma-wine.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const result = await response.json();

      const { message, success, jwtToken, name, error } = result;
      if (success) {
        handleSucess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          router.push("/components/home");
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
      <h1>login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">
            <input
              onChange={handlechange}
              type="email"
              name="email"
              placeholder="Enter ur email"
              value={login.email}
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
              value={login.password}
            />
          </label>
        </div>

        <button>Login</button>
        <span>
          Don't have an account?
          <a href="/components/register">Register</a>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default login;
