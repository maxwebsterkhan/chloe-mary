import styles from "./home-hero.module.scss";

type CustomCSSProperties = {
  "--delay": string;
} & React.CSSProperties;

const CascadingText = ({
  text,
  className,
  direction = "vertical",
  startDelay = 0,
}: {
  text: string;
  className: string;
  direction?: "vertical" | "horizontal";
  startDelay?: number;
}) => {
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
            className={styles["home-hero__cascading-text__letter"]}
            style={
              {
                "--delay": `${startDelay + delay}s`,
              } as CustomCSSProperties
            }
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default function HomeHero() {
  return (
    <div className={styles["home-hero"]}>
      <div className={styles["home-hero__vertical-line"]}></div>
      <div className={styles["home-hero__container"]}>
        <div className={styles["home-hero__content"]}>
          <h1 className={styles["home-hero__title"]}>
            Authentic Modern Love Stories
          </h1>
          <p className={styles["home-hero__subtitle"]}>
            CAPTURED BY CHLOE MARY - TOLD BY YOU.
          </p>
        </div>
        <div className={styles["home-hero__memento"]}>
          <div className={styles["home-hero__vertical-text"]}>
            <CascadingText
              text="MEMENTO"
              className={styles["home-hero__cascading-text"]}
              direction="vertical"
            />
            <CascadingText
              text="VIVERE"
              className={styles["home-hero__cascading-text"]}
              direction="vertical"
              startDelay={0.4}
            />
          </div>
          <div className={styles["home-hero__horizontal-text"]}>
            <CascadingText
              text="R E M E M B E R T O L I V E"
              className={styles["home-hero__cascading-text"]}
              direction="horizontal"
              startDelay={0.8}
            />
          </div>
        </div>
      </div>
      <div className={styles["home-hero__animated-line"]}></div>
    </div>
  );
}
