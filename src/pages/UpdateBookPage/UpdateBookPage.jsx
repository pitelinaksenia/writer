import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./UpdateBookPage.module.css";
import {updateBook, getBookDetails, FileEditAction} from "../../api/books.js";

const UpdateBookForm = () => {
    const {bookId} = useParams();
    const [bookData, setBookData] = useState({
        id: 0,
        title: '',
        author: '',
        description: '',
        year: '',
        cover: null,
        source: null,
        coverPath: null,
        sourcePath: null,
        coverActionStatus: FileEditAction.keep,
        sourceActionStatus: FileEditAction.keep,

    });
    const [coverPreview, setCoverPreview] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Загрузка данных книги при монтировании компонента
    useEffect(() => {
        const fetchBookData = async () => {
            setIsLoading(true);
            const bookData = await getBookDetails(bookId);
            if (bookData && bookData.id) {
                setBookData({
                    id: bookData.id,
                    title: bookData.title,
                    author: bookData.author,
                    description: bookData.description,
                    year: bookData.year,
                    coverPath: bookData.coverPath || null,
                    sourcePath: bookData.sourcePath,
                    coverActionStatus: FileEditAction.keep,
                    sourceActionStatus: FileEditAction.keep,
                });
                if (bookData.coverPath) {
                    setCoverPreview(bookData.coverPath);
                }
            } else {
                setError('failed to load book data');
                console.error('инвалид дата');
            }
            setIsLoading(false);
        };

        if (bookId) {
            fetchBookData();
        }
    }, [bookId]);

    // Обработка изменений в текстовых полях
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        if (files[0]) {
            setBookData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
            if (name === 'cover') {
                setCoverPreview(URL.createObjectURL(files[0]));
            }
        }
        bookData.coverActionStatus = FileEditAction.replace;
    };

    const handleDeleteCover = () => {
        bookData.coverActionStatus = FileEditAction.remove;
        setCoverPreview(null);
    }


    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await updateBook(bookData);
        if (result) {
            alert('Book updated successfully!');

        } else {
            setError('Failed to update book');
            console.error('Error updating book:');
        }
        setIsLoading(false);

    };

    return (
        <div className="update-book-container">
            <h2>Edit Book</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="update-book-form">
                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={bookData.description}
                        onChange={handleInputChange}
                        placeholder="Enter book description"
                        rows="4"
                    />
                </div>

                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="cover">Book Cover</label>
                    <input
                        type="file"
                        name="cover"
                        id="cover"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {coverPreview && (
                        <img src={coverPreview} alt="Cover Preview" className="cover-preview"/>
                    )}

                    <button type="button" className="submit-button" disabled={isLoading} onClick={handleDeleteCover}>
                        Удалить обложку
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="source">Book File</label>
                    <input
                        type="file"
                        name="source"
                        id="source"
                        accept=".pdf,.epub"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isLoading} onClick={handleSubmit}>
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBookForm;