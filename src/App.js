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
import "bootstrap/dist/css/bootstrap.min.css"; //à ajouter pour faire apparaitre les élements de react-bootstrap
import { useEffect, useState} from "react"
import { getDoc, doc } from "firebase/firestore"
import { db, auth } from "./components/Firebase/firebase.js"

function App() {

  // const [dataFromFirestore, setDataFromFirestore] = useState(0)

  // const useCallback = async () => {


  // }

  // const getDataFromFirestore = async () => {

  //   const userId = auth.lastNotifiedUid

  //   const docRef = doc(db, `users/${userId}`);
  //   const docSnap = await getDoc(docRef);
    
  //   if (docSnap.exists()) {
  //       const userData = docSnap.data()
  //       setDataFromFirestore(userData)
  //       console.log(userData)
  //   } else {
  //       console.log("pas de données !");       
  //   }
  // }

  // useEffect(() => {


  // getDataFromFirestore()

  // },[])
  
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
