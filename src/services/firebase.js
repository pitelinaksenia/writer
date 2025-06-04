import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyClevccstBHi-lBKhOg7qWJetWpm34KnWw",
	authDomain: "writer-dev-bd9cb.firebaseapp.com",
	projectId: "writer-dev-bd9cb",
	storageBucket: "writer-dev-bd9cb.firebasestorage.app",
	messagingSenderId: "277129761527",
	appId: "1:277129761527:web:24992dea1c2994803df9f2",
	measurementId: "G-Q1K0RC40CD",
	databaseURL: "https://writer-dev-bd9cb-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
