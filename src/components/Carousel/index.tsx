"use client";

import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
} from "react";

interface CarouselProps {
  children: ReactNode;
  className?: string;
}

export function Carousel({ children, className = "" }: CarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = x - startX.current;
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
    },
    [isDragging]
  );

  const handleMouseUpOrLeave = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;
      const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
      const walk = x - startX.current;
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  return (
    <div>
      <div
        className={`c-carousel${className ? ` ${className}` : ""}`}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}
