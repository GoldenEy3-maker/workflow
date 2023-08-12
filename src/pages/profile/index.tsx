import {
  MdAdd,
  MdDeleteOutline,
  MdOutlineArchive,
  MdOutlineEdit,
} from "react-icons/md"
import Stats from "~/components/#pages/profile/Stats"
import Button from "~/components/Button"
import Link from "~/components/Link"
import ListContainer from "~/components/ListContainer"
import LoadingSkeletItemList from "~/components/Loading/ItemList"
import Order from "~/components/Order"
import Resume from "~/components/Resume"
import * as Section from "~/components/Section"
import { useModal } from "~/hooks/modal.hook"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import ArchiveOrderModal from "~/modals/ArchiveOrder"
import DeleteResumeModal from "~/modals/DeleteResume"
import { useArchiveOrderModalStore } from "~/store/#modals/archiveOrder"
import { useDeleteResumeModalStore } from "~/store/#modals/deleteResume"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"
import { type NextPageWithLayout } from "~/utils/types"

const Profile: NextPageWithLayout = () => {
  const authStore = useAuthStore()
  const [openModal] = useModal()
  const deleteResumeModalStore = useDeleteResumeModalStore()
  const deleteOrderModalStore = useArchiveOrderModalStore()

  const getResumeQuery = api.resume.getByUserId.useQuery(undefined, {
    enabled: authStore.user?.role === "PERFORMER",
  })

  const getOrdersQuery = api.order.getByUserId.useQuery(undefined, {
    enabled: authStore.user?.role === "EMPLOYER",
  })

  return (
    <>
      <DeleteResumeModal
        successCallback={() => void getResumeQuery.refetch()}
      />
      <ArchiveOrderModal
        successCallback={() => void getOrdersQuery.refetch()}
      />
      <Stats />
      {(() => {
        if (!authStore.user) return <LoadingSkeletItemList />

        if (authStore.user.role === "PERFORMER")
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

        if (authStore.user.role === "EMPLOYER")
          return (
            <Section.Root>
              <Section.Header>
                <Section.Title>Ваши заказы</Section.Title>
                {getOrdersQuery.data &&
                getOrdersQuery.data.length > 0 &&
                !getOrdersQuery.isLoading &&
                !getOrdersQuery.error ? (
                  <Link
                    href={PagePaths.OrderCreate}
                    variant="elevated"
                    title="Добавить"
                  >
                    <MdAdd fontSize="1.3rem" />
                    Добавить
                  </Link>
                ) : null}
              </Section.Header>
              <Section.Content>
                <ListContainer
                  data={getOrdersQuery.data}
                  render={(data) => (
                    <Order
                      key={data.id}
                      data={data}
                      backgrounded
                      reduced
                      footerActions={[
                        <Button
                          key={crypto.randomUUID()}
                          clrType="danger"
                          isIcon
                          onClick={() =>
                            openModal(() => deleteOrderModalStore.open(data.id))
                          }
                          title="Архивировать заказ"
                        >
                          <MdOutlineArchive fontSize="1.5em" />
                        </Button>,
                        <Link
                          key={crypto.randomUUID()}
                          href={PagePaths.OrderEdit + "/" + data.id}
                          variant="filled"
                          title="Изменить"
                        >
                          <MdOutlineEdit fontSize="1.3rem" />
                          Изменить
                        </Link>,
                      ]}
                    />
                  )}
                  loading={getOrdersQuery.isLoading}
                  empty={
                    <Order
                      data={undefined}
                      backgrounded
                      empty={
                        <>
                          <p>У вас пока что нет заказов.</p>
                          <p>Скорее создайте его!</p>
                          <Link
                            href={PagePaths.OrderCreate}
                            style={{ marginTop: "1rem" }}
                            variant="filled"
                            title="Создать заказ"
                          >
                            <MdAdd />
                            Создать заказ
                          </Link>
                        </>
                      }
                    />
                  }
                />
              </Section.Content>
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
