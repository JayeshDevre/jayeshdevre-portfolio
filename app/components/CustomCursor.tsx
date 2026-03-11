"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render cursor on server or touch devices initially
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className={styles.cursorDot}
        animate={{
          x: mousePosition.x - 4, // Center the 8px dot
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1, // Shrink out when hovering
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1,
        }}
      />
      <motion.div
        className={styles.cursorOutline}
        animate={{
          x: mousePosition.x - 20, // Center the 40px outline
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(28, 29, 32, 0.05)" : "transparent",
          borderColor: isHovering ? "transparent" : "rgba(28, 29, 32, 0.3)",
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.15,
        }}
      />
    </>
  );
}
