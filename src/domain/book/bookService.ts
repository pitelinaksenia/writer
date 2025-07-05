import {get, ref, set, remove, update} from "firebase/database";
import {db} from "../../services/firebase";
import {coverBucket, bookBucket, getFileURL, addFileToStorage, deleteFileFromStorage} from "../../services/storage.js";
import {generateUUID} from "../../core/utils";
import {Book, BookDataWithActionStatus, FileEditAction, AddBookFormData, BookToSave} from "./book";

const dbRef = ref(db, 'books');

export async function getBooks(): Promise<Book[] | null> {
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const books: Book[] = Object.values(snapshot.val());

            const promiseArray = books.map(async (book: Book) => {
                if (book.coverPath) {
                    book.coverPath = await getFileURL(book.coverPath, coverBucket);
                }
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

export async function addBook(bookData: AddBookFormData): Promise<boolean> {
    const newKey: string = generateUUID();
    let sourcePath: string = `${newKey}`
    let coverPath: string | null = null;

    bookData.id = newKey;

    if (bookData.cover && bookData.cover instanceof File) {
        coverPath = `${newKey}`;
        if (!await addFileToStorage(bookData.cover, coverBucket, coverPath)) {
            return false;
        }
    }

    if (bookData.source && !(await addFileToStorage(bookData.source, bookBucket, sourcePath))) {
        if (coverPath) {
            await deleteFileFromStorage(coverBucket, coverPath);
        }
        return false;
    }


    const bookToSave: BookToSave = {
        id: newKey,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        year: bookData.year,
        coverPath: coverPath || null,
        sourcePath: bookData.source ? sourcePath : null
    };

    const bookRef = ref(db, `books/${newKey}`);

    try {
        await set(bookRef, bookToSave);
        console.log("Книга успешно добавлена!");
        return true;
    } catch (error) {
        console.error("Ошибка при добавлении книги: ", error);
        if (coverPath) {
            await deleteFileFromStorage(coverBucket, coverPath);
        }
        if (bookData.source) {
            await deleteFileFromStorage(bookBucket, sourcePath);
        }
        return false;
    }
}

export async function deleteBook(bookId: string): Promise<boolean> {

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

export async function updateBook(bookData: BookDataWithActionStatus): Promise<boolean> {
    const userRef = ref(db, `books/${bookData.id}`);

    const updates: Partial<Book> = {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        year: bookData.year || undefined,
        coverPath: await handleFileEditAction(
            bookData.id,
            bookData.coverActionStatus ?? FileEditAction.Keep,
            bookData.cover ?? null,
            coverBucket,
            bookData.coverPath
        ),
        sourcePath: await handleFileEditAction(
            bookData.id,
            bookData.sourceActionStatus ?? FileEditAction.Keep,
            bookData.source ?? null,
            bookBucket,
            bookData.sourcePath
        ),
    };

    try {
        await update(userRef, updates);
        console.log("Данные обновлены успешно.");
        return true;
    } catch (error) {
        console.error("Ошибка при обновлении:", error);
        return false;
    }
}

async function handleFileEditAction(fileKey: string, editAction: FileEditAction, file: File | null, bucketName: string, currentFilePath: string | null) {
    let filePath: string | null = currentFilePath;
    if (editAction === FileEditAction.Remove) {
        await deleteFileFromStorage(bucketName, fileKey);
        filePath = null;
    } else if (editAction === FileEditAction.Replace) {
        // replaces old file
        await addFileToStorage(file, bucketName, fileKey);
        filePath = fileKey;
    }
    return filePath;
}


export async function getBookDetails(bookId: string): Promise<Book | null> {
    if (!bookId) {
        console.error("bookId не передан");
        return null;
    }
    try {
        const snapshot = await get(ref(db, `books/${bookId}`));
        if (snapshot.exists()) {
            const bookData: Book = snapshot.val();
            console.log("Raw sourcePath from DB:", bookData.sourcePath);
            if (bookData.coverPath) {
                bookData.coverPath = await getFileURL(bookData.coverPath, coverBucket);
                console.log("Cover URL:", bookData.coverPath);
            }
            if (bookData.sourcePath) {
                bookData.sourcePath = await getFileURL(bookData.sourcePath, bookBucket);
                console.log("Cover URL:", bookData.sourcePath);
            }
            return bookData;
        } else {
            console.log("Книга с id", bookId, "не найдена");
            return null;
        }
    } catch (error) {
        console.error("Ошибка при получении книги:", error);
        return null;
    }
}
