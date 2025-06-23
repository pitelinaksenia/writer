import React from "react";
import CardContent from "../CardContent/CardContent";
import ImageButton from "../ImageButton/ImageButton";
import NavigationDots from "../NavigationDots/NavigationDots";
import styles from "./SwipeCardContent.module.css";
import {useState} from "react";
import {motion, Variants} from "framer-motion";

interface ContentCard {
    title: string;
    description: string;
    info: string;
}

interface SwipeContentProps {
    children?: React.ReactNode;
    overline: string;
    contentCards: ContentCard[];
    buttons: React.ReactElement[];
    cardChildren?: React.ReactNode;
}

const SwipeCardContent: React.FC<SwipeContentProps> = ({
                                                           children,
                                                           overline,
                                                           contentCards,
                                                           buttons,
                                                           cardChildren = null, // По умолчанию null
                                                           ...props
                                                       }) => {
    const totalDots = contentCards.length;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(1);

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalDots) % totalDots);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalDots);
    };

    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {x: 0, opacity: 1},
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
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
                    transition={{type: "spring", stiffness: 400, damping: 30}}
                >
                    <CardContent
                        {...contentCards[currentIndex]}
                        buttons={buttons}
                        children={cardChildren}
                        {...props}
                    />
                </motion.div>
            </div>
            <div className={styles.swipeCardContent__navigationContainer}>
                <ImageButton name="arrowLeft" width="50px" height="50px" onClick={handlePrev}/>
                <NavigationDots totalDots={totalDots} currentDot={currentIndex}/>
                <ImageButton name="arrowRight" width="50px" height="50px" onClick={handleNext}/>
            </div>
            {children}
        </div>
    );
};

export default SwipeCardContent;