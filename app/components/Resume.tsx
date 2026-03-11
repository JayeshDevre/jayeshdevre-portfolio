"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Resume.module.css";
import { FiDownload } from "react-icons/fi";

const experiences = [
  {
    role: "Software Development Engineer Intern",
    company: "Amazon",
    date: "2023",
    description: "Designed and engineered large-scale reliability frameworks.",
  },
  {
    role: "Software Engineer",
    company: "Wipro",
    date: "2021 — 2023",
    description: "Built distributed microservices and scalable backend architectures.",
  },
  {
    role: "MS-IT, Artificial Intelligence",
    company: "Arizona State University",
    date: "2024 — 2026",
    description: "Specialization in AI & Cloud Systems.",
  },
];

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.resume} id="resume" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            EXPERIENCE
          </motion.span>
        </div>

        <div className={styles.divider} />

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.item}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <div className={styles.meta}>
                <span className={styles.date}>{exp.date}</span>
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.company}>{exp.company}</h3>
                <span className={styles.role}>{exp.role}</span>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.download}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="/resume.pdf" className={styles.downloadBtn} target="_blank" rel="noopener noreferrer">
            <FiDownload />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
