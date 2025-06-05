import React from "react";

type CustomCSSProperties = {
  "--delay": string;
} & React.CSSProperties;

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
  return (
    <div className={className}>
      {text.split("").map((letter, index) => {
        const totalLetters = text.length;
        const delay =
          direction === "vertical"
            ? index * 0.06
            : (totalLetters - index - 1) * 0.04;
        return (
          <span
            key={index}
            className={letterClassName}
            style={
              {
                "--delay": `${startDelay + delay}s`,
              } as CustomCSSProperties
            }
            dangerouslySetInnerHTML={{
              __html: letter === " " ? "&nbsp;" : letter,
            }}
          />
        );
      })}
    </div>
  );
};

export default CascadingText;
