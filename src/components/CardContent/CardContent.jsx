import styles from "./CardContent.module.css";
export default function CardContent({
  title,
  description,
  info,
  buttons,
  children,
}) {
  return (
    <div className={styles.cardContent}>
      {title && <h2 className={styles.cardContent__title}> {title}</h2>}
      {description && (
        <h3 className={styles.cardContent__description}>{description}</h3>
      )}
      {info && <p className={styles.cardContent__info}>{info} </p>}
      {...buttons}
      {children}
    </div>
  );
}
