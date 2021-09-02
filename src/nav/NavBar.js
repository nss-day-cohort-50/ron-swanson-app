import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Ron</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/breads">Breads</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/meats">Meats</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/toppings">Toppings</Link>
            </li>
        </ul>
    )
}