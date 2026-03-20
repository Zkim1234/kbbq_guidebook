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
  const [landingDismissed, setLandingDismissed] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");

  const showAll = selectedTag === "All";
  const showMeats = showAll || selectedTag === "Meats";
  const showBestCombinations = showAll || selectedTag === "Best Combinations";
  const showSauces = showAll || selectedTag === "Sauces";

  useEffect(() => {
    if (landingDismissed) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          scroller: pageRef.current,
          start: "top top",
          end: () =>
            `+=${Math.max(320, pageRef.current?.clientHeight * 0.7 || 320)}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress >= 0.98) {
              gsap.set(heroRef.current, {
                yPercent: -120,
                autoAlpha: 0,
                pointerEvents: "none",
              });
              setLandingDismissed(true);
              self.kill();
            }
          },
        },
      });

      timeline.to(heroRef.current, { yPercent: -120, ease: "none" }, 0);
    }, pageRef);

    return () => context.revert();
  }, [landingDismissed]);

  return (
    <main className={styles.outerShell}>
      <div className={styles.deviceViewport} ref={pageRef}>
        {!landingDismissed && (
          <section className={styles.landingPageLayer}>
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
          </section>
        )}

        <div className={styles.mainPageLayer}>
          <NavBar />
          <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />

          <section className={styles.contentArea}>
            <div className={styles.contentInner}>
              {showMeats && (
                <CookButtonCard
                  category="Pork"
                  duration="10 - 15 min"
                  heading="Pork Belly 삼겹살"
                  description="Cook over medium-high heat until browned and juicy."
                  backgroundImage="/button-card-images/button-raw-pork-belly.jpg"
                  backgroundPosition="left bottom"
                  backgroundSize="contain"
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
                  heading="General Dipping Sauce"
                  description="Sesame oil with salt and pepper & Ssamjang (mixture of Bean paste + Chili paste)"
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
