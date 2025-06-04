import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LibraryBook from '../../components/LibraryBook/LibraryBook.jsx';
import {getBooks} from '../../api/books.js';
import styles from './LibraryPage.module.css';

const LibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const data = await getBooks();
                console.log(data);
                setBooks(data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        })();
    }, []);

    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`);
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
                    books.map((book) => (
                        <LibraryBook
                            key={book.id}
                            bookId={book.id}
                            title={book.title}
                            cover={book.cover}
                            description={book.description}
                            onClick={() => handleBookClick(book.id)}
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