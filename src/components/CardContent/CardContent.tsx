import React from "react";
import styles from "./CardContent.module.css";

interface CardContentProps {
    title: string;
    description?: string;
    info: string;
    buttons: React.ReactElement[];
    children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({title, description, info, buttons, children}) => {
    return (
        <div className={styles.cardContent__column}>
            {title && <h2 className={styles.cardContent__title}> {title}</h2>}
            {description && <h3 className={styles.cardContent__description}>{description}</h3>}
            {info && <p className={styles.cardContent__info}>{info} </p>}
            {buttons}
            {children}
        </div>
    );
}

export default CardContent
