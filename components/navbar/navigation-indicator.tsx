"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

interface IndicatorState {
  animatePosition: boolean;
  left: number;
  visible: boolean;
  width: number;
}

const hiddenIndicator: IndicatorState = {
  animatePosition: false,
  left: 0,
  visible: false,
  width: 0,
};

export function NavigationIndicator() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const wasVisible = useRef(false);
  const pathname = usePathname();
  const [indicator, setIndicator] = useState(hiddenIndicator);

  useLayoutEffect(() => {
    const container = indicatorRef.current?.parentElement;

    if (!container) {
      return;
    }

    const navigationContainer = container;
    let positionFrame = 0;
    let revealFrame = 0;

    function updateIndicator() {
      const activeLink = navigationContainer.querySelector<HTMLElement>(
        '[aria-current="page"]'
      );

      if (!activeLink) {
        wasVisible.current = false;
        setIndicator((current) => ({ ...current, visible: false }));
        return;
      }

      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = navigationContainer.getBoundingClientRect();
      const position = {
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      };

      if (wasVisible.current) {
        setIndicator((current) => ({
          ...current,
          ...position,
          animatePosition: true,
          visible: true,
        }));
        return;
      }

      setIndicator({
        ...position,
        animatePosition: false,
        visible: false,
      });

      cancelAnimationFrame(positionFrame);
      cancelAnimationFrame(revealFrame);
      positionFrame = requestAnimationFrame(() => {
        revealFrame = requestAnimationFrame(() => {
          wasVisible.current = true;
          setIndicator((current) => ({
            ...current,
            animatePosition: true,
            visible: true,
          }));
        });
      });
    }

    const observer = new ResizeObserver(updateIndicator);
    const activeLink = navigationContainer.querySelector<HTMLElement>(
      '[aria-current="page"]'
    );

    observer.observe(navigationContainer);
    if (activeLink) {
      observer.observe(activeLink);
    }

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      cancelAnimationFrame(positionFrame);
      cancelAnimationFrame(revealFrame);
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname]);

  return (
    <span
      ref={indicatorRef}
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-px hidden h-0.5 origin-center bg-blue-400 duration-200 ease-out motion-reduce:transition-none lg:block print:hidden"
      style={{
        // opacity: indicator.visible ? 1 : 0,
        scale: indicator.visible ? "1 1" : "1 0",
        transform: `translateX(${indicator.left}px)`,
        transitionProperty: indicator.animatePosition
          ? "transform, width, opacity, scale"
          : "opacity, scale",
        width: indicator.width,
      }}
    />
  );
}
