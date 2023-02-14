import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react';
import Home from './Home';
import Blog from './Blog';
import Abaut from './Abaut';
import Menu from './Menu';
import BlogPost from './BlogPost';
import Profile from './Profile';
import LogIn from './Login';
import Logout from './Logout';
import { AuthProvider, AuthRouter } from './auth';


function App() {

  return (
    <Fragment>

      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog />}>
              <Route path=':slug' element={<BlogPost />} />
            </Route>
            <Route path='/Abaut' element={<Abaut />} />

            <Route path='/login' element={<LogIn />} />
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

            <Route path='/*' element={<h2>No found</h2>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </Fragment>
  );
}

export default App;
