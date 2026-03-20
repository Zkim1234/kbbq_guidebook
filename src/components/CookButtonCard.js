import styles from "./CookButtonCard.module.css";

export default function CookButtonCard({
  category,
  duration,
  heading,
  description,
  backgroundImage,
  backgroundPosition = "left bottom",
  backgroundSize = "contain",
}) {
  return (
    <article
      className={styles.card}
      style={{
        "--card-bg-image": backgroundImage ? `url(${backgroundImage})` : "none",
        "--card-bg-position": backgroundPosition,
        "--card-bg-size": backgroundSize,
      }}
    >
      <div className={styles.topRow}>
        <span className={styles.categoryTag}>{category}</span>
        <p className={styles.durationText}>Duration: {duration}</p>
      </div>

      <div className={styles.infoBox}>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <button type="button" className={styles.howToCookButton}>
        How to cook →
      </button>
    </article>
  );
}
