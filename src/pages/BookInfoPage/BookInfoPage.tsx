import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Document, Page, pdfjs} from 'react-pdf';
import {Book} from '../../domain/book/book';
import {getBookDetails} from '../../domain/book/bookService';
import styles from './BookInfoPage.module.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

const BookInfoPage: React.FC = () => {
    const {bookId} = useParams<{ bookId: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    // Загрузка сохраненной страницы
    useEffect(() => {
        if (bookId) {
            const savedPage = localStorage.getItem(`book_${bookId}_page`);
            if (savedPage) {
                setPageNumber(parseInt(savedPage, 10));
            }
        }
    }, [bookId]);

    // Загрузка данных книги
    useEffect(() => {
        const fetchBook = async () => {
            if (bookId) {
                try {
                    const bookData = await getBookDetails(bookId);
                    setBook(bookData);
                } catch (err) {
                    setError('Не удалось загрузить данные книги');
                    console.error('Ошибка загрузки книги:', err);
                }
            }
        };
        fetchBook();
    }, [bookId]);

    // Сохранение прогресса чтения
    useEffect(() => {
        if (bookId && pageNumber) {
            localStorage.setItem(`book_${bookId}_page`, pageNumber.toString());
        }
    }, [pageNumber, bookId]);

    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (err: Error) => {
        setError('Не удалось загрузить PDF');
        console.error('Ошибка загрузки PDF:', err);
    };

    const handleNextPage = () => {
        if (numPages && pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!book) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.metadata}>
                {book.coverPath && (
                    <img src={book.coverPath} alt={book.title} className={styles.cover}/>
                )}
                <h1 className={styles.title}>{book.title}</h1>
                <p className={styles.author}>Автор: {book.author}</p>
                <p className={styles.year}>Год: {book.year}</p>
                <p className={styles.description}>{book.description}</p>
            </div>

            {book.sourcePath ? (
                <div className={styles.reader}>
                    <Document
                        file={book.sourcePath}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        className={styles.pdfDocument}
                        loading={<div className={styles.loading}>Загрузка PDF...</div>}
                    >
                        <Page pageNumber={pageNumber} width={600}/>
                    </Document>
                    <div className={styles.navigation}>
                        <button
                            onClick={handlePrevPage}
                            disabled={pageNumber <= 1}
                            className={styles.navButton}
                        >
                            Предыдущая
                        </button>
                        <p>
                            Страница {pageNumber} из {numPages || '--'}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={numPages ? pageNumber >= numPages : true}
                            className={styles.navButton}
                        >
                            Следующая
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.error}>PDF-файл не найден</div>
            )}
        </div>
    );
};

export default BookInfoPage;