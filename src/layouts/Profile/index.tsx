import ProfileSidebar from "~/components/#pages/profile/Sidebar"

const ProfileLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="flex gap-4">
      <ProfileSidebar />
      <main className="flex flex-1 flex-col gap-4">{props.children}</main>
    </div>
  )
}

export default ProfileLayout
