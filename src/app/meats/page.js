"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "../../components/NavBar";

const PORK_BELLY_FRAMES = [
  "/meats/raw-pork-belly-grill.png",
  "/meats/cooked-pork-belly-grill.png",
  "/meats/cut-pork-belly-grill.png",
  "/meats/all-cut-pork-belly-grill.png",
];

const COOKING_STEPS = [
  "Preheat grill and place pork belly slices flat on the grill.",
  "Cook each side for 1-2 minutes, turning often.",
  "Cut into bite-size pieces once lightly browned.",
  "Finish until fat turns clear and edges are slightly crisp.",
];

export default function Meats() {
  const [activeFrame, setActiveFrame] = useState(0);
  const lastFrameIndex = PORK_BELLY_FRAMES.length - 1;

  useEffect(() => {
    if (activeFrame >= lastFrameIndex) {
      return;
    }

    const timeout = setTimeout(() => {
      setActiveFrame((previous) => Math.min(lastFrameIndex, previous + 1));
    }, 6000);

    return () => clearTimeout(timeout);
  }, [activeFrame, lastFrameIndex]);

  const handlePrevious = () => {
    setActiveFrame((previous) => Math.max(0, previous - 1));
  };

  const handleNext = () => {
    setActiveFrame((previous) => Math.min(lastFrameIndex, previous + 1));
  };

  return (
    <main className={styles.outerShell}>
      <div className={styles.deviceViewport}>
        <NavBar />
        <div className={styles.page}>
          <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
              ← Back
            </Link>

            <h1 className={styles.title}>Pork Belly 삼겹살 (samgypsal)</h1>
            <p className={styles.subtitle}>
              Pork belly is a boneless, fatty, and rich cut of meat from the
              underside (belly) of a pig, known for its intense flavor and
              tender texture when slow-cooked.
            </p>

            <div className={styles.metaRow}>
              <span className={styles.badge}>Pork</span>
              <span className={styles.duration}>Duration: 10 - 15 min</span>
            </div>

            <div className={styles.imageStage}>
              {PORK_BELLY_FRAMES.map((frameSrc, index) => (
                <Image
                  key={frameSrc}
                  src={frameSrc}
                  alt="Pork belly grilling progression"
                  fill
                  sizes="(max-width: 440px) 78vw, 20rem"
                  className={`${styles.stageImage} ${
                    activeFrame === index ? styles.stageImageActive : ""
                  }`}
                />
              ))}
            </div>

            <div className={styles.imageControls}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrevious}
                disabled={activeFrame === 0}
                aria-label="Show previous image"
              >
                ←
              </button>
              <span className={styles.imageCounter}>
                {activeFrame + 1} / {PORK_BELLY_FRAMES.length}
              </span>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handleNext}
                disabled={activeFrame === lastFrameIndex}
                aria-label="Show next image"
              >
                →
              </button>
            </div>

            <section className={styles.infoBox}>
              <h2 className={styles.infoHeading}>Best heat and texture</h2>
              <p className={styles.infoText}>
                Cook over medium-high heat. Flip frequently until edges are
                golden, then finish with a short high-heat sear for crispness.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Steps</h3>
              <ol className={styles.stepList}>
                {COOKING_STEPS.map((step, index) => {
                  const isVisible = index <= activeFrame;
                  const isActive = index === activeFrame;

                  return (
                    <li
                      key={step}
                      className={`${styles.stepItem} ${
                        isVisible ? "" : styles.stepHidden
                      } ${isActive ? styles.stepActive : ""}`}
                    >
                      {step}
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
