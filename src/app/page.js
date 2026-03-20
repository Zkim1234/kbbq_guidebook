"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./page.module.css";
import NavBar from "../components/NavBar";
import TagFilter from "../components/TagFilter";
import CookButtonCard from "../components/CookButtonCard";
import BestComboButtonCard from "../components/BestComboButtonCard";
import DippingSauceButtonCard from "../components/DippingSauceButtonCard";

export default function Home() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const heroHiddenRef = useRef(false);
  const [selectedTag, setSelectedTag] = useState("All");

  const showAll = selectedTag === "All";
  const showMeats = showAll || selectedTag === "Meats";
  const showBestCombinations = showAll || selectedTag === "Best Combinations";
  const showSauces = showAll || selectedTag === "Sauces";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          scroller: pageRef.current,
          start: "top top",
          end: () =>
            `+=${Math.max(120, pageRef.current?.clientHeight * 0.35 || 120)}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.8) {
              gsap.set(heroRef.current, {
                autoAlpha: 0,
                pointerEvents: "none",
              });
              heroHiddenRef.current = true;
            } else if (!heroHiddenRef.current) {
              gsap.set(heroRef.current, {
                autoAlpha: 1,
                pointerEvents: "auto",
              });
            }
          },
        },
      });

      timeline.to(heroRef.current, { yPercent: -100, ease: "none" }, 0);
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <main className={styles.outerShell}>
      <div className={styles.deviceViewport} ref={pageRef}>
        <section className={styles.heroPanel} ref={heroRef}>
          <div className={styles.heroTextWrap}>
            <p className={styles.welcomeText}>Welcome to</p>
            <h1 className={styles.heroText}>
              Guidebook for K-BBQ for the first time visitors
            </h1>
            <p className={styles.heroBold}>guidebook for k-bbq</p>
          </div>
          <p className={styles.scrollDown}>Scroll down</p>
        </section>

        <NavBar />
        <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />

        <section className={styles.contentArea}>
          <div className={styles.contentInner}>
            {showMeats && (
              <CookButtonCard
                category="Pork"
                duration="7-9 min"
                heading="Pork Belly 삼겹살"
                description="Cook over medium-high heat until browned and juicy."
              />
            )}
            {showBestCombinations && (
              <BestComboButtonCard
                category="Best Combination"
                heading="Cold Noodles with Marinated Meats"
                description="Best combination out of everything that not a lot of new visitor does not know."
              />
            )}
            {showSauces && (
              <DippingSauceButtonCard
                category="Dipping Sauce"
                heading="Sesame Oil with Salt and Pepper"
                description="The most basic dipping sauce that goes well with any grilled meat."
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
