import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "../../components/NavBar";

export default function Sauces() {
  return (
    <main className={styles.outerShell}>
      <div className={styles.deviceViewport}>
        <NavBar />

        <div className={styles.page}>
          <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
              ← Back
            </Link>

            <h1 className={styles.title}>
              General Dipping Sauces 기름장 + 쌈장
            </h1>
            <p className={styles.subtitle}>
              Two classic sauces complete the K-BBQ table.
            </p>

            <div className={styles.metaRow}>
              <span className={styles.badge}>Dipping Sauces</span>
            </div>

            <div className={styles.imageStage}>
              <Image
                src="/dipping-sauce/general-dipping-sauce.png"
                alt="General dipping sauce set"
                fill
                sizes="(max-width: 440px) 74vw, 16.5rem"
                className={styles.stageImage}
                priority
              />
            </div>

            <section className={styles.infoBox}>
              <h2 className={styles.infoHeading}>Sauce descriptions</h2>
              <ul className={styles.sauceList}>
                <li className={styles.sauceItem}>
                  <strong>Sesame oil + salt + pepper:</strong> Nutty and clean,
                  best for highlighting the meat flavor.
                </li>
                <li className={styles.sauceItem}>
                  <strong>Ssamjang:</strong> Savory, slightly spicy
                  soybean-chili paste that adds bold depth.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
