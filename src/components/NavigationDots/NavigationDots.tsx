import React from "react";
import styles from "./NavigationDots.module.css";

interface DotsProps {
    totalDots: number;
    currentDot: number;
}

const NavigationDots: React.FC<DotsProps> = ({totalDots, currentDot}) => {
    return (
        <div className={styles.dots_container}>
            {[...Array(totalDots)].map((_, index) => (
                <div key={index} className={`${styles.dot} ${index === currentDot ? styles.active : ""}`}></div>
            ))}
        </div>
    );
}

export default NavigationDots;
