import styles from "./NavigationDots.module.css";

export default function NavigationDots({ totalDots, currentDot }) {
  return (
    <div className={styles.dots_container}>
      {[...Array(totalDots)].map((_, index) => (
        <div
          key={index}
          className={`${styles.dot} ${index === currentDot ? styles.active : ""}`}
        ></div>
      ))}
    </div>
  );
}
