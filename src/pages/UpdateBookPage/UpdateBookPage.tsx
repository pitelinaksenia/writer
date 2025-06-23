import React, {ChangeEvent} from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./UpdateBookPage.module.css";
import {updateBook, getBookDetails} from "../../domain/book/bookService.js"
import {BookDataWithActionStatus, FileEditAction} from "../../domain/book/book";
import styles from "./UpdateBookPage.module.css";


const UpdateBookForm: React.FC = () => {
    const {bookId} = useParams();
    const [bookData, setBookData] = useState<BookDataWithActionStatus>({
        id: "",
        title: "",
        author: "",
        description: "",
        year: "",
        cover: null,
        source: null,
        coverPath: null,
        sourcePath: null,
        coverActionStatus: FileEditAction.Keep,
        sourceActionStatus: FileEditAction.Keep,
    });
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Загрузка данных книги при монтировании компонента
    useEffect(() => {
        const fetchBookData = async () => {
            if (!bookId) return;

            setIsLoading(true);
            try {
                const bookData = await getBookDetails(bookId);
                if (bookData && bookData.id) {
                    setBookData({
                        id: bookData.id,
                        title: bookData.title,
                        author: bookData.author,
                        description: bookData.description,
                        year: bookData.year || "",
                        coverPath: bookData.coverPath || null,
                        sourcePath: bookData.sourcePath || null,
                        cover: null,
                        source: null,
                        coverActionStatus: FileEditAction.Keep,
                        sourceActionStatus: FileEditAction.Keep,
                    });
                    if (bookData.coverPath) {
                        setCoverPreview(bookData.coverPath);
                    }
                } else {
                    setError("Failed to load book data");
                    console.error("Invalid data");
                }
            } catch (err) {
                setError("Failed to load book data");
                console.error("Error fetching book data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookData();
    }, [bookId]);

    // Обработка изменений в текстовых полях
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Обработка изменений файлов
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, files} = e.target;
        const file = files?.[0] || null;
        setBookData((prevData) => ({
            ...prevData,
            [name]: file,
            ...(name === "cover" && {coverActionStatus: FileEditAction.Replace}),
            ...(name === "source" && {sourceActionStatus: FileEditAction.Replace}),
        }));

        if (name === "cover" && file) {
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    // Обработка удаления обложки
    const handleDeleteCover = (): void => {
        setBookData((prevData) => ({
            ...prevData,
            cover: null,
            coverActionStatus: FileEditAction.Remove,
        }));
        setCoverPreview(null);
    };

    // Обработка отправки формы
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await updateBook(bookData);
            if (result) {
                alert("Book updated successfully!");
            } else {
                setError("Failed to update book");
                console.error("Error updating book");
            }
        } catch (err) {
            setError("Failed to update book");
            console.error("Error updating book:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.updateBookContainer}>
            <h2>Edit Book</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.updateBookForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={bookData.title}
                        onChange={handleInputChange}
                        placeholder="Enter book title"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={bookData.author}
                        onChange={handleInputChange}
                        placeholder="Enter author name"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={bookData.description}
                        onChange={handleInputChange}
                        placeholder="Enter book description"
                        rows={4}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="year">Year of Publication</label>
                    <input
                        type="number"
                        name="year"
                        id="year"
                        value={bookData.year}
                        onChange={handleInputChange}
                        placeholder="Enter publication year"
                        min="1000"
                        max="2025"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="cover">Book Cover</label>
                    <input
                        type="file"
                        name="cover"
                        id="cover"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {coverPreview && (
                        <img src={coverPreview} alt="Cover Preview" className={styles.coverPreview}/>
                    )}
                    <button
                        type="button"
                        className={styles.submitButton}
                        disabled={isLoading}
                        onClick={handleDeleteCover}
                    >
                        Удалить обложку
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="source">Book File</label>
                    <input
                        type="file"
                        name="source"
                        id="source"
                        accept=".pdf,.epub"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBookForm;