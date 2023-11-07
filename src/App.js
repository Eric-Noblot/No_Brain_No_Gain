import './App.css';
import Home from "./components/Home/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Connexion from "./components/Connexion/Connexion"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );  
}

export default App;
