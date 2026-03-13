"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";
import { FiArrowDownRight, FiGlobe } from "react-icons/fi";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Software", "Backend", "Data Engineer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        {/* Photo area */}
        <motion.div
          className={styles.photoContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.photoPlaceholder}>
            <div className={styles.photoInitials}>JD</div>
          </div>
        </motion.div>

      </div>

      {/* Right side info */}
      <motion.div
        className={styles.info}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <FiArrowDownRight className={styles.arrow} />
        <div className={styles.roleContainer}>
          <div className={styles.roleAnimatedWrapper}>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={styles.roleTitle}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className={styles.roleSubtitle}>& Systems Architect</span>
        </div>
      </motion.div>

      {/* Location badge */}
      <motion.div
        className={styles.locationBadge}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className={styles.locationText}>
          <span>Located </span>
          <span>in the Tempe</span>
          <span>- Arizona</span>
        </div>
        <div className={styles.globeWrapper}>
          <FiGlobe className={styles.revolvingGlobe} />
        </div>
      </motion.div>

      {/* Bottom Information Bar */}
      <motion.div
        className={styles.bottomBar}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className={styles.barCenter}>FULL STACK | DATA & AI | CLOUD / DEVOPS | DISTRIBUTED SYSTEMS</div>
      </motion.div>
    </section >
  );
}
