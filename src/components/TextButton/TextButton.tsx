import React from "react";
import styles from "./TextButton.module.css";

interface TextButtonProps {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TextButton: React.FC<TextButtonProps> = ({label, onClick}) => {
    return (
        <button onClick={onClick} className={styles.cardContent__textButton}>
            {label}
        </button>
    );
}

export default TextButton
