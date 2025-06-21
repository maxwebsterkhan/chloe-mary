import React, { useEffect, useRef } from "react";
import { animationUtils } from "./gsap-animations";

type CascadingTextProps = {
  text: string;
  className: string;
  letterClassName: string;
  direction?: "vertical" | "horizontal";
  startDelay?: number;
};

const CascadingText = ({
  text,
  className,
  letterClassName,
  direction = "vertical",
  startDelay = 0,
}: CascadingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Use GSAP to animate the letters
      const letters =
        containerRef.current.querySelectorAll(`.cascading-letter`);
      letters.forEach((letter, index) => {
        const delay =
          direction === "vertical"
            ? startDelay + index * 0.06
            : startDelay + (text.length - index - 1) * 0.04;

        animationUtils.fadeIn(letter as HTMLElement, {
          delay,
          duration: 0.5,
          y: direction === "vertical" ? 20 : 0,
          x: direction === "horizontal" ? -10 : 0,
        });
      });
    }
  }, [text, direction, startDelay]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`${letterClassName} cascading-letter`}
          dangerouslySetInnerHTML={{
            __html: letter === " " ? "&nbsp;" : letter,
          }}
        />
      ))}
    </div>
  );
};

export default CascadingText;
