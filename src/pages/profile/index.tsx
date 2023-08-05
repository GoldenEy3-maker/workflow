import { MdDeleteOutline } from "react-icons/md"
import Stats from "~/components/#pages/profile/Stats"
import Button from "~/components/Button"
import Link from "~/components/Link"
import Resume from "~/components/Resume"
import * as Section from "~/components/Section"
import { useModal } from "~/hooks/modal.hook"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import DeleteResumeModal from "~/modals/DeleteResume"
import { useDeleteResumeModalStore } from "~/store/#modals/deleteResume"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"
import { type NextPageWithLayout } from "~/utils/types"

const Profile: NextPageWithLayout = () => {
  const authStore = useAuthStore()
  const [openModal] = useModal()
  const deleteResumeModalStore = useDeleteResumeModalStore()

  const getResumeQuery = api.resume.getByUserId.useQuery(undefined, {
    enabled: authStore.user?.role === "PERFORMER",
  })

  return (
    <>
      <DeleteResumeModal
        successCallback={() => void getResumeQuery.refetch()}
      />
      <Stats />
      {(() => {
        if (!authStore.user) return <Resume data={undefined} loading />

        if (authStore.user?.role === "PERFORMER")
          return (
            <Resume
              data={getResumeQuery.data}
              loading={getResumeQuery.isLoading}
              error={getResumeQuery.error?.message}
              footerActions={[
                <Button
                  key={crypto.randomUUID()}
                  clrType="danger"
                  isIcon
                  onClick={() => openModal(() => deleteResumeModalStore.open())}
                  title="Удалить"
                >
                  <MdDeleteOutline fontSize="1.5em" />
                </Button>,
                <Link
                  key={crypto.randomUUID()}
                  href={PagePaths.EditResume}
                  variant="filled"
                  title="Изменит"
                >
                  Изменить
                </Link>,
              ]}
            />
          )

        if (authStore.user?.role === "EMPLOYER")
          return (
            <Section.Root>
              <Section.Header>
                <Section.Title>Ваши заказы</Section.Title>
              </Section.Header>
              <Section.Content>Loading</Section.Content>
            </Section.Root>
          )
      })()}
    </>
  )
}

Profile.getLayout = (page) => {
  return (
    <MainLayout title="Профиль">
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default Profile
