import Skeleton from "react-loading-skeleton"
import { useAuthStore } from "~/store/auth"
import styles from "./styles.module.scss"

const Header: React.FC = () => {
  const authStore = useAuthStore()

  const getGreetings = () => {
    const currentHour = new Date().getHours()

    if (currentHour >= 6 && currentHour < 12) {
      return "Доброе утро"
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Добрый день"
    } else if (currentHour >= 18) {
      return "Добрый вечер"
    }

    return "Доброй ночи"
  }

  return (
    <header className={styles.header}>
      {authStore.user ? (
        <h1 className="page-title">
          {getGreetings()},{" "}
          <span className="rich-text">{authStore.user.firstName}</span>!
        </h1>
      ) : (
        <Skeleton width="25em" height="3em" />
      )}
    </header>
  )
}

export default Header
