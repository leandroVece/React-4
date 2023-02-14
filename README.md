## React IV

En este tutorial vamos a hablar por fin de React Router, esta es una alternativa de react para crear sitios web de manera dinamica. Para comenzar primero debemos crear un nuevo proyecto react.

    npx create-react-app nombre

Aqui lo creamos con el comando npx para crearlo de forma temporal, por cualquier problema que se pudiera tener con las versiones que tenemos en nuestro ordenador. por ejemplo, la version de React-router-dom 5 solo soporta hasta la version de reat de 17, las del 18 para arriba tendran que instalar la version 6.

    npm install --save react-router-dom

>Si tienes alguna duda de si se instalo o no, puedes ir y buscar en el archivo de package.json en dependence si se encuentra instalada con su respectiva version.

### React Router Dom 6 

Antes de empezar es necesario aclarar que React domm tiene 3 tipos de Routers:

- Browser Router: Su navegación funciona por medio de los Slash / que indican en que página de la aplicación estamos. Este lo usamos si tenemos una ubicación de otro HTML cargado en el backend, si no lo encuentra retorna un Error 404.
- Hast Router: Su navegación funciona por medio de los Slash Hashes y Slash /#/, esto nos puede servir para renderizar contenido guiándonos con los hash gracias a JavaScript. Este no nos saca del index.html, esto nos sirve para crear páginas SPA.
- Memory Router: Funciona por medio de un Array de rutas que nos indica en que ruta estamos y renderizar ese contenido. Se suele usar para aplicaciones móviles para cambiar de vistas.

Esta pequeña Aclaracion esta para que cada uno busque, si asi lo desea, mas informacion sobre el tema. Por ahora comencemos a crear nuevas rutas, empezando por borrar todo de nuestro archivo app.js y pegar el siguiente codigo

    import './App.css';
    import { HashRouter, Routes, Route } from 'react-router-dom'
    import { Fragment } from 'react';
    import Home from './Home';
    import Blog from './Blog';
    import Abaut from './Abaut';
    import Menu from './Menu';

    function App() {
    return (
        <Fragment>
        <HashRouter>
            <Menu />

            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blob' element={<Blog />} />
            <Route path='/profile' element={<Abaut />} />
            </Routes>
        </HashRouter>
        </Fragment>
    );
    }

    export default App;

El HashRouter es un provider, similar al de React.context, donde podemos poner dentro las rutas con el Hash navegation.

Routes es la parte de nuestra aplicacion que va a cambiar dependiendo de la ruta en la que estemos.

Route los archivos que renderizamos.

Luego crearemos los otros archivos que estan para rellenar que son menu, home, blog y abaut.

import React from "react";

    function Home() {
        return (
            <did>
                <h1>
                    Page Home
                </h1>
            </did>
        )
    }
    export default Home;

    import React from "react";

    function Blog() {
        return (
            <did>
                <h1>
                    Page Blog
                </h1>
            </did>
        )
    }

    export default Blog;

    import React from "react";

    function Abaut() {
        return (
            <did>
                <h1>
                    Page Abaut
                </h1>
            </did>
        )
    }

    export default Abaut;

import React from "react";

    function Menu() {
        return (
            <nav>
                <ul>
                    <li >Home</li>
                    <li >Profile</li>
                    <li >BLog Page</li>
                </ul>
            </nav>
        )
    }

    export default Menu

Ahora si vamos a nuestro navegador y colocamos http://localhost:3000/#/blog Renderizara la pagina Blog. de la misma manera renderizara las demas Paginas.

Pero Hacerlo manual no es para nada estetico ni practico. por lo que pongamos en marcha la logica que establecera los endpoint por nosotros.

Antes del siguiente ejercicio, vamos a aclarar algunas diferencias.

La etiqueta a:
- Hace una petición al servidor.
- Tenemos que aclarar el uso del #.
    
        <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/#/blog">Blog</a>
            </li>
            <li>
                <a href="/#/profile">Profile</a>
        </li> 

Link:

- No hace una petición del servidor.
- No tenemos que aclarar el uso del #.

        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/blog">Blog</Link>
        </li>
        <li>
            <Link to="/profile">Profile</Link>
        </li> 

