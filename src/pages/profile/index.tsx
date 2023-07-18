import Resume from "~/components/#pages/profile/Resume"
import ProfileSidebar from "~/components/#pages/profile/Sidebar"
import Stats from "~/components/#pages/profile/Stats"
import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "~/utils/types"
import styles from "./styles.module.scss"

const Profile: NextPageWithLayout = () => {
  return (
    <main className={styles.profile}>
      <ProfileSidebar />
      <div className={styles.wrapper}>
        <Stats />
        <Resume />
      </div>
    </main>
  )
}

Profile.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}

export default Profile
