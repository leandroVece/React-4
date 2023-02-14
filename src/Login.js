import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

function LogIn() {
    const [username, setUsername] = useState('');
    const auth = useAuth();


    const login = (e) => {
        e.preventDefault()
        auth.login({ username })
    }

    if (auth.user) {
        return <Navigate to='/' />
    }
    return (
        <>
            <h1>
                Page Login
            </h1>

            <form onSubmit={login}>
                <label>Escribe tu UserName: </label>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LogIn;