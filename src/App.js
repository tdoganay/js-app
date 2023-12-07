import "./index.css";
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import Navbar from "./Navbar"
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { CookiesProvider, useCookies } from "react-cookie"
 
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  function handleLogin(user) {
    console.log(user);
    setCookie("user", user, { path: "/" });
    navigate("/");
  }

  function handleLogout() {
    removeCookie("user", { path: "/" });
    navigate("/");
  }

  function handleSignup(user) {
    setCookie("user", user, { path: "/" });
    navigate("/");
  }

  return (
    <CookiesProvider>
      <div>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <Navbar onLogout={handleLogout}/>
        <Routes>
            <Route path='/' element={cookies.user ? <Home /> : <Navigate to="/login" />}></Route>
            <Route path='/login' element={cookies.user ? <Navigate to="/" /> : <Login onLogin = {handleLogin} />}></Route>
            <Route path='/signup' element={cookies.user ? <Navigate to="/" /> :<Signup onSignup = {handleSignup} />}></Route>
        </Routes>
      </div>
    </CookiesProvider>
  );
}
 
export default App;
