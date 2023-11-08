import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, doc } from "firebase/firestore"

//firebase n'est pas une fonction dans un composant, simplement un fichier js dans lequel on finit par exporter des variables pour l'authentification qui nous seviront dans d'autres composants
const firebase = {

        apiKey: "AIzaSyDuTZqQ0tuiVfHpMBK3JiRpFodhsllA6m8",
        authDomain: "no-brain-no-gain.firebaseapp.com",
        projectId: "no-brain-no-gain",
        storageBucket: "no-brain-no-gain.appspot.com",
        messagingSenderId: "452181041312",
        appId: "1:452181041312:web:fce98af6590c7d2ddc29c5"      
}

const app = initializeApp(firebase)
export const auth = getAuth(app)

export const db = getFirestore()
export const user = (userId) => doc(db, `users/${userId}` ) //doc a besoin de la base de donnée en 1er argument
