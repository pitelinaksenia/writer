import PropTypes from 'prop-types';
import styles from './LibraryBook.module.css';

export default function LibraryBook({bookId, title = '', cover = '', description = '', onClick, onDelete, onUpdate}) {
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(bookId);
    };

    const handleUpdate = (e) => {
        e.stopPropagation();
        onUpdate(bookId);
    };

    return (
        <div
            className={styles.book}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
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

LibraryBook.propTypes = {
    bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    cover: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};