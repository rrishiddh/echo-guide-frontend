"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export const SlideIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 50,
  className = "",
}: SlideInProps) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
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

export const SlideInUp = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: Omit<SlideInProps, "direction">) => {
  return (
    <SlideIn direction="up" delay={delay} duration={duration} className={className}>
      {children}
    </SlideIn>
  );
};

export const SlideInDown = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: Omit<SlideInProps, "direction">) => {
  return (
    <SlideIn direction="down" delay={delay} duration={duration} className={className}>
      {children}
    </SlideIn>
  );
};

export const SlideInLeft = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: Omit<SlideInProps, "direction">) => {
  return (
    <SlideIn direction="left" delay={delay} duration={duration} className={className}>
      {children}
    </SlideIn>
  );
};

export const SlideInRight = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: Omit<SlideInProps, "direction">) => {
  return (
    <SlideIn direction="right" delay={delay} duration={duration} className={className}>
      {children}
    </SlideIn>
  );
};

export default SlideIn;