"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const AnimatedCounter = ({
  value,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(parseFloat(latest.replace(/,/g, "")));
    });

    return () => unsubscribe();
  }, [display]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export const AnimatedPercentage = ({
  value,
  duration = 2,
  className = "",
}: Omit<AnimatedCounterProps, "prefix" | "suffix">) => {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      className={className}
      suffix="%"
    />
  );
};

export const AnimatedCurrency = ({
  value,
  duration = 2,
  className = "",
  currency = "$",
}: Omit<AnimatedCounterProps, "prefix" | "suffix"> & { currency?: string }) => {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      className={className}
      prefix={currency}
    />
  );
};

export const CountUp = ({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  className = "",
}: {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  className?: string;
}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(start + (end - start) * progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, start, duration]);

  return <span className={className}>{count.toFixed(decimals)}</span>;
};

export const RollingNumber = ({
  value,
  duration = 1,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.span
      key={value}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration }}
      className={className}
    >
      {value}
    </motion.span>
  );
};

export default AnimatedCounter;