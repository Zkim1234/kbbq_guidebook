"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "../../components/NavBar";

const WRAP_LAYERS = [
  {
    src: "/lettuce-wrap/rice.png",
    alt: "Rice added on lettuce",
    label: "Add rice",
  },
  {
    src: "/lettuce-wrap/meats.png",
    alt: "Meat added on lettuce",
    label: "Add grilled meat",
  },
  {
    src: "/lettuce-wrap/pepper.png",
    alt: "Pepper added on lettuce",
    label: "Add pepper",
  },
  {
    src: "/lettuce-wrap/garlic.png",
    alt: "Garlic added on lettuce",
    label: "Add garlic",
  },
  {
    src: "/lettuce-wrap/Ssamjang.png",
    alt: "Ssamjang added on lettuce wrap",
    label: "Add ssamjang",
  },
];

const WRAP_STEPS = [
  "Place lettuce flat as the base.",
  "Add a small spoon of rice in the center.",
  "Place grilled meat on top of the rice.",
  "Add pepper for freshness and heat.",
  "Add thin garlic slices.",
  "Finish with ssamjang, then fold and eat in one bite.",
];

export default function BestCombo() {
  const [activeStep, setActiveStep] = useState(0);
  const lastStepIndex = WRAP_STEPS.length - 1;

  useEffect(() => {
    if (activeStep >= lastStepIndex) {
      return;
    }

    const timeout = setTimeout(() => {
      setActiveStep((previous) => Math.min(lastStepIndex, previous + 1));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [activeStep, lastStepIndex]);

  const handlePrevious = () => {
    setActiveStep((previous) => Math.max(0, previous - 1));
  };

  const handleNext = () => {
    setActiveStep((previous) => Math.min(lastStepIndex, previous + 1));
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

            <h1 className={styles.title}>Best Combo: Lettuce Wrap 쌈</h1>
            <p className={styles.subtitle}>
                The quintessential Kbbq experience is incomplete without wrapping a juicy piece of grilled meat in a crisp lettuce leaf, along with a spoonful of rice and a dab of ssamjang.
            </p>

            <div className={styles.metaRow}>
              <span className={styles.badge}>Best Combination</span>
              <span className={styles.duration}>Duration: 15 - 20 sec</span>
            </div>

            <div className={styles.wrapStage}>
              <Image
                src="/lettuce-wrap/lettuce.png"
                alt="Lettuce wrap base"
                fill
                sizes="(max-width: 440px) 90vw, 24rem"
                className={styles.baseLayer}
                priority
              />

              {WRAP_LAYERS.map((layer, index) => {
                const isVisible = activeStep >= index + 1;

                return (
                  <Image
                    key={layer.src}
                    src={layer.src}
                    alt={layer.alt}
                    width={360}
                    height={360}
                    sizes="(max-width: 440px) 90vw, 24rem"
                    className={`${styles.toppingLayer} ${
                      styles[`layer${index}`]
                    } ${isVisible ? styles.layerVisible : ""}`}
                  />
                );
              })}
            </div>

            <div className={styles.imageControls}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrevious}
                disabled={activeStep === 0}
                aria-label="Show previous step"
              >
                ←
              </button>
              <span className={styles.imageCounter}>
                {activeStep + 1} / {WRAP_STEPS.length}
              </span>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handleNext}
                disabled={activeStep === lastStepIndex}
                aria-label="Show next step"
              >
                →
              </button>
            </div>

            <p className={styles.progressText}>
              Step {activeStep + 1} of {WRAP_STEPS.length}
            </p>

            <section className={styles.infoBox}>
              <h2 className={styles.infoHeading}>Wrap tip</h2>
              <p className={styles.infoText}>
                Keep portions small so the wrap closes easily and can be eaten
                in one bite.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Step by step</h3>
              <ol className={styles.stepList}>
                {WRAP_STEPS.map((step, index) => {
                  const isVisible = index <= activeStep;
                  const isActive = index === activeStep;

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
