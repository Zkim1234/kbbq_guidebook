import Link from "next/link";
import cookStyles from "./cook.module.css";
import bestComboStyles from "./bestcombo.module.css";
import sauceStyles from "./sauce.module.css";

const STYLE_MAP = {
  cook: cookStyles,
  bestCombo: bestComboStyles,
  sauce: sauceStyles,
};

export default function Card({
  cardType,
  category,
  duration,
  heading,
  description,
  href,
  ctaLabel,
  backgroundImage,
  backgroundPosition = "left bottom",
  backgroundSize = "contain",
}) {
  const styles = STYLE_MAP[cardType] || cookStyles;
  const buttonLabel =
    ctaLabel || (cardType === "cook" ? "How to cook →" : "Learn More");

  return (
    <article
      className={styles.card}
      style={
        cardType === "cook"
          ? {
              "--card-bg-image": backgroundImage
                ? `url(${backgroundImage})`
                : "none",
              "--card-bg-position": backgroundPosition,
              "--card-bg-size": backgroundSize,
            }
          : undefined
      }
    >
      <div className={styles.topRow}>
        <span className={styles.categoryTag}>{category}</span>
        {cardType === "cook" && duration ? (
          <p className={styles.durationText}>Duration: {duration}</p>
        ) : null}
      </div>

      <div className={styles.infoBox}>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {href ? (
        <Link href={href} className={styles.howToCookButton}>
          {buttonLabel}
        </Link>
      ) : (
        <button type="button" className={styles.howToCookButton}>
          {buttonLabel}
        </button>
      )}
    </article>
  );
}
