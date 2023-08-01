import React from "react"
import { MdSync } from "react-icons/md"
import styles from "./styles.module.scss"

const LoadingSpin: React.FC = () => {
  return (
    <div className={styles.icon}>
      <span>
        <MdSync fontSize="3em" />
      </span>

      <p>Загрузка...</p>
    </div>
  )
}

export default LoadingSpin
