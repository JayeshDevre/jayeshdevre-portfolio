"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const ROLES = [
  "MS IT Student @ ASU",
  "Full Stack Developer",
  "Cloud Enthusiast (AWS/Azure)",
  "Ex-Amazon Software Developer Intern",
];

const CHAR_DELAY_MS = 90;
const DELETE_DELAY_MS = 50;
const PAUSE_AFTER_PHRASE_MS = 1800;

type Phase = "typing" | "pause" | "deleting";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const currentPhrase = ROLES[roleIndex];

  useEffect(() => {
    if (phase === "pause") return;

    if (phase === "typing") {
      if (charIndex >= currentPhrase.length) {
        const timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_PHRASE_MS);
        return () => clearTimeout(timeout);
      }
      const id = setTimeout(() => setCharIndex((i) => i + 1), CHAR_DELAY_MS);
      return () => clearTimeout(id);
    }

    // phase === "deleting"
    if (charIndex <= 0) {
      setRoleIndex((i) => (i + 1) % ROLES.length);
      setCharIndex(0);
      setPhase("typing");
      return;
    }
    const id = setTimeout(() => setCharIndex((i) => i - 1), DELETE_DELAY_MS);
    return () => clearTimeout(id);
  }, [roleIndex, charIndex, phase, currentPhrase.length]);

  const visibleText = currentPhrase.slice(0, charIndex);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.gradientOrbs} aria-hidden="true" />

      <div className={styles.wrapper}>
        {/* Left: content */}
        <div className={styles.left}>
          <motion.div
            className={styles.terminalBar}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.trafficLights}>
              <span className={styles.lightRed} />
              <span className={styles.lightYellow} />
              <span className={styles.lightGreen} />
            </div>
            <span className={styles.terminalText}>user@portfolio:~$ ./welcome.sh</span>
          </motion.div>

          <motion.h1
            className={styles.greeting}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I&apos;m
          </motion.h1>
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.nameFirst}>Jayesh</span>{" "}
            <span className={styles.nameLast}>Devre</span>
          </motion.h1>
          <motion.p
            className={styles.roleLine}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            aria-live="polite"
          >
            <span className={styles.rolePrefix}>&gt;</span>{" "}
            <span className={styles.roleRotate}>
              <span className={styles.roleText}>{visibleText}</span>
              <span className={styles.typewriterCursor} aria-hidden="true" />
            </span>
          </motion.p>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Passionate software developer crafting scalable solutions with{" "}
            <span className={styles.highlight}>AWS</span>,{" "}
            <span className={styles.highlight}>Azure</span>, and{" "}
            <span className={styles.highlight}>Java</span>.
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <a href="#work" className={styles.btnPrimary}>
              View Work
            </a>
            <a href="#resume" className={styles.btnResume}>
              Resume
            </a>
            <a href="#contact" className={styles.btnOutline}>
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right: photo + badge + code card (clean reference structure) */}
        <div className={styles.right}>
          <motion.div
            className={styles.photoRing}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className={styles.photoCircle} />
            <div className={styles.badge} title="Cloud & Backend">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>

          <motion.div
            className={styles.codeCard}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className={styles.codeCardHeader}>
              <span className={styles.codeLightRed} />
              <span className={styles.codeLightYellow} />
              <span className={styles.codeLightGreen} />
            </div>
            <pre className={styles.codeBlock}>
              <code>
                <span className={styles.codeKeyword}>class</span>{" "}
                <span className={styles.codeClass}>Developer</span>{" "}
                {"{"}
                {"\n"}
                {"    "}
                <span className={styles.codeFn}>constructor</span>
                {"() {"}
                {"\n"}
                {"        "}
                <span className={styles.codeThis}>this</span>.passion ={" "}
                <span className={styles.codeKeyword}>true</span>;
                {"\n"}
                {"        "}
                <span className={styles.codeThis}>this</span>.stack = [
                <span className={styles.codeString}>&apos;AWS&apos;</span>,{" "}
                <span className={styles.codeString}>&apos;Java&apos;</span>
                ];
                {"\n"}
                {"    }"}
                {"\n"}
                {"}"}
              </code>
            </pre>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      {/* <motion.div
        className={styles.bottomBar}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className={styles.barCenter}>
          FULL STACK | DATA &amp; AI | CLOUD / DEVOPS | DISTRIBUTED SYSTEMS
        </div>
      </motion.div> */}
    </section>
  );
}
