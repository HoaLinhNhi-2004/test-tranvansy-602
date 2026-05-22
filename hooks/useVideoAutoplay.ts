import { useEffect, RefObject } from "react";

interface Options {
  threshold?: number;
  disabled?: boolean;
}

export function useVideoAutoplay(
  videoRef: RefObject<HTMLVideoElement | null>,
  { threshold = 0.7, disabled = false }: Options = {}
) {
  useEffect(() => {
    if (disabled) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) {
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: [0, threshold, 1] }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [videoRef, threshold, disabled]);
}