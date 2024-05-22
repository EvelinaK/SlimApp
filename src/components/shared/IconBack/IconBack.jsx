import React from "react";
import styles from "./IconBack.module.scss";

const IconBack = () => {
  return (
    <svg
      className={styles.icon}
      width="14"
      height="14"
      fill="black"
      // xmlns="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/1999/xlink"
      viewBox="0 0 45 32"
    >
      <path d="M34.515 0h-11.793v2.948h11.793c4.063 0 7.371 3.308 7.371 7.371s-3.308 7.371-7.371 7.371h-28.872l9.275-9.275-2.081-2.087-12.837 12.837 12.837 12.837 2.084-2.084-9.278-9.278h28.872c5.69 0 10.319-4.629 10.319-10.319s-4.629-10.319-10.319-10.319z"></path>
    </svg>
  );
};

export default IconBack;
