"use client";
import React, { useState, useEffect } from "react";
import { handleError, handleSucess } from "../../utils/handling";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [logginedInUser, setLogginedIn] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setLogginedIn(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      handleSucess("User is logout");
      setTimeout(() => {
        router.push("/components/login");
      }, 1000);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchproduct = async () => {
    try {
      const url = "https://login-signup-sigma-wine.vercel.app/product";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProduct(result||[]);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchproduct();
  }, []);

  return (
    <div>
      <p>welcom Mr. {logginedInUser}</p>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
        Array.isArray(product) &&
          product?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
