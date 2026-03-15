"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Projects.module.css";
import { FiArrowUpRight } from "react-icons/fi";

type Project = {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  importance: string;
  helps: string;
  impact: string;
  tech: string[];
  link?: string;
};

const projects: Project[] = [
  {
    id: "distributed-voting",
    title: "Distributed Voting App",
    category: "DevOps & CI/CD",
    date: "2024",
    summary:
      "DevOps-focused project: multi-service voting app with Docker, Kubernetes, and full CI/CD via GitHub Actions and Azure Pipelines.",
    importance: "Emphasizes DevOps—containerization, orchestration (Docker Compose, Swarm, K8s), and automated build/deploy pipelines.",
    helps: "Showcases production-style deployment and CI/CD for polyglot services (Python, .NET 7, Node.js) with Redis and Postgres.",
    impact:
      "Demonstrates end-to-end DevOps: Docker images, K8s specs, path-based CI builds, and multi-platform image pushes (GitHub Actions, Azure Pipelines).",
    tech: ["Docker", "Kubernetes", "GitHub Actions", "Azure Pipelines", "Python", ".NET 7", "Node.js", "Redis", "PostgreSQL"],
    link: "https://github.com/JayeshDevre/Distributed-Voting-App",
  },
  {
    id: "therapyai",
    title: "TherapyAI",
    category: "AI Therapy Assistant",
    date: "October 2024",
    summary:
      "Privacy‑focused therapy chat application with crisis detection, conversation memory, and browser‑based TTS.",
    importance: "Demonstrates ability to apply LLMs safely in a sensitive domain with guardrails.",
    helps: "Gives users a private, always‑available companion while escalating potential crises faster.",
    impact:
      "Handled intense hackathon traffic with zero downtime and won the event by shipping a polished MVP.",
    tech: ["Next.js", "Node.js", "LLM Orchestration", "WebSockets", "PostgreSQL"],
    link: "https://github.com/JayeshDevre/TherapyAI-SunHacks",
  },
  {
    id: "portfolio",
    title: "Developer Portfolio",
    category: "Personal Site",
    date: "2025",
    summary:
      "High‑performance, animation‑rich portfolio showcasing backend, cloud, and AI work with responsive layout.",
    importance: "Acts as a living product to showcase my UX, performance, and frontend engineering decisions.",
    helps: "Helps recruiters and collaborators quickly understand what I build and how I think about systems.",
    impact:
      "Consistently loads fast on mobile and desktop, and makes it trivial to add new case studies over time.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Vercel"],
    link: "https://github.com/JayeshDevre",
  },
  {
    id: "threadboost",
    title: "ThreadBoost",
    category: "Async Microservice",
    date: "2024",
    summary:
      "Spring Boot microservice comparing blocking vs non-blocking APIs using CompletableFuture and @Async with custom thread pools.",
    importance: "Demonstrates practical async programming in Spring Boot and measurable performance gains.",
    helps: "Shows how non-blocking endpoints improve throughput and reduce latency for CRUD and file I/O.",
    impact:
      "Achieved 95.6% faster CRUD workflows and 85% faster file read/write in benchmarks vs blocking approach.",
    tech: ["Java", "Spring Boot", "MongoDB", "Maven", "CompletableFuture"],
    link: "https://github.com/JayeshDevre/ThreadBoost",
  },
  {
    id: "heart-attack-prediction",
    title: "Heart Attack Prediction System",
    category: "ML & Cloud Pipeline",
    date: "2024",
    summary:
      "End-to-end ML pipeline for heart attack risk prediction using AWS EMR, SageMaker, Lambda, Athena, and SNS alerts.",
    importance: "Shows building a full ML pipeline on AWS: data processing, model training, inference, and analytics.",
    helps: "Processes patient vitals, trains XGBoost on SageMaker, runs real-time Lambda predictions with SNS alerts.",
    impact:
      "Delivers automated high-risk patient alerts and queryable analytics via Athena on processed and prediction data.",
    tech: ["Python", "PySpark", "AWS EMR", "SageMaker", "Lambda", "Athena", "SNS", "XGBoost"],
    link: "https://github.com/JayeshDevre/Intelligent-heart-attack-prediction-system",
  },
  {
    id: "dashboards",
    title: "Ops Dashboard",
    category: "Monitoring & Analytics",
    date: "2023",
    summary:
      "Operations dashboard aggregating logs, traces, and metrics into a single pane of glass for backend services.",
    importance: "Highlights experience building observability tools that engineers actually use during incidents.",
    helps: "Helps on‑call engineers see logs, metrics, and traces in one place instead of juggling tools.",
    impact:
      "Shortened incident investigation time by centralizing signals and adding clear SLO and release context.",
    tech: ["Next.js", "Grafana", "Prometheus", "Loki"],
    link: "https://github.com/JayeshDevre",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [cardMagnet, setCardMagnet] = useState<Record<string, { x: number; y: number }>>({});

  const toggleProject = (id: string) => {
    setOpenProjectId((current) => (current === id ? null : id));
  };

  return (
    <section className={styles.projects} id="work" ref={ref}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.container}>
        {/* Section heading */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className={styles.title}>
            Work
            <span className={styles.titleAccent} aria-hidden="true" />
          </h2>
          <p className={styles.subtitle}>
            A snapshot of systems I&apos;ve shipped across backend, data, cloud, and AI.
          </p>
        </motion.div>

        {/* Project cards */}
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projects.map((project) => {
            const isFlipped = openProjectId === project.id;

            const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const { clientX, clientY } = e;
              const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
              const centerX = left + width / 2;
              const centerY = top + height / 2;
              const moveX = Math.round((clientX - centerX) * 0.07);
              const moveY = Math.round((clientY - centerY) * 0.07);
              setCardMagnet((prev) => ({ ...prev, [project.id]: { x: moveX, y: moveY } }));
            };

            const handleCardMouseLeave = () => {
              setCardMagnet((prev) => ({ ...prev, [project.id]: { x: 0, y: 0 } }));
            };

            return (
              <div
                key={project.id}
                className={styles.cardWrapper}
                onClick={() => toggleProject(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleProject(project.id);
                  }
                }}
                aria-label={`${project.title}, click to flip card`}
              >
                <motion.div
                  className={styles.cardMagneticWrap}
                  animate={{ x: cardMagnet[project.id]?.x ?? 0, y: cardMagnet[project.id]?.y ?? 0 }}
                  transition={{ type: "spring", stiffness: 170, damping: 16, mass: 0.12 }}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className={`${styles.card} ${isFlipped ? styles.cardFlipped : ""}`}>
                  {/* Front: category, date, title, summary, tech, View project */}
                  <div className={styles.cardFront}>
                    <div className={styles.cardTop}>
                      <div className={styles.badgeRow}>
                        <span className={styles.categoryBadge}>{project.category}</span>
                        <span className={styles.yearBadge}>{project.date}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <p className={styles.summary}>{project.summary}</p>
                    </div>
                    <div className={styles.techRow}>
                      {project.tech.map((t) => (
                        <span key={t} className={styles.techPill}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className={styles.cardFooter}>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.viewLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View project</span>
                          <FiArrowUpRight className={styles.viewIcon} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Back: category, date, then Skills used / Problem solved / Impact */}
                  <div className={styles.cardBack}>
                    <div className={styles.badgeRow}>
                      <span className={styles.categoryBadge}>{project.category}</span>
                      <span className={styles.yearBadge}>{project.date}</span>
                    </div>
                    <ul className={styles.impactList}>
                      <li>
                        <span className={styles.impactLabel}>What it demonstrates:</span>{" "}
                        {project.importance}
                      </li>
                      <li>
                        <span className={styles.impactLabel}>Problem solved:</span>{" "}
                        {project.helps}
                      </li>
                      <li>
                        <span className={styles.impactLabel}>Impact:</span>{" "}
                        {project.impact}
                      </li>
                    </ul>
                    <p className={styles.cardBackHint}>Click to flip back</p>
                  </div>
                </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
