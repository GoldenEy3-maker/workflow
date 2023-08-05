import toast from "react-hot-toast"
import Skeleton from "react-loading-skeleton"
import ImageUploader from "~/components/ImageUploader"
import { env } from "~/env.mjs"
import { useFileReader } from "~/hooks/fileReader.hook"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { formatRole } from "~/utils/helpers"
import styles from "./styles.module.scss"

const ProfileSidebar: React.FC = () => {
  const authStore = useAuthStore()

  const { isLoading, previews, readFiles, reset } = useFileReader()

  const uploadAvatarMut = api.user.uploadAvatar.useMutation({
    onSuccess(data) {
      toast.success("Аватар успешно обновлен!")
      authStore.setUser(data)
      reset()
    },
    onError(error) {
      console.log(error)
      toast.error(error.message)
    },
  })

  return (
    <>
      <aside className={styles.sidebar}>
        {authStore.user ? (
          <>
            <div className={styles.userInfo}>
              <ImageUploader
                className={styles.uploader}
                previews={previews}
                disabled={isLoading || uploadAvatarMut.isLoading}
                reset={reset}
                onSubmit={() => {
                  toast.dismiss()

                  if (previews && previews[0])
                    uploadAvatarMut.mutate({
                      base64: previews[0].base64,
                      fileName: previews[0].name,
                    })
                }}
                currentImage={
                  authStore.user?.avatar
                    ? env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL +
                      authStore.user.avatar
                    : undefined
                }
                id="file"
                name="file"
                onChange={(event) => {
                  if (event.target.files?.length) {
                    void readFiles(event.target.files)
                  } else {
                    reset()
                  }
                }}
              />
              <div className={styles.info}>
                {authStore.user ? (
                  <>
                    <span className={styles.role}>
                      {formatRole(authStore.user.role)}
                    </span>
                    <p className={styles.fullName}>
                      {authStore.user.lastName} {authStore.user.firstName}{" "}
                      {authStore.user.middleName}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            <div className={styles.groupInfo}>
              <hr />
              <ul className={styles.list}>
                <li className={styles.success}>
                  Выполненные заказы <span>21</span>
                </li>
                <li>
                  Текущие заказы <span>3</span>
                </li>
                <li className={styles.danger}>
                  Отмененные заказы <span>1</span>
                </li>
              </ul>
            </div>
            <div className={styles.groupInfo}>
              <hr />
              <ul className={styles.list}>
                <li>
                  Email
                  <a href={`mailto:${authStore.user.email}`}>
                    {authStore.user.email}
                  </a>
                </li>
                {authStore.user.tel ? (
                  <li>
                    Телефон <span>3</span>
                  </li>
                ) : null}
                <li>
                  Дата рождения
                  <span>
                    {authStore.user.birthDate.toLocaleDateString("ru")}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Skeleton
              circle
              width="12.5rem"
              height="12.5rem"
              containerClassName={styles.avatarSkelet}
            />
            <Skeleton count={2} containerClassName={styles.credentialsSkelet} />
            <Skeleton count={3} />
            <Skeleton count={3} />
          </>
        )}
      </aside>
    </>
  )
}

export default ProfileSidebar
