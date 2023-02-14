import React from "react";
import { useAuth } from "./auth";

function Logout() {
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault()
        auth.logout();
    }
    return (
        <>
            <h1>
                Page Logup
            </h1>

            <form onSubmit={logout}>
                <label>¿Estas seguro de salir? </label>
                <button type="submit">Salir</button>
            </form>

        </>
    )
}

export default Logout;