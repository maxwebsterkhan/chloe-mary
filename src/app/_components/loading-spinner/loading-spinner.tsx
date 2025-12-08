import styles from "./loading-spinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} aria-label="Loading" />
    </div>
  );
}

