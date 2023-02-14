import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuth } from "./auth";

function Menu() {

    const auth = useAuth()


    const routes = [];
    routes.push({
        to: '/',
        text: 'Home',
        private: false
    });
    routes.push({
        to: '/blog',
        text: 'Blog',
        private: false
    });
    routes.push({
        to: '/abaut',
        text: 'abaut',
        private: false
    });
    routes.push({
        to: '/profile',
        text: 'profile',
        private: true
    });
    routes.push({
        to: '/login',
        text: 'login',
        private: false,
        publicOnly: true
    });
    routes.push({
        to: '/logup',
        text: 'logup',
        private: true
    });
    return (
        <nav>
            <ul>
                {routes.map((route) => {
                    if (route.publicOnly && auth.user) return null
                    if (route.private && !auth.user) return null
                    return (

                        <li key={route.to}>
                            <NavLink
                                style={({ isActive }) => ({
                                    color: isActive ? 'red' : 'blue',
                                })}
                                to={route.to}
                            >
                                {route.text}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Menu