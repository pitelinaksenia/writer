import {get, ref, set, remove, update} from "firebase/database";
import {db} from "../services/firebase.js";
import {coverBucket, bookBucket, getFileURL, addFileToStorage, deleteFileFromStorage} from "../services/storage.js";
import {generateUUID} from "../core/utils.js";

const dbRef = ref(db, 'books');

export const FileEditAction = {
	keep: "keep",
	replace: "replace",
	remove: "remove",
}

/* Book:
	id
	title
	author
	description
	year
	cover
	source
 */

export async function getBooks() {
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const books = Object.values(snapshot.val());

			const promiseArray = books.map(async book => {
				book.coverPath = await getFileURL(book.coverPath)
				return book;
			})
			await Promise.all(promiseArray);
			return books;
		} else {
			console.log("Данные не найдены");
			return null;
		}
	} catch (error) {
		console.error("Ошибка при получении книг:", error);
		throw error;
	}
}

/* BookData:
	id
	title
	author
	description
	year
	coverPath
	sourcePath
 */

export async function addBook(bookData) {
	const newKey = generateUUID();
	let sourcePath = `${newKey}`
	let coverPath = null;

	bookData.id = newKey;

	if (bookData.cover && bookData.cover instanceof File) {
		coverPath = `${newKey}`;
		if (!await addFileToStorage(bookData.cover, coverBucket, coverPath)) {
			return false;
		}
	}

	if (!await addFileToStorage(bookData.source, bookBucket, sourcePath)) {
		await deleteFileFromStorage(bookData.cover, coverBucket, coverPath);
		return false;
	}


	const bookToSave = {
		id: newKey,
		title: bookData.title,
		author: bookData.author,
		description: bookData.description,
		year: bookData.year,
		coverPath: coverPath || null,
		sourcePath: sourcePath
	};

	const bookRef = ref(db, `books/${newKey}`);

	await set(bookRef, bookToSave)
		.then(() => {
			console.log("Книга успешно добавлена!");
			return true;
		})
		.catch((error) => {
			console.error("Ошибка при добавлении книги: ", error);
			deleteFileFromStorage(coverBucket, coverPath);
			deleteFileFromStorage(bookBucket, sourcePath);
			return false;
		});
	return true;
}

export async function deleteBook(bookId) {

	const path = `${bookId}`;

	const coverDeleteResult = await deleteFileFromStorage(coverBucket, path);
	if (!coverDeleteResult) {
		console.log('Не удалось удалить обложку')
		return false
	}

	const sourceDeleteResult = await deleteFileFromStorage(bookBucket, path);
	if (!sourceDeleteResult) {
		console.log('Не удалось удалить source книги')
		return false;
	}

	const bookRef = ref(db, `books/${bookId}`);
	const firebaseRemovePromise = remove(bookRef);
	if (!firebaseRemovePromise) {
		console.log(`Не удалось удалить книгу ${bookId} promise нет`);
		return false;
	}

	console.log(`Книга ${bookId} успешно удалена из базы данных`);
	return true;
}

export async function updateBook(bookData) {
	const userRef = ref(db, `books/${bookData.id}`);

	const updates = {
		id: bookData.id,
		title: bookData.title,
		author: bookData.author,
		description: bookData.description,
		year: bookData.year,
		coverPath: await handleFileEditAction(bookData.id, bookData.coverActionStatus, bookData.cover, coverBucket),
		sourcePath: await handleFileEditAction(bookData.id, bookData.sourceActionStatus, bookData.source, bookBucket),
	};

	let result = false;
	await update(userRef, updates)
		.then(() => {
			console.log("Данные обновлены успешно.");
			result = true;
		})
		.catch((error) => {
			console.error("Ошибка при обновлении:", error);
		});
	return result;
}

async function handleFileEditAction(fileKey, editAction, file, bucketName) {
	let filePath = null;
	if (editAction === FileEditAction.remove) {
		await deleteFileFromStorage(bucketName, fileKey);
		filePath = null;
	} else if (editAction === FileEditAction.replace) {
		// replaces old file
		await addFileToStorage(file, bucketName, fileKey);
		filePath = fileKey;
	}
	return filePath;
}


export async function getBookDetails(bookId) {
	if (!bookId) {
		console.error("bookId не передан");
		return null;
	}
	try {
		const snapshot = await get(ref(db, `books/${bookId}`));
		if (snapshot.exists()) {
			const bookData = snapshot.val();
			if (bookData.coverPath) {
				bookData.coverPath = await getFileURL(bookData.coverPath);
				console.log("Cover URL:", bookData.coverPath);
			}
			return bookData;
		} else {
			console.log("Книга с id", bookId, "не найдена");
			return null;
		}
	} catch (error) {
		console.error("Ошибка при получении книги:", error);
	}
}
