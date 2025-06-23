import React from "react";
import styles from './LibraryBook.module.css';

interface LibraryBookProps {
    bookId: string;
    title: string;
    cover: string | null;
    description: string;
    onClick: () => void;
    onDelete: () => void;
    onUpdate: () => void;
}

const LibraryBook: React.FC<LibraryBookProps> = ({
                                                     bookId,
                                                     title = '',
                                                     cover,
                                                     description = '',
                                                     onClick,
                                                     onDelete,
                                                     onUpdate
                                                 }) => {
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onDelete();
    };

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onUpdate();
    };

    return (
        <div
            className={styles.book}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onClick()}
            aria-label={`View details for ${title}`}
        >
            {cover && <img src={cover} alt={`${title} cover`} className={styles.cover}/>}
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                <button title="Delete" onClick={handleDelete} className={styles.deleteButton}>
                    Удалить
                </button>
                <button title="Update" onClick={handleUpdate} className={styles.updateButton}>
                    Редактировать
                </button>
            </div>
        </div>
    );
}

export default LibraryBook;



