import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div
      className={styles.loadingContainer}
      role="status"
      aria-label="Loading content"
    >
      <div className={styles.loadingSpinner}>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
      </div>
      <p className={styles.loadingText}>Loading beautiful moments...</p>
      <span className={styles.srOnly}>
        Please wait while we load the content
      </span>
    </div>
  );
}
