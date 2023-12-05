import './App.css';
import "./index.css";
import Signup from "./Signup"
import Login from "./Login"
import Navbar from "./Navbar"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
 
function App() {
      return (
        <div>
          <Navbar />
          <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
  );
}
 
export default App;
