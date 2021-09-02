import React from "react"
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";

export const RonSwanson = () => {
    return (
        <>
            <NavBar />
            <h1>Ron Swanson Burgers</h1>
            <ApplicationViews />
        </>
    )
}