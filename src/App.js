import './App.css';
import Home from "./components/Home/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Connexion from "./components/Connexion/Connexion"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Quiz from "./components/Quiz/Quiz"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home /> } />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:category" element={<Quiz />} />

      </Routes>
    </Router>
  );  
}

export default App;
