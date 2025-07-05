# Secure User Authentication System

A robust and secure user authentication system built with **Next.js (App Router)** for the frontend and **Node.js/Express.js** for the backend. It features user registration, login, and protected routes, leveraging modern security practices like JWT for stateless authentication, bcrypt for password hashing, and Joi for server-side validation.

## Table of Contents

## Features

- **User Registration:** Secure creation of new user accounts with password hashing.
- **User Login:** Authenticates users and issues JSON Web Tokens (JWT) for session management.
- **Protected Routes:**
  - **Frontend:** Client-side protection using `localStorage` and Next.js `router` to restrict access to authenticated users.
  - **Backend:** Middleware to verify JWTs, ensuring only authorized requests access sensitive resources.
- **Password Hashing:** Uses `bcrypt` to securely store user passwords in the database.
- **Input Validation:** Employs `Joi` on the backend for robust schema validation of user inputs (e.g., registration, login).
- **Stateless Authentication:** Leverages JWTs, making the backend highly scalable.
- **Client-Side Authentication State Management:** React `useState` and `useEffect` hooks, along with a `RefreshHandler` component, manage the user's authentication status.

## Technologies Used

**Frontend:**

- **Next.js (App Router):** React framework for building fast web applications.
- **React.js:** UI library for building user interfaces.
- **`next/link`:** For optimized client-side navigation.
- **`next/navigation`:** For programmatic routing in the App Router.
- **`"use client"`:** Directives for client-side components in Next.js App Router.

**Backend:**

- **Node.js:** JavaScript runtime for server-side development.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **`jsonwebtoken` (JWT):** For creating and verifying JSON Web Tokens.
- **`joi`:** For schema description and data validation.
- **`bcrypt`:** For securely hashing passwords.
- **Database (e.g., MongoDB, PostgreSQL, MySQL):** _Specify your chosen database here._

## Authentication Flow

1.  **Registration:**

    - User fills out registration form on the Next.js frontend.
    - Frontend sends credentials to the backend `/api/register` endpoint.
    - Backend uses `Joi` to validate input.
    - Backend hashes the user's password using `bcrypt`.
    - Backend saves the new user (with hashed password) to the database.

2.  **Login:**

    - User fills out login form on the Next.js frontend.
    - Frontend sends credentials to the backend `/api/login` endpoint.
    - Backend retrieves user from database.
    - Backend compares the provided password with the stored hashed password using `bcrypt.compare()`.
    - If credentials are valid, backend generates a JWT containing user information (e.g., user ID).
    - Backend sends the JWT back to the frontend.
    - Frontend stores the JWT in `localStorage`.

3.  **Client-Side Authentication State (`Page.js` & `RefreshHandler.js`):**

    - The `Page.js` component (likely your root `/` route) initializes `isAuthenticated` state to `false`.
    - `RefreshHandler.js` is rendered within `Page.js` and uses a `useEffect` hook.
    - On load, `RefreshHandler` checks for the JWT in `localStorage`.
    - If a token is found, `RefreshHandler` calls `setIsAuthenticated(true)` on its parent `Page.js` and, if the current `pathname` is a public route (`/`, `/components/login`, `/components/register`), it automatically redirects the authenticated user to `/components/home`.
    - If no token is found, `isAuthenticated` remains `false`.

4.  **Protected Client-Side Route (`app/components/home/page.js`):**

    - This page itself contains a `useEffect` hook that runs on component mount.
    - It checks for the presence of the JWT in `localStorage`.
    - If no token is found, it immediately redirects the user to `/components/login` using `router.replace()`, preventing unauthenticated access.
    - If a token is found, the protected content is rendered.

5.  **Protected Navigation Button (`Page.js`):**

    - The "Home" link on the root page calls `handleProtectedNavigation()`.
    - This function checks the `isAuthenticated` state.
    - If `isAuthenticated` is `true`, it navigates to `/components/home`.
    - If `isAuthenticated` is `false`, it navigates to `/components/login`.

6.  **Backend Protected Routes:**
    - For any request to a protected backend endpoint, the frontend sends the JWT in the `Authorization` header (e.g., `Bearer <token>`).
    - Backend uses an Express middleware to intercept the request.
    - The middleware verifies the JWT's authenticity and expiration using `jsonwebtoken`.
    - If the token is valid, the request proceeds to the route handler. Otherwise, an unauthorized error is returned.
