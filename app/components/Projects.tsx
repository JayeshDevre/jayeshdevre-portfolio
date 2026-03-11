"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Projects.module.css";
import { FiArrowUpRight } from "react-icons/fi";

const projects = [
  {
    title: "TherapyAI SunHacks",
    category: "Backend & AI",
    description:
      "Privacy-focused therapy chat app with crisis detection, conversation memory, and browser-based TTS. Hackathon Winner 🏆",
    tech: ["Google Cloud", "Ollama LLM", "Next.js", "WebSockets"],
    link: "https://github.com/JayeshDevre/TherapyAI-SunHacks",
    year: "2024",
  },
  {
    title: "Heart Attack Prediction",
    category: "Cloud & ML Pipeline",
    description:
      "End-to-end ML pipeline for health risk prediction with XGBoost on SageMaker, real-time predictions via Lambda, and automated SNS alerts.",
    tech: ["AWS EMR", "SageMaker", "Lambda", "Athena", "SNS"],
    link: "https://github.com/JayeshDevre/Intelligent-heart-attack-prediction-system",
    year: "2024",
  },
  {
    title: "LeetCode Solutions",
    category: "DSA & Algorithms",
    description:
      "Daily algorithmic problem-solving in Java demonstrating strong data structures and algorithm knowledge.",
    tech: ["Java", "Data Structures", "Algorithms"],
    link: "https://github.com/JayeshDevre/Leetcode-Solutions",
    year: "Ongoing",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.projects} id="work" ref={ref}>
      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          RECENT WORK
        </motion.span>

        <div className={styles.divider} />

        <div className={styles.list}>
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.row}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <div className={styles.rowLeft}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.techTags}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.rowRight}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.year}>{project.year}</span>
                <FiArrowUpRight className={styles.arrowIcon} />
              </div>

              {/* Hover description overlay */}
              <div className={styles.hoverOverlay}>
                <p>{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className={styles.moreWork}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="https://github.com/JayeshDevre"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.moreBtn}
          >
            More work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
