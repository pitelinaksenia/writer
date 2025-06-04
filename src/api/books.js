import {get, ref} from "firebase/database";
import {db} from "../services/firebase.js";

const dbRef = ref(db, 'books');

export async function getBooks() {
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		} else {
			console.log("Данные не найдены");
			return null;
		}
	} catch (error) {
		console.error("Ошибка при получении книг:", error);
		throw error; // Пробрасываем ошибку для обработки в вызывающем коде
	}
}