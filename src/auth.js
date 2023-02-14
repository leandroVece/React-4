import React from "react"
import { Navigate, useNavigate } from "react-router-dom";

const authContext = React.createContext();


//Creartmos un provider para acceder a el.
function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null)
    const navigator = useNavigate()


    const login = ({ username }) => {
        const Isrol = users.find(user => (user.name === username) ? user.rol : null)
        setUser({ username, Isrol })
        navigator('/profile')
    }
    const logout = () => {
        setUser(null)
        navigator('/')
    }

    const auth = { user, login, logout }

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

//llamaremos al useContext
function useAuth() {
    const auth = React.useContext(authContext)
    return auth
}

function AuthRouter(props) {
    const auth = useAuth()
    if (!auth.user) {
        return <Navigate to='/login' />
    }
    return props.children
}

//de manera provisional exportaremos el provider para acceder a la informacion
export {
    AuthProvider,
    useAuth,
    AuthRouter
}

const roles = {
    admin: {
        type: 'admin',
        read: true,
        write: true,
        delete: true
    },
    editor: {
        type: 'editor',
        read: true,
        write: true,
        delete: false
    },
}

const users = [{
    name: 'ivana',
    rol: roles.admin
},
{
    name: 'fred',
    rol: roles.admin
},
{
    name: 'leonel',
    rol: roles.editor
}]
