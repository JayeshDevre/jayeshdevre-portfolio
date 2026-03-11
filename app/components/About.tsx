"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const statement =
    "Building reliable, distributed systems. From thread management to cloud architecture. No shortcuts, always production-ready.";

  const words = statement.split(" ");

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Bold statement — words animate in */}
          <div className={styles.statement}>
            <p className={styles.statementText}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className={styles.word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>
          </div>

          {/* Right side paragraph + button */}
          <div className={styles.right}>
            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              The combination of my experience at Amazon building
              large-scale reliability frameworks and at Wipro engineering
              distributed microservices positions me uniquely as a backend
              systems expert.
            </motion.p>

            <motion.a
              href="#about-detail"
              className={styles.magneticBtn}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About me
            </motion.a>
          </div>
        </div>

        {/* About detail section */}
        <div className={styles.detail} id="about-detail">
          <motion.div
            className={styles.detailGrid}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>2+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>⚡</span>
              <span className={styles.statLabel}>Amazon SDE Intern</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>🎓</span>
              <span className={styles.statLabel}>MS-IT (AI) @ ASU</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
