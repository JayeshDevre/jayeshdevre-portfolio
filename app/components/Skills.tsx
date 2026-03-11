"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Skills.module.css";

const skillsData = [
  {
    category: "Backend Systems",
    items: ["Java", "Spring Boot", "Multithreading", "Concurrency", "Node.js", "System Design"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Kafka", "Azure", "CI/CD"],
  },
  {
    category: "Languages & DB",
    items: ["Python", "Go", "C/C++", "JavaScript", "PostgreSQL", "MongoDB"],
  },
  {
    category: "AI / ML",
    items: ["TensorFlow", "PyTorch", "AWS Bedrock", "Gemini API", "Scikit-learn"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>SKILLS</span>
        </motion.div>

        <div className={styles.grid}>
          {skillsData.map((col, i) => (
            <motion.div
              key={col.category}
              className={styles.column}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <h4 className={styles.categoryTitle}>{col.category}</h4>
              <ul className={styles.list}>
                {col.items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* AI Workflow Note */}
        <motion.div
          className={styles.aiNote}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={styles.aiIcon}>🤖</div>
          <p>
            <strong>AI in my workflow:</strong> Leveraging tools like Gemini and AWS Bedrock
            for accelerated code generation, architecture validation, and automated testing to ship faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
