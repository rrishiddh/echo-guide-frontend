"use client";

import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: UseIntersectionObserverProps = {}
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      observerParams
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
};

export const useIsVisible = (
  elementRef: RefObject<Element>,
  options?: UseIntersectionObserverProps
): boolean => {
  const entry = useIntersectionObserver(elementRef, options);
  return entry?.isIntersecting ?? false;
};

export const useInView = (
  ref: RefObject<Element>,
  options?: UseIntersectionObserverProps
) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          if (options?.freezeOnceVisible) {
            observer.disconnect();
          }
        }
      },
      {
        threshold: options?.threshold ?? 0,
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? "0%",
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { isInView, hasBeenInView };
};