NavLink:

- No hace una petición al servidor.
- No tenemos que aclarar el uso del #.
- Cuando le queremos dar una clase o estilos, nos va a permitir que le entreguemos una función que retorne un string, o las propiedades para la etiqueta “style” en un objeto, ¿Para que nos sirve esto? pues gracias a esta cualidad podemos recibir un parámetro llamado “isActive”

isActive:
Gracias a este parámetro vamos a poder asignar estilos especiales a la etiqueta <NavLink> cuando la ruta le corresponda.
    
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'blue',
            })}
            to="/"
          >Home</NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'blue',
            })}
            to="/blog"
          >Blog</NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'blue',
            })}
            to="/profile"
          >Profile</NavLink>
        </li>

Lo que nosotros hacemos cuando hacemos uso del link o navLink es pedirle a Js que recargue o hidrate el contenido de la pagina sin tener que recargar la pagina. Sin embargo, en este ultimo ejemplo no es muy optimo repetir tanto codigo. Una solucion seria crear un arreglo de rutas que queremos renderizar.

        function Menu() {
        return (
        <nav>
            <ul>
                {routes.map((route) => (
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
                ))}
            </ul>
            </nav>

        const routes = [];
        routes.push({
        to: '/',
        text: 'Home',
        });
        routes.push({
        to: '/blog',
        text: 'Blog',
        });
        routes.push({
        to: '/profile',
        text: 'Profile',
        });

## useParams: rutas dinámicas

### ¿Qué son las rutas dinámicas?

Digamos que tenemos una aplicación la cual nos envía a cierto contenido, ejemplo aplicación/blog/**como-aprender-react**, esta ultima parte en negrita se llama slug, lo que nos permite es tener una base en la que exponer cierto contenido, pero intercalando la información en caso de que el slug cambie también.

Por ejemplo, en caso de que cambiemos el enlace pero la base sea la misma ejemplo: aplicación/blog/**como-aprender-ingles**, nos daríamos cuenta de que la maquetación sigue siendo la misma, solo que tiene diferente información, ya que si el slug cambia, el contenido cambia, pero como parte de una sola base, tiene la misma composición pero diferente contenido.

Veamolo en un ejemplo. **blog.js**

    import React from "react";
    import { Link } from "react-router-dom";
    import blogData from './BlogData'

    function Blog() {
        return (
            <did>
                <h1> Page Blog</h1>
                <ul>
                    {
                        blogData.map((post) => (
                            <BlogLink
                                key={post.slug}
                                post={post}
                            />
                        ))
                    }
                </ul>
            </did>
        )
    }

    function BlogLink({ post }) {
        return (
            <li>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
        )
    }

    export default Blog;

**BlogPost.js**

    import React from "react";
    import { useParams } from "react-router-dom";
    import blogData from './BlogData'

    function BlogPost() {
        const { slug } = useParams();

        const post = blogData.find(x => x.slug === slug)
        return (
            <>
                <h2> {post.title}</h2>
                <p>{post.content}</p>
            </>
        )
    }

    export default BlogPost;

**app.js**

import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react';
import Home from './Home';
import Blog from './Blog';
import Abaut from './Abaut';
import Menu from './Menu';
import BlogPost from './BlogPost';

    function App() {
    return (
        <Fragment>
        <HashRouter>
            <Menu />

            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:slug' element={<BlogPost />} />
            <Route path='/profile' element={<Abaut />} />
            <Route path='/*' element={<h2>No found</h2>} />
            </Routes>
        </HashRouter>
        </Fragment>
    );
    }

    export default App;

## UseNavigation

useNavigate es un React Hook que es similar a los componentes de Link o NavLink, pero en vez de llevarnos a una ruta automáticamente por medio de un click, nos permite que con JavaScript cambiemos esta URL.

    import React from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import blogData from './BlogData'

    function BlogPost() {
        const { slug } = useParams();
        const navigator = useNavigate();

        const returnToBlog = () => {
            navigator(-1)
        }

        const post = blogData.find(x => x.slug === slug)
        return (
            <>
                <h2> {post.title}</h2>
                <p>{post.content}</p>
                <button onClick={returnToBlog}>Volver un paso atras</button>
            </>
        )
    }

    export default BlogPost;

este no es el unico caso, podemos en vez de mandar un menos uno mandar el endpoint que queremos volver y conseguir un efecto similar que con Link.

## Outlet: nested routes

Outlet es el componente que nos permite trabajar con nested routes. Nested es como se define a las cosas que están dentro de otras. Nested routes, son rutas dentro de otras rutas hijas de una ruta madre.

Con esto React nos permita renderizar más de una ruta a la vez, teniendo una ruta dentro de otra ruta madre, y esto se puede hacer varias veces.

Los cambios van a ser simples en nuestro archivo app.js remplazaremos nuestros Routers

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />}>
            <Route path=':slug' element={<BlogPost />} />
          </Route>
          <Route path='/Abaut' element={<Abaut />} />
          <Route path='/*' element={<h2>No found</h2>} />
        </Routes>

y en el archivo blog, llamaremos a una nueva dependencia y agregaremos nuestro outlet.

    import React from "react";
    import { Link, Outlet } from "react-router-dom";
    import blogData from './BlogData'

    function Blog() {
        return (
            <>
                <h1> Page Blog</h1>
                <Outlet />
                <ul>
                    {
                        blogData.map((post) => (
                            <BlogLink
                                key={post.slug}
                                post={post}
                            />
                        ))
                    }
                </ul>
            </>
        )
    }

Al recargar veremos que ambos contenidos estan en el mismo archivo y ya no de manera separada.

## useAuth: Authentication con React Router

Llegados a este punto podemos comenzar a crear rutas privadas, con base en la autenticación de usuarios.

crearemos un nuevo archivo llamado Auth para que administre este estado de entrada y salida por nosotros.

    import React from "react"
    import { useNavigate } from "react-router-dom";

    const authContext = React.createContext();

    //Creartmos un provider para acceder a el.
    function AuthProvider({ children }) {
        const [user, setUser] = React.useState(null)
        const navigator = useNavigate()

        const login = ({ username }) => {
            setUser({ username })

            navigator('/profile')
        }
        const loguot = () => {
            setUser(null)
            navigator('/home')
        }

        const auth = { user, login, loguot }

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

    //de manera provisional exportaremos el provider para acceder a la informacion
    export {
        AuthProvider,
        useAuth
    }

Luego crearemnos un archivo login copiaremos el siguiente codigo

    import React, { useState } from "react";
    import { useAuth } from "./auth";

    function LogIn() {
        const [username, setUsername] = useState('');
        const auth = useAuth();

        const login = (e) => {
            e.preventDefault()
            auth.login({ username })
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

Necesitaremos otro archivo que nos ayude a salir de nuestro estado de logueo y otro mas que sera el archivo oculto. para ello crearemos otro archivo Logput y profile.

    import React from "react";

    function Logout() {

        const logout = (e) => {
            e.preventDefault()
            console.log()
        }
        return (
            <>
                <h1>
                    Page Logup
                </h1>

                <form onSubmit={logout}>
                    <label>¿Estas seguro de salir? </label>
                    <button type="submit">Login</button>
                </form>

            </>
        )
    }

    export default Logout;

**profile**

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

>Nota: El tema de las rutas se las dejara como reto.

Como pueden experimentar, si nosotros entramos en el perfil sin "loguearse" nos producira un error. Esto, segun lo que queremos hacer, esta bien despues de todo esta opcion no deberia estar disponible si no se esta logueado.

Entonces debemos esconder esta opcion del menu. Primero a nuestro array de rutas le vamos a agregar un nueva propiedad llamada private. que estara por defecto en false a exepcion de logout y profile que son los que queremos esconder.

     routes.push({
        to: '/',
        text: 'Home',
        private: false
    });

>Nota: solo mostrare uno los demas casos se los dejo a ustedes.

Luego agregaremos un condicional y para eso necesitaremos llamar a nuestro usecontext.

    function Menu() {

        const auth = useAuth()

            return (
            <nav>
                <ul>
                    {routes.map((route) => {
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

De esta manera podremos verificar si estamos autenticados y si nuestra ruta es privada. Pero todavia no esta completo, todavia necesitamos esconder login cuando entramos nos logueamos.

Para ello vamos a agregar un 4 parametro solo a la ruta de login.

    routes.push({
        to: '/login',
        text: 'login',
        private: false,
        publicOnly: true
    });

Luego agregaremos un tercer condicional a nuestro map.

    if (route.publicOnly && auth.user) return null

>Nota: Con esto ya estaria funcionando. Esta no es la unica solucion, tambien podria haber pregunado en el condicional si era loguin y si estaba autenticado, pero te lo dejo como reto para que lo descubras.

## Navigate y redirects: protegiendo rutas privadas

Ahora que escondimos nuestras rutas, necesitamos protegerlas para que nadie entre en ellas de manera manual y destruya nuestro codigo.

Vamos a ver dos maneras diferentes. La primera es agregar un condicional manualmente en nuestras paginas que nos redireccione al loguin.

    if (!auth.user) {
        return <Navigate to='/login' />
    }

y la segunda seria crear una funcion que llamara a esta logica. de esa manera evitamos la redundancia.

    import React from "react"
    import { Navigate, useNavigate } from "react-router-dom";

    const authContext = React.createContext();

    //Creartmos un provider para acceder a el.
    function AuthProvider({ children }) {
        const [user, setUser] = React.useState(null)
        const navigator = useNavigate()

        const login = ({ username }) => {
            setUser({ username })

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

**profile.js**

    import React from "react";
    import { useAuth, AuthRouter } from "./auth";

    function Profile() {
        const auth = useAuth()

        return (
            <AuthRouter>
                <h1>
                    Page Profile
                </h1>
                <h3>hola {auth.user?.username}</h3>
            </AuthRouter>
        )
    }

    export default Profile;

>Nota: si prestamos atencion vemos que agregue un signo de pregunta. Con esto le digo que si existe que lo devuelva, de lo contrario devolvera null.

De esta manera evitamos romper el codigo. Sin embargo, se puede encontrar un tercer camino para evitar usar el operador ternario.

Devolvamos nuestro archivo profile a su estado anterior y en Menu cambiemos las rutas que queremos proteger.

    <Route
        path='/logup'
        element={
        <AuthRouter>
            <Logout />
        </AuthRouter>} />
    <Route
        path='/profile'
        element={<AuthRouter>
        <Profile />
        </AuthRouter>} />

Ahora para evitar loguearse, despues de estar logeado tambien tendremos que evitar que la gente entre en ese lugar. Para ello podriamos usar un nuevo metodo que llamariamos NoAuthRouter() y escribiriamos una logica de validacion inversa, pero como este esta es la unica pagina podemos usar la primera forma que aprendimos en esta seccion.

    if (auth.user) {
            return <Navigate to='/' />
    }

## Rolesy permisos

Los roles y permisos es algo muy comun en las paginas web. Confiando en que ya sabes que son y para que sierve vamos a proceder en dar una administracion simple en nuestra pagina web.

Comencemos creando dos array. En el primero array determinaremos los roles y lo que pueden hacer. En el segundo crearemos usuarios con roles.

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

Luego en la funcion de autenticacion de Loguin agregaremos una linea extra para extraer el rol.

    const login = ({ username }) => {
        const Isrol = users.find(user => (user.name === username) ? user.rol : null)
        setUser({ username, Isrol })
        navigator('/profile')
    }

Finalemnte en el blogPost veremos si tienen autorizacion o no.

    const authorityDelet = auth.user?.Isrol?.rol.delete
    const authorityEdit = auth.user?.Isrol?.rol.write

    return (
            <>
                <h2> {post.title}</h2>
                <p>{post.content}</p>
                <button onClick={returnToBlog}>Volver un paso atras</button>
                {authorityEdit && (
                    <button>Editar blog</button>
                )}
                {authorityDelet && (
                    <button>Eliminar blog</button>
                )}
            </>
        )
    }