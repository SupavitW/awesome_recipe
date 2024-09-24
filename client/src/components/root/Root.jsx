import React from 'react';
// Use outlet for child component to be rendered
import { Outlet } from "react-router-dom";

// import css module for App
import "./root.css";

// import components
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer"

// Root component for every pages
export default function Root() {
    return (
        <div id="pageWrapper">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>

    )
}
