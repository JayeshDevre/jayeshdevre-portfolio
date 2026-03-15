"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiLayers,
  FiMonitor,
  FiCloud,
  FiDatabase,
  FiPackage,
  FiAward,
  FiCpu,
  FiZap,
  FiMessageSquare,
  FiGrid,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import styles from "./Skills.module.css";

const modernTools: { name: string; line: string; icon: IconType }[] = [
  { name: "Cursor", line: "AI-native IDE I use daily.", icon: FiCpu },
  { name: "GitHub Copilot", line: "In-editor pair programming.", icon: FiZap },
  { name: "Claude", line: "Code review & long-context.", icon: FiMessageSquare },
  { name: "Other AI", line: "Gemini, ChatGPT, APIs.", icon: FiGrid },
];

type SkillCategory = {
  category: string;
  icon: IconType;
  items: string[];
};

const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    icon: FiCode,
    items: ["Java", "Python", "C++", "JavaScript", "Bash"],
  },
  {
    category: "Frameworks",
    icon: FiLayers,
    items: [
      "Spring",
      "Spring Boot",
      "REST APIs",
      "JPA",
      "JWT",
      "OAuth",
      "Hibernate",
      "Spring Security",
    ],
  },
  {
    category: "Frontend & Tools",
    icon: FiMonitor,
    items: ["Next.js", "TypeScript", "React", "HTML", "CSS", "Framer Motion", "Vercel"],
  },
  {
    category: "Cloud & DevOps",
    icon: FiCloud,
    items: [
      "AWS",
      "Azure",
      "GCP",
      "Linux",
      "Git",
      "GitHub",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Jenkins",
      "CI/CD pipelines",
    ],
  },
  {
    category: "Database & Monitoring Tools",
    icon: FiDatabase,
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Kafka",
      "Redis",
      "Dynatrace",
      "Prometheus",
      "Grafana",
      "Postman",
    ],
  },
  {
    category: "Libraries",
    icon: FiPackage,
    items: [
      "NumPy",
      "Pandas",
      "TensorFlow",
      "Matplotlib",
      "scikit-learn",
      "Keras",
      "PyTorch",
      "Hugging Face",
      "Mockito",
      "JUnit",
    ],
  },
  {
    category: "Certifications",
    icon: FiAward,
    items: [
      "Microsoft AZ-104",
      "Microsoft AZ-900",
      "Associate Cloud Engineer",
      "Data Structures and Algorithms (Udemy)",
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [aiWorkflowExpanded, setAiWorkflowExpanded] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className={styles.skills} id="skills" ref={ref}> 
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>
            Skills
            <span className={styles.titleAccent} aria-hidden="true" />
          </h2>
          <p className={styles.subtitle}>
            Technologies and tools I work with - across parallel stacks.
          </p>
        </motion.div>

        <div className={styles.skillsList} role="list">
          {skillsData.map((col, i) => (
            <motion.div
              key={col.category}
              className={styles.skillCategory}
              role="listitem"
              data-thread={i + 1}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: 0.06 * i,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIconWrap} aria-hidden>
                  <col.icon className={styles.categoryIcon} />
                </span>
                {col.category}
              </h3>
              <div className={styles.tagsRow}>
                {col.items.map((item) => (
                  <span key={item} className={styles.skillTag} tabIndex={0}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI in my workflow — expandable "explore" */}
        <motion.div
          className={styles.aiNote}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={styles.aiNoteMain}>
            <span className={styles.aiIconBadge} aria-hidden>
              <Image
                src="/ai-icon.png"
                alt=""
                width={58}
                height={58}
                className={styles.aiIconImg}
              />
            </span>
            <div className={styles.aiNoteContent}>
              <h3 className={styles.aiNoteTitle}>AI in my workflow</h3>
              <p className={styles.aiNoteQuote}>
                AI is a tool. The choice about how it gets deployed is ours.
              </p>
              <div className={styles.aiNoteExplore}>
                <span className={styles.aiNoteExploreLabel}>What I use:</span>
                <div className={styles.aiNotePills}>
                  {modernTools.map((t) => (
                    <span key={t.name} className={styles.aiNotePill}>{t.name}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.aiNoteExpandBtn}
                  onClick={() => setAiWorkflowExpanded((e) => !e)}
                  aria-expanded={aiWorkflowExpanded}
                  aria-controls="ai-workflow-details"
                  id="ai-workflow-toggle"
                >
                  {aiWorkflowExpanded ? "Collapse" : "Explore"}
                </button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {aiWorkflowExpanded && (
              <motion.div
                id="ai-workflow-details"
                className={styles.aiNoteBento}
                role="region"
                aria-labelledby="ai-workflow-toggle"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={styles.aiNoteBentoGrid}>
                  {modernTools.map((tool, i) => {
                    const ToolIcon = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        className={styles.aiNoteCard}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.25 }}
                      >
                        <span className={styles.aiNoteCardIcon} aria-hidden>
                          <ToolIcon />
                        </span>
                        <span className={styles.aiNoteCardName}>{tool.name}</span>
                        <span className={styles.aiNoteCardLine}>{tool.line}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
