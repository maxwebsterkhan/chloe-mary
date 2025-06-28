import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__main}>
            <h2 className={styles.footer__title}>
              <span>Let&apos;s Create</span>
              <span>Something Beautiful</span>
            </h2>
          </div>

          <div className={styles.footer__side}>
            <div className={styles.footer__vertical_text}>Follow</div>
            <a
              href="https://instagram.com/bychloemary"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__instagram}
            >
              @bychloemary
            </a>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>
            <p>All images are copyrighted to Chloe Mary</p>
            <p>
              For non-wedding work and collaborations email{" "}
              <a href="mailto:hello@chloemary.com">hello@chloemary.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
