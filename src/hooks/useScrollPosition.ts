"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};

export const useScrollToTop = () => {
  const scrollToTop = useCallback((behavior: ScrollBehavior = "smooth") => {
    window.scrollTo({ top: 0, behavior });
  }, []);

  return scrollToTop;
};

export const useScrollTo = () => {
  const scrollTo = useCallback(
    (y: number, behavior: ScrollBehavior = "smooth") => {
      window.scrollTo({ top: y, behavior });
    },
    []
  );

  return scrollTo;
};

export const useScrollToElement = () => {
  const scrollToElement = useCallback(
    (elementId: string, behavior: ScrollBehavior = "smooth") => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior });
      }
    },
    []
  );

  return scrollToElement;
};

export const useIsScrolled = (threshold: number = 100): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { y } = useScrollPosition();

  useEffect(() => {
    setIsScrolled(y > threshold);
  }, [y, threshold]);

  return isScrolled;
};

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const scrollProgress = (scrollTop / scrollableHeight) * 100;

      setProgress(scrollProgress);
    };

    calculateProgress();

    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  return progress;
};
