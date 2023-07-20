import ProfileSidebar from "~/components/#pages/profile/Sidebar"
import styles from "./styles.module.scss"

const ProfileLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={styles.profile}>
      <ProfileSidebar />
      <main className={styles.main}>{props.children}</main>
    </div>
  )
}

export default ProfileLayout
