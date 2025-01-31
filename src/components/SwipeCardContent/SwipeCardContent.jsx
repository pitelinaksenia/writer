import CardContent from "../CardContent/CardContent";
import ImageButton from "../ImageButton/ImageButton";
import styles from "./SwipeCardContent.module.css";

export default function SwipeCardContent({ overline, direction, ...props }) {
  return (
    <div className="swipeCardContent">
      <p className={styles.swipeCardContent__overline}>{overline}</p>
      <CardContent {...props} />
      <ImageButton
        direction={direction}
        onClick={() => console.log("Swipe button clicked")}
      ></ImageButton>
    </div>
  );
}
