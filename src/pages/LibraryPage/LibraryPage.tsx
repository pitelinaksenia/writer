import React from "react";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LibraryBook from '../../components/LibraryBook/LibraryBook';
import {deleteBook, getBooks} from '../../domain/book/bookService';
import styles from './LibraryPage.module.css';
import {Book} from "../../domain/book/book";


const LibraryPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const data: any = await getBooks();  //протипизировать нормально
                console.log(data);
                setBooks(data || []);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                setLoading(false);
            }
        })();
    }, []);

    const handleBookClick = (bookId: string): void => {
        navigate(`/book/${bookId}`);
    };

    if (loading) {
        return <div className={styles.libraryPage}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.libraryPage}>Ошибка: {error}</div>;
    }

    const handleDeleteBook = async (bookId: string): Promise<void> => {
        setLoading(true);
        try {

            const success = await deleteBook(bookId);
            if (success) {
                // Удаляем книгу из состояния
                setBooks(books.filter((book) => book.id !== bookId));
            } else {
                setError('Не удалось удалить книгу');
            }
        } catch (err: unknown) {
            setError('Ошибка при удалении книги: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBook = (bookId: string): void => {
        navigate(`/updatebook/${bookId}`);
    };

    if (loading) {
        return <div className={styles.libraryPage}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.libraryPage}>Ошибка: {error}</div>;
    }

    return (
        <div className={styles.libraryPage}>
            <h1 className={styles.pageTitle}>Библиотека</h1>
            <div className={styles.booksList}>
                {books.length > 0 ? (
                    books.map((book: Book) => (
                        <LibraryBook
                            key={book.id}
                            bookId={book.id}
                            title={book.title}
                            cover={book.coverPath}
                            description={book.description}
                            onClick={() => handleBookClick(book.id)}
                            onDelete={() => handleDeleteBook(book.id)}
                            onUpdate={() => handleUpdateBook(book.id)}
                        />
                    ))
                ) : (
                    <p>Книги не найдены</p>
                )}
            </div>
        </div>
    );
};

export default LibraryPage;