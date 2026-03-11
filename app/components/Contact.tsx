"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Contact.module.css";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.contact} id="contact" ref={ref}>
      <div className={styles.container}>
        <div className={styles.main}>
          {/* Avatar & Title */}
          <div className={styles.titleArea}>
            <motion.div
              className={styles.avatar}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring" }}
            >
              JD
            </motion.div>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Let’s work<br />together
            </motion.h2>
          </div>

          {/* Magnetic CTA button */}
          <div className={styles.ctaArea}>
            <motion.a
              href="mailto:jdevre@asu.edu"
              className={styles.ctaBtn}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
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
          <a
            href="https://linkedin.com/in/jayesh-devre"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pillBtn}
          >
            LinkedIn
          </a>
        </motion.div>

        {/* Bottom footer */}
        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className={styles.bottomCol}>
            <span className={styles.bottomLabel}>VERSION</span>
            <span className={styles.bottomText}>{currentYear} © Edition</span>
          </div>

          <div className={styles.bottomCol}>
            <span className={styles.bottomLabel}>LOCAL TIME</span>
            <span className={styles.bottomText}>Based in Tempe, AZ</span>
          </div>

          <div className={styles.bottomColSocials}>
            <span className={styles.bottomLabel}>SOCIALS</span>
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com/in/jayesh-devre" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/JayeshDevre" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://leetcode.com/u/Jayesh_Devre/" target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
