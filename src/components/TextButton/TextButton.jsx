import styles from "./TextButton.module.css";

export default function TextButton({ label, onClick }) {
  return (
    <button onClick={onClick} className={styles.cardContent__textButton}>
      {label}
    </button>
  );
}
