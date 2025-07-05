"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RefreshHandler from "./RefrshHandler.js"; // Ensure this path is correct

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Managed by RefreshHandler

  const handleProtectedNavigation = (href: string) => {
    // This logic is for when the button is clicked.
    // It correctly checks the `isAuthenticated` state.
    if (isAuthenticated) {
      router.push(href); // If logged in, go to the protected page
    } else {
      router.push("/components/login"); // If not logged in, go to login
    }
  };

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <div className="grid relative h-64 w-64 bg-gray-200 space-y-2 p-4">
        <Link href="/components/login">Login</Link>
        <Link href="/components/register">Register</Link>

        <Link
          href="#" // Or omit href if it's purely for onClick
          onClick={(e) => {
            e.preventDefault();
            handleProtectedNavigation("/components/home");
          }}
          className="text-blue-600 hover:underline"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
