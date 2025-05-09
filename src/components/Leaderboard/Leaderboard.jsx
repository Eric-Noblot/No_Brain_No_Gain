import "./leaderboard.css"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/firebase"; // Assure-toi que db est bien importée
import Navbar from "../NavBar/Navbar"

const Leaderboard = () => {

    const [usersWithScores, setUsersWithScores] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, "users");
                const snapshot = await getDocs(usersCollection);

                const usersData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const staticFields = ["email", "pseudo", "memory"];

                    const categoryScores = Object.entries(data)
                        .filter(([key]) => !staticFields.includes(key))
                        .reduce((acc, [key, value]) => {
                            acc[key] = value;
                            return acc;
                        }, {});

                    const totalScore = Object.values(categoryScores).reduce((sum, val) => sum + val, 0);

                    return {
                        id: doc.id,
                        email: data.email,
                        pseudo: data.pseudo,
                        categories: categoryScores,
                        totalScore
                    };
                });

                setUsersWithScores(usersData);
            } catch (err) {
                console.error("Erreur lors de la récupération des utilisateurs :", err);
            }
        };

        fetchUsers();
    }, []);

    const usersSortedByScore = usersWithScores.map((user) => {
        return {
            userName : user.pseudo[0].toUpperCase() + user.pseudo.slice(1).toLowerCase(),
            userScore: user.totalScore,
            userCategories : user.categories
        }
    }).sort((a, b) => b.userScore - a.userScore)
  
    return (
        <div>
            <Navbar />
            <div>
            <h2 className="leaderboard">QUIZ</h2>
                <table className="leaderboard" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Rang</th>
                            <th>Nom</th>
                            <th>Score</th>
                            {/* <th>Catégories</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {usersSortedByScore.map((user, index) => (
                            <tr key={user.pseudo}>
                                <td>{index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.userScore}</td>
                                {/* <td>
                                    {Object.entries(user.userCategories).map(
                                        ([category, score]) => (
                                            <div key={category}>
                                                <strong>{category}</strong>: {score}
                                            </div>
                                        ) 
                                    )}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 className="leaderboard">MEMORY</h2>
        </div>
    );
}

export default Leaderboard