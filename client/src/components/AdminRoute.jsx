// src/components/AdminRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import Layout from "../pages/admin/Layout";
import Loader from "./Loader";

export function AdminRoute() {
    const { user, isAdmin } = useAppContext();
    const location = useLocation();

    // 1) Not logged in → show Clerk SignIn
    if (!user) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <SignIn fallbackRedirectUrl={location.pathname} />
            </div>
        );
    }

    if (isAdmin === null) {
        return <Loader />;
    }

    // 2) Logged in but not admin → kick back to home
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 3) Logged in *and* admin → render the admin layout (with nested routes)
    return <Layout />;
}
