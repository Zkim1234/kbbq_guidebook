import styles from "./BestComboButtonCard.module.css";

export default function BestComboButtonCard({
  category,
  heading,
  description,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.categoryTag}>{category}</span>
      </div>

      <div className={styles.infoBox}>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <button type="button" className={styles.howToCookButton}>
        Learn More
      </button>
    </article>
  );
}
