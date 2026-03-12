"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import styles from "./Resume.module.css";
import { FiChevronDown, FiDownload } from "react-icons/fi";

const experiences = [
  {
    dateRange: "May 2025 — Aug 2025",
    title: "Software Developer Intern",
    company: "Amazon",
    location: "Seattle, WA",
    highlights: [
      "Addressed large-scale release instability by building a Java (Spring Boot) reliability framework on AWS, validating 16B+ transactions/month.",
      "Eliminated manual validation bottlenecks through event-driven Lambda workflows (SNS/SQS, DynamoDB).",
      "Strengthened production stability by enforcing 95% test coverage and enhancing observability with CloudWatch.",
      "Reduced operational processing time by 98% through automation and fault-tolerant architecture.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "AWS",
      "Lambda",
      "SNS",
      "SQS",
      "Amazon Quicksight",
      "DynamoDB",
      "CloudWatch",
      "Mockito",
      "Distributed Systems",
    ],
  },
  {
    dateRange: "May 2022 — Jul 2024",
    title: "Software Developer",
    company: "Wipro",
    location: "India",
    highlights: [
      "Mitigated downtime risks by engineering cloud-native microservices on Azure Kubernetes supporting 1M+ users.",
      "Optimized latency and scalability using distributed messaging systems (Kafka, Redis, RabbitMQ).",
      "Enhanced API performance by 70% through async programming, caching, and database tuning.",
      "Accelerated incident recovery by 60% with improved monitoring and CI/CD automation.",
    ],
    technologies: [
      "Azure",
      "Java",
      "C#",
      "DevOps",
      "Kubernetes",
      "Microservices",
      "Kafka",
      "RabbitMQ",
      "Redis",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Neo4j",
      "Dynatrace",
      "ELK Stack",
    ],
  },
  {
    dateRange: "Mar 2022 — May 2022",
    title: "Software Developer Intern",
    company: "Wipro",
    location: "India",
    highlights: [
      "Improved API reliability by developing backend services and analytics workflows on GCP.",
      "Elevated customer targeting efficiency by building Python/Spark data pipelines (+30% effectiveness).",
      "Strengthened deployment stability by refining DevOps workflows and reducing MTTR by 35%.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "GCP",
      "Apigee",
      "Databricks",
      "Spark",
      "ETL",
      "CI/CD",
      "Prometheus",
      "Grafana",
      "Monitoring",
    ],
  },
];

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [cardMagnet, setCardMagnet] = useState<Record<number, { x: number; y: number }>>({});

  const toggleExpanded = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.resume} id="resume" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Experience
          </motion.h2>

          <motion.div
            className={styles.subtitleRow}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className={styles.subtitle}>What I have done so far</p>
          </motion.div>
        </div>

        <div className={styles.divider} />

        <div className={styles.timelineWrap}>
          <div className={styles.timelineLine} />

          {experiences.map((exp, index) => {
            const isRight = index % 2 === 0;
            const isExpanded = expandedIndex === index;

            const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const { clientX, clientY } = e;
              const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
              const centerX = left + width / 2;
              const centerY = top + height / 2;
              const moveX = Math.round((clientX - centerX) * 0.07);
              const moveY = Math.round((clientY - centerY) * 0.07);
              setCardMagnet((prev) => ({ ...prev, [index]: { x: moveX, y: moveY } }));
            };

            const handleCardMouseLeave = () => {
              setCardMagnet((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }));
            };

            const card = (
              <motion.div
                className={styles.card}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                animate={{ x: cardMagnet[index]?.x ?? 0, y: cardMagnet[index]?.y ?? 0 }}
                transition={{ type: "spring", stiffness: 170, damping: 16, mass: 0.12 }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => toggleExpanded(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleExpanded(index);
                }}
              >
                <h3 className={styles.company}>{exp.company}</h3>
                <div className={styles.headerStack}>
                  <span className={styles.role}>{exp.title}</span>
                  {exp.location && <span className={styles.location}>{exp.location}</span>}
                </div>

                <button
                  type="button"
                  className={styles.expandBtn}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Collapse experience details" : "Expand experience details"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(index);
                  }}
                >
                  <motion.span
                    className={styles.expandIcon}
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <FiChevronDown />
                  </motion.span>
                </button>

                <ul className={styles.techList}>
                  {exp.technologies.map((tech) => (
                    <li key={tech} className={styles.techPill}>
                      {tech}
                    </li>
                  ))}
                </ul>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <ul className={styles.highlights}>
                        {exp.highlights.map((point) => (
                          <li key={point} className={styles.highlight}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );

            return (
              <motion.div
                key={exp.company + exp.dateRange}
                className={styles.timelineRow}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * index }}
              >
                <div className={styles.timelineSide}>{!isRight && card}</div>

                <div className={styles.timelineCenter}>
                  <span className={styles.timelineDate}>{exp.dateRange}</span>
                  <span className={styles.timelineDot} />
                </div>

                <div className={styles.timelineSide}>{isRight && card}</div>
              </motion.div>
            );
          })}
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
