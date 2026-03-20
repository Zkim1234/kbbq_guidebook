import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.navBar}>
      <span className={styles.navTitle}>Guidebook for Kbbq</span>
      <button className={styles.hamburgerButton} aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
