"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Contact.module.css";

function formatLocalTime() {
  const now = new Date();
  const offsetMinutes = -now.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const gmt = `GMT${sign}${offsetHours}`;
  return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) + " " + gmt;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [ctaMagnet, setCtaMagnet] = useState({ x: 0, y: 0 });
  const [localTime, setLocalTime] = useState(formatLocalTime);
  useEffect(() => {
    const t = setInterval(() => setLocalTime(formatLocalTime()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = Math.round((clientX - centerX) * 0.28);
    const moveY = Math.round((clientY - centerY) * 0.28);
    setCtaMagnet({ x: moveX, y: moveY });
  };

  const handleCtaMouseLeave = () => setCtaMagnet({ x: 0, y: 0 });

  return (
    <footer className={styles.contact} id="contact" ref={ref}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.titleBlock}>
            <div className={styles.titleArea}>
              <motion.div
                className={styles.avatar}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
              >
                JD
              </motion.div>
              <div className={styles.titleTextBlock}>
                <motion.span
                  className={styles.titleLine1}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Let&rsquo;s work
                </motion.span>
                <motion.span
                  className={styles.titleLine2Text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  together
                </motion.span>
              </div>
            </div>
          </div>

          {/* CTA — magnetic effect */}
          <div className={styles.ctaArea}>
            <motion.div
              className={styles.ctaMagneticWrap}
              animate={{ x: ctaMagnet.x, y: ctaMagnet.y }}
              transition={{ type: "spring", stiffness: 170, damping: 16, mass: 0.12 }}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
            >
              <motion.a
                href="mailto:jdevre@asu.edu"
                className={styles.ctaBtn}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className={styles.ctaBtnText}
                  animate={{ x: ctaMagnet.x * 0.5, y: ctaMagnet.y * 0.5 }}
                  transition={{ type: "spring", stiffness: 170, damping: 16, mass: 0.12 }}
                >
                  Get in touch
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Links row */}
        <motion.div
          className={styles.linksRow}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="mailto:jdevre@asu.edu" className={styles.pillBtn}>
            jdevre@asu.edu
          </a>
          <a href="tel:+16024030669" className={styles.pillBtn}>
            +1 6024030669
          </a>
        </motion.div>
      </div>

      {/* Full-width footer bar at bottom of page */}
      <motion.div
        className={styles.footerBar}
        role="contentinfo"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <div className={styles.bottomCol}>
              <span className={styles.bottomLabel}>VERSION</span>
              <span className={styles.bottomText}>Jayesh © 2026</span>
            </div>
            <div className={styles.bottomCol}>
              <span className={styles.bottomLabel}>LOCAL TIME</span>
              <span className={styles.bottomText}>{localTime}</span>
            </div>
          </div>
          <div className={styles.bottomColSocials}>
            <span className={styles.bottomLabel}>SOCIALS</span>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com/in/jayesh-devre" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/u/Jayesh_Devre/" target="_blank" rel="noopener noreferrer">LeetCode</a>
              <a href="https://github.com/JayeshDevre" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
