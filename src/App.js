import "./index.css";
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import Navbar from "./Navbar"
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
 
function App() {
  const navigate = useNavigate();

  function handleLogin(user) {
    console.log(user);
    Cookies.set("user", user);
    navigate("/");
  }

  function handleLogout() {
    Cookies.remove("user");
    navigate("/");
  }

  function handleSignup(user) {
    Cookies.set("user", user);
    navigate("/");
  }

  return (
      <>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Navbar onLogout={handleLogout}/>
        <Routes>
            <Route path='/' element={Cookies.get('user') ? <Home /> : <Navigate to="/login" />}></Route>
            <Route path='/login' element={Cookies.get('user') ? <Navigate to="/" /> : <Login onLogin = {handleLogin} />}></Route>
            <Route path='/signup' element={Cookies.get('user') ? <Navigate to="/" /> :<Signup onSignup = {handleSignup} />}></Route>
        </Routes>
      </>
  );
}
 
export default App;
