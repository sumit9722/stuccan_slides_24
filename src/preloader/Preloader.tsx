import React from "react";
import styles from "./Preloader.module.scss";

interface Props {
  size?: number; // diameter in px
  color?: string; // dot color
  className?: string;
  ariaLabel?: string;
}

const Preloader: React.FC<Props> = ({
  size = 48,
  color = "#2563EB", // default: blue-600
  className = "",
  ariaLabel = "Loading",
}) => {
  const styleVars: React.CSSProperties = {
    ["--loader-size" as any]: `${size}px`,
    ["--loader-color" as any]: color,
  };

  return (
    <div
      className={`${styles.loaderWrap} ${className}`}
      style={styleVars}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.track}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  );
};

export default Preloader;
