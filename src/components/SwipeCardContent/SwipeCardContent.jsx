import CardContent from "../CardContent/CardContent";
import ImageButton from "../ImageButton/ImageButton";
import NavigationDots from "../NavigationDots/NavigationDots";
import styles from "./SwipeCardContent.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SwipeCardContent({ children, overline, contentCards, ...props }) {
    const totalDots = contentCards.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalDots) % totalDots);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalDots);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%", // Улетает влево или вправо
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 }, // На месте
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%", // Уходит влево или вправо
            opacity: 0,
        }),
    };

    return (
        <div>
            <p className={styles.swipeCardContent__overline}>{overline}</p>
            <div>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <CardContent {...contentCards[currentIndex]} {...props}></CardContent>
                </motion.div>
            </div>
            <div className={styles.swipeCardContent__navigationContainer}>
                <ImageButton name="arrowLeft" width="50px" height="50px" onClick={handlePrev}></ImageButton>
                <NavigationDots totalDots={totalDots} currentDot={currentIndex}></NavigationDots>
                <ImageButton name="arrowRight" width="50px" height="50px" onClick={handleNext}></ImageButton>
            </div>
            {children}
        </div>
    );
}
