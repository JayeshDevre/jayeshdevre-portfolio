"use client";

import { useRef, useState, Fragment } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import styles from "./About.module.css";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiCode } from "react-icons/fi";

const bioText =  "Hey, I’m Jayesh 👋!  Originally from Mumbai, India  🇮🇳, now building my dreams in the USA  🇺🇸. I’ve always been curious about how technology works and more importantly, how software can become smarter and more helpful. I enjoy building scalable systems, working with data, and exploring Generative AI to create real-world impact. When I’m not coding, you’ll probably find me watching sci-fi, exploring new places, or vibe coding new ideas just for fun.";


const bioSentences = bioText.split(/(?<=[.!]) /);

const education = [
  {
    dates: "2024 - 2026",
    school: "ARIZONA STATE UNIVERSITY",
    degree: "Master of Science in Information Technology",
    gpa: "GPA: 4.00 / 4.00",
  },
  {
    dates: "2018 - 2022",
    school: "SAVITRIBAI PHULE PUNE UNIVERSITY",
    degree: "Bachelor of Engineering in Computer Engineering",
    gpa: "GPA: 8.56 / 10.00",
  },
];

export default function About() {
  const ref = useRef(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [showBioModal, setShowBioModal] = useState(false);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });
  const [socialMagnet, setSocialMagnet] = useState<Record<string, { x: number; y: number }>>({});
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleMagneticMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) * 0.35;
    const moveY = (clientY - centerY) * 0.35;
    setMagneticPosition({ x: moveX, y: moveY });
  };

  const handleMagneticReset = () => {
    setMagneticPosition({ x: 0, y: 0 });
  };

  const handleSocialMagneticMouse = (label: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) * 0.25;
    const moveY = (clientY - centerY) * 0.25;
    setSocialMagnet((prev) => ({ ...prev, [label]: { x: moveX, y: moveY } }));
  };

  const handleSocialMagneticReset = (label: string) => () => {
    setSocialMagnet((prev) => ({ ...prev, [label]: { x: 0, y: 0 } }));
  };

  const statement =
    "Building reliable, scalable systems across data, AI, and cloud. No shortcuts, always production-ready.";

  const words = statement.split(" ");

  const socialLinks = [
    { label: "GITHUB", href: "https://github.com/JayeshDevre", icon: FiGithub },
    { label: "LINKEDIN", href: "https://linkedin.com/in/jayesh-devre", icon: FaLinkedinIn },
    { label: "LEETCODE", href: "https://leetcode.com/u/Jayesh_Devre/", icon: FiCode },
    { label: "INSTAGRAM", href: "https://instagram.com/", icon: FaInstagram },
  ];

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: statement + social buttons row */}
          <div className={styles.statementColumn}>
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
            <motion.div
              className={styles.socialButtonsRow}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  animate={{ x: socialMagnet[link.label]?.x ?? 0, y: socialMagnet[link.label]?.y ?? 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.12 }}
                  onMouseMove={handleSocialMagneticMouse(link.label)}
                  onMouseLeave={handleSocialMagneticReset(link.label)}
                >
                  <link.icon className={styles.socialBtnIcon} aria-hidden />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right side — About me button */}
          <div className={styles.right}>
            <div className={styles.bioTriggerWrapper}>
              <motion.button
                ref={btnRef}
                type="button"
                onClick={() => setShowBioModal(true)}
                className={`${styles.magneticBtn} ${showBioModal ? styles.magneticBtnActive : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.8,
                  x: magneticPosition.x,
                  y: magneticPosition.y,
                }}
                transition={{
                  x: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
                  y: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
                  opacity: { duration: 0.5, delay: 1.0 },
                  scale: { duration: 0.5, delay: 1.0 },
                }}
                onMouseMove={handleMagneticMouse}
                onMouseLeave={handleMagneticReset}
                whileTap={{ scale: 0.98 }}
              >
                About me
              </motion.button>

              <AnimatePresence>
                {showBioModal && (
                  <motion.div
                    key="bio-modal"
                    className={styles.bioModalContainer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={styles.bioOverlay}
                      onClick={() => setShowBioModal(false)}
                      aria-hidden
                    />
                    <div className={styles.bioPanelWrap}>
                      <motion.div
                        className={styles.bioPanel}
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <div className={styles.bioContent}>
                          {bioSentences.map((sentence, i) => (
                            <motion.p
                              key={i}
                              className={styles.bioSentence}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.35,
                                delay: 0.06 * i,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                            >
                              {sentence}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Education */}
        <motion.div
          className={styles.educationGrid}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {education.map((item, i) => (
            <Fragment key={i}>
              <motion.div
                className={styles.educationCard}
                initial={false}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className={styles.educationMeta}>
                  {item.dates}
                </div>
                <h3 className={styles.educationSchool}>{item.school}</h3>
                <p className={styles.educationDegree}>{item.degree}</p>
                <div className={styles.educationMeta}>
                  {item.gpa}
                </div>
              </motion.div>
              {i === 0 && <div className={styles.educationDivider} aria-hidden />}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
