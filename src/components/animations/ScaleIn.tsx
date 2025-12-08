"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
}

export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
  initialScale = 0.8,
  className = "",
}: ScaleInProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: initialScale,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleInCenter = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: Omit<ScaleInProps, "initialScale">) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        transformOrigin: "center",
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleInBounce = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: Omit<ScaleInProps, "initialScale">) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration,
        delay,
        type: "spring",
        bounce: 0.5,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleInSpring = ({
  children,
  delay = 0,
  className = "",
}: Omit<ScaleInProps, "initialScale" | "duration">) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PopIn = ({
  children,
  delay = 0,
  className = "",
}: Omit<ScaleInProps, "initialScale" | "duration">) => {
  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: [0, 1, 1],
      }}
      transition={{
        duration: 0.5,
        delay,
        times: [0, 0.6, 1],
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;