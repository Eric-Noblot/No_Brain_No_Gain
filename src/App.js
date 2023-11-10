import './App.css';
import Home from "./components/Home/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Connexion from "./components/Connexion/Connexion"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Quiz from "./components/Quiz/Quiz"
import Game from "./components/Game/Game"
import Jeux from "./components/jeux"
import Test from "./components/test"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home /> } />
        <Route path="/game" element={<Game />} />
        <Route path="/game/quiz/:category" element={<Quiz />} />
        <Route path="/game/jeux/:category" element={<Jeux />} />
        <Route path="/game/test/:category" element={<Test />} />

      </Routes>
    </Router>
  );  
}

export default App;
