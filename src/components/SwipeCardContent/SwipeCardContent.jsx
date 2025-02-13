import { Children } from "react";
import CardContent from "../CardContent/CardContent";
import ImageButton from "../ImageButton/ImageButton";
import NavigationDots from "../NavigationDots/NavigationDots";
import styles from "./SwipeCardContent.module.css";

export default function SwipeCardContent({
  children,
  overline,
  direction,
  ...props
}) {
  return (
    <div className={styles.swipeCardContent__column}>
      <p className={styles.swipeCardContent__overline}>{overline}</p>
      <CardContent {...props} />
      <div
        style={{
          margin: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageButton
          name="arrowLeft"
          width="50px"
          height="50px"
          fill="none"
          onClick={() => {
            console.log("left-arrow clicked");
          }}
        ></ImageButton>
        <NavigationDots totalDots={3}></NavigationDots>
        <ImageButton
          name="arrowRight"
          width="50px"
          height="50px"
          fill="none"
          onClick={() => {
            console.log("right-arrow clicked");
          }}
        ></ImageButton>
      </div>
      {children}
    </div>
  );
}
