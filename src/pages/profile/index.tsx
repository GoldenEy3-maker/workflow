import Resume from "~/components/#pages/profile/Resume"
import Stats from "~/components/#pages/profile/Stats"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import { type NextPageWithLayout } from "~/utils/types"

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Stats />
      <Resume />
    </>
  )
}

Profile.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default Profile
