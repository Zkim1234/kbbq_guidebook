"use client";

import styles from "./TagFilter.module.css";

export const TAG_OPTIONS = ["All", "Meats", "Best Combinations", "Sauces"];

export default function TagFilter({ selectedTag = "All", onTagChange }) {
  return (
    <section className={styles.tagWrapper} aria-label="Content filters">
      <div className={styles.tagRow}>
        {TAG_OPTIONS.map((option) => {
          const isSelected = selectedTag === option;

          return (
            <button
              key={option}
              type="button"
              className={isSelected ? styles.tagSelected : styles.tagUnselected}
              onClick={() => onTagChange?.(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
