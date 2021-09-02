import React from "react"
import { Route } from "react-router-dom"
import { Breads } from "./Breads"
import { LandingPage } from "./LandingPage"
import { Meats } from "./Meats"
import { Toppings } from "./Toppings"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <LandingPage />
            </Route>

            <Route path="/breads">
                <Breads />
            </Route>

            <Route path="/meats">
                <Meats />
            </Route>

            <Route path="/toppings">
                <Toppings />
            </Route>
        </>
    )
}
