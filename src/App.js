import "./index.css";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
 
function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const redirect_uri = window.location.href.includes("localhost") ? "http://localhost:3000/login" : "https://main.dowohft4k2j57.amplifyapp.com/login";

  function handleLogin(newState) {
    setLogin(newState);
    navigate('/');
  }

  function handleLogout() {
    Cookies.remove('ghAccessToken');
    Cookies.remove('ghUsername');
    Cookies.remove('ghPfp');
    Cookies.remove('ghUserUrl');
    Cookies.remove('ghUsername');
    Cookies.remove('ghUserReposUrl');
    navigate("/");
  }

  return (
      <>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Navbar onLogout={handleLogout} redirectUri={redirect_uri}/>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={Cookies.get('ghAccessToken') ? <Navigate to="/" /> : <Login setLogin={setLogin}/>}></Route>
        </Routes>
      </>
  );
}
 
export default App;
