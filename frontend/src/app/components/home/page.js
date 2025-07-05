"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { handleError, handleSucess } from "../../utils/handling";

export default function HomePage() {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      handleSucess("User is logged out");
      setTimeout(() => {
        router.push("/components/login");
      }, 1000);
    } catch (error) {
      handleError(error.message || error);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = "https://login-signup-steel-ten.vercel.app/product";
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const result = await response.json();
      setProducts(result || []);
    } catch (error) {
      handleError(error.message || error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <p>Welcome Mr. {loggedInUser}</p>
      <button onClick={handleLogout}>Logout</button>

      <div>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
