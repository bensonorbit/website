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
  // Remember whether position changes should animate without causing a render.
  const wasVisible = useRef(false);
  const pathname = usePathname();
  const [indicator, setIndicator] = useState(hiddenIndicator);

  // Measure before the browser paints so the indicator never flashes out of place.
  useLayoutEffect(() => {
    const container = indicatorRef.current?.parentElement;

    if (!container) {
      return;
    }

    const navigationContainer = container;
    let positionFrame = 0;
    let revealFrame = 0;

    function updateIndicator() {
      // The desktop nav stays mounted but uses display: none at mobile widths.
      if (navigationContainer.getClientRects().length === 0) {
        cancelAnimationFrame(positionFrame);
        cancelAnimationFrame(revealFrame);
        wasVisible.current = false;
        setIndicator(hiddenIndicator);
        return;
      }

      const activeLinkLabel = navigationContainer.querySelector<HTMLElement>(
        '[aria-current="page"] [data-navigation-indicator-target]'
      );

      if (!activeLinkLabel) {
        wasVisible.current = false;
        setIndicator((current) => ({ ...current, visible: false }));
        return;
      }

      const linkRect = activeLinkLabel.getBoundingClientRect();
      const containerRect = navigationContainer.getBoundingClientRect();
      // Convert the label's page position into a position inside the nav.
      const position = {
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      };

      // Once visible, changes should slide from the previous link.
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

      // Let the collapsed indicator reach its new position before revealing it.
      // Two frames ensure the browser commits that hidden position first.
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

    // Keep the indicator aligned when the nav or active label changes size.
    const observer = new ResizeObserver(updateIndicator);
    const activeLinkLabel = navigationContainer.querySelector<HTMLElement>(
      '[aria-current="page"] [data-navigation-indicator-target]'
    );

    observer.observe(navigationContainer);
    if (activeLinkLabel) {
      observer.observe(activeLinkLabel);
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
      className="pointer-events-none absolute -bottom-px h-0.5 origin-center bg-blue-400 duration-200 ease-out motion-reduce:transition-none"
      style={{
        scale: indicator.visible ? "1 1" : "1 0",
        transform: `translateX(${indicator.left}px)`,
        transitionDuration: indicator.animatePosition
          ? "200ms, 200ms, 125ms"
          : "0ms, 0ms, 125ms",
        transitionProperty: "transform, width, scale",
        width: indicator.width,
      }}
    />
  );
}
