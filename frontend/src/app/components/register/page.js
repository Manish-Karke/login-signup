"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { handleError, handleSucess } from "../../utils/handling";

export default function SignUpPage() {
  const router = useRouter();
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      const url = "https://login-signup-steel-ten.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const result = await response.json();

      const { message, success, error } = result;

      if (success) {
        handleSucess(message);
        setTimeout(() => {
          router.push("/components/login");
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name"
              value={signup.name}
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signup.email}
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
              value={signup.password}
            />
          </label>
        </div>

        <button type="submit">Sign Up</button>
        <span>
          Already have an account? <a href="/components/login">Login</a>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
