import React from "react"
import styles from "./Logo.module.scss"

export const LogoText = (props) => (
  <p className={styles.logoText}>
    <span className={styles.logoTextSlim}>Slim</span>
    <span className={styles.logoTextMom}>Mom</span>
  </p>
)