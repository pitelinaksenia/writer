import React, {ChangeEvent} from "react";
import {useState} from "react";
import "./AddBookPage.css";
import {coverBucket} from "../../services/storage.js";
import {addBook} from "../../domain/book/bookService.js";
import {AddBookFormData} from "../../domain/book/book";

const AddBookForm: React.FC = () => {
    const [bookData, setBookData] = useState<AddBookFormData>({
        id: "",
        title: "",
        author: "",
        description: "",
        year: "",
        cover: null,
        source: null,
    });

    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setBookData({...bookData, [name]: value});
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        const file = files?.[0] || null;
        setBookData({...bookData, [name]: file});

        if (name === "cover" && file) {
            const reader = new FileReader();
            reader.onload = (e) => setCoverPreview(e.target?.result as string | null);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("coverBucket:", coverBucket);
        if (!(await addBook(bookData))) {
            alert("Error adding book");
        }
        console.log("Form Data:", {
            id: bookData.id,
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            year: bookData.year,
            cover: bookData.cover,
            source: bookData.source,
        });
    };

    return (
        <div className="add-book-container">
            <h2>Добавить новую книгу</h2>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label htmlFor="title">Название</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={bookData.title}
                        onChange={handleInputChange}
                        placeholder="Введите название"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Автор</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={bookData.author}
                        onChange={handleInputChange}
                        placeholder="ФИО"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Аннотация</label>
                    <textarea
                        name="description"
                        id="description"
                        value={bookData.description}
                        onChange={handleInputChange}
                        placeholder="Введите аннотацию"
                        rows={4}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Год публикации</label>
                    <input
                        type="number"
                        name="year"
                        id="year"
                        value={bookData.year}
                        onChange={handleInputChange}
                        placeholder="Введите год публикации"
                        min="1000"
                        max="3000"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cover">Обложка</label>
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
                </div>

                <div className="form-group">
                    <label htmlFor="source">Файл книги</label>
                    <input
                        type="file"
                        name="source"
                        id="source"
                        accept=".pdf,.epub"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Добавить книгу
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;