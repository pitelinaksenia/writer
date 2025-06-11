import {get, ref, set, remove} from "firebase/database";
import {db} from "../services/firebase.js";
import {GetObjectCommand, PutObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {coverBucket, bookBucket, s3} from "../services/storage.js";
import {generateUUID} from "../core/utils.js";

const dbRef = ref(db, 'books');

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
				book.coverPath = await getImageURL(book.coverPath)
				console.warn("XXX", book.coverPath);
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

export async function getImageURL(imageKey) {
	if (!imageKey) return '';
	const params = {
		Bucket: coverBucket,
		Key: imageKey,
	};

	try {
		const command = new GetObjectCommand(params);
		const url = await getSignedUrl(s3, command, {expiresIn: 36000});
		console.log(url)// URL действителен 1 час
		return url;
	} catch (err) {
		console.error("Ошибка получения URL:", err);
		return '';
	}
}

/* BookData:
	id
	title
	author
	description
	year
	cover
	source
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

async function addFileToStorage(file, bucketName, filePath) {

	if (!file || !(file instanceof File)) {
		return false;
	}

	const arrayBuffer = await file.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer);

	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: filePath,
		Body: uint8Array,
		ContentType: file.type
	});

	try {
		await s3.send(command);
		console.log('Файл успешно загружен');
		return true;
	} catch (error) {
		console.error('Ошибка загрузки файла:', error);
		return false;
	}
}

export async function deleteBook(bookId) {

	const path = `${bookId}`;

	const coverDeleteResult = await deleteFileFromStorage(coverBucket, path);
	if (!coverDeleteResult) {
		console.log('Не удалось удалить обложку')
		return false
	}

	// Удаляем источник
	const sourceDeleteResult = await deleteFileFromStorage(bookBucket, path);
	if (!sourceDeleteResult) {
		console.log('Не удалось удалить source книги')
		return false;
	}

	// Удаляем запись из Firebase
	const bookRef = ref(db, `books/${bookId}`);
	const firebaseRemovePromise = remove(bookRef);
	if (!firebaseRemovePromise) {
		console.log(`Не удалось удалить книгу ${bookId} promise нет`);
		return false;
	}

	console.log(`Книга ${bookId} успешно удалена из базы данных`);
	return true;
}

async function deleteFileFromStorage(bucketName, filePath) {
	if (!filePath) {
		console.log('Delete file with filePath: null ignored');
		return false;
	}

	try {
		const command = new DeleteObjectCommand({
			Bucket: bucketName,
			Key: filePath
		});
		await s3.send(command);
		console.log(`Файл ${filePath} удален из бакета ${bucketName}`);
		return true;
	} catch (error) {
		console.error(`Ошибка удаления файла ${filePath}:`, error);
		return false;
	}
}


async function getBookDetails(bookId) {
	if (!bookId) {
		console.log()
	}

	const snapshot = await get(ref(db, `books/${bookId}`));
	if (snapshot.exists()) {
		const book = snapshot.val();

		const promiseArray = book.map(async book => {
			book.coverPath = await getImageURL(book.coverPath)
			console.warn("XXX", book.coverPath);
			return book;
		})
		await Promise.all(promiseArray);
		return book;
	} else {
		console.log("Данные не найдены");
		return null;
	}

}