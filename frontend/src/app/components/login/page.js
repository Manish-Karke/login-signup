"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { handleError, handleSucess } from "../../utils/handling";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
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
          "Content-Type": "application/json",
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
        const detail = error?.details?.[0]?.message;
        handleError(detail || "An error occurred");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message || "Network error");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={login.email}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={login.password}
            />
          </label>
        </div>

        <button type="submit">Login</button>
        <span>
          Don&apos;t have an account?{" "}
          <a href="/components/register">Register</a>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
