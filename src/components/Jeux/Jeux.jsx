import Navbar from "../NavBar/Navbar";
import {useParams} from "react-router-dom"
import Memory from "../Memory/Memory"
import Error from "../Error/Error"
const Jeux = () => {

    const params = useParams()
    const nameGame = params.category
    console.log(nameGame)

    const gameSelected = (game) => {
        switch(game) {
            case "memory" : 
            return <Memory />
            default :
            return <Error />
        }
    }
    return (
        <div style ={{color: "white"}}>
            <Navbar />
            {gameSelected(nameGame)}
        </div>
    );
};

export default Jeux;