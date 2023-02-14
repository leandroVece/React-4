import React from "react";
import { useAuth } from "./auth";

function Profile() {
    const auth = useAuth()

    return (
        <>
            <h1>
                Page Profile
            </h1>
            <h3>hola {auth.user.username}</h3>
        </>
    )
}

export default Profile;