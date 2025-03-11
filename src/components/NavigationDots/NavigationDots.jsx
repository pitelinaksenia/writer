import styles from "./NavigationDots.module.css";

export default function NavigationDots({ totalDots }) {
  return (
    <div className={styles.dots_container}>
      {[...Array(totalDots)].map((_, index) => {
        return <div key={index} className={styles.dot}></div>;
      })}
    </div>
  );
}

