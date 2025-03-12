import CardContent from "../CardContent/CardContent";
import ImageButton from "../ImageButton/ImageButton";
import NavigationDots from "../NavigationDots/NavigationDots";
import styles from "./SwipeCardContent.module.css";
import {useState} from "react";

export default function SwipeCardContent({
  children,
  overline,
  ...props
}) {
    const totalDots = 3;
    const [currentDot, setCurrentDot] = useState(0);

    const handlePrev = () => {
        setCurrentDot((prev) => (prev - 1 + totalDots) % totalDots);
    };

    const handleNext = () => {
        setCurrentDot((prev) => (prev + 1) % totalDots);
    };


    return (
    <div>
      <p className={styles.swipeCardContent__overline}>{overline}</p>
      <CardContent {...props} />
        <div className={styles.swipeCardContent__navigationContainer}>
          <ImageButton
            name="arrowLeft"
            width="50px"
            height="50px"
            onClick={handlePrev}
          ></ImageButton>
          <NavigationDots totalDots={totalDots} currentDot={currentDot}></NavigationDots>
          <ImageButton
            name="arrowRight"
            width="50px"
            height="50px"
            onClick={handleNext}
          ></ImageButton>
        </div>
      {children}
    </div>
  );
}

