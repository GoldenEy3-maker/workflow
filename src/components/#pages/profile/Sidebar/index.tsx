import toast from "react-hot-toast"
import ImageUploader from "~/components/ImageUploader"
import { env } from "~/env.mjs"
import { useFileReader } from "~/hooks/fileReader.hook"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { formatRole } from "~/utils/helpers"
import styles from "./styles.module.scss"

const ProfileSidebar: React.FC = () => {
  const user = useAuthStore((state) => state.user)

  const { isLoading, previews, readFiles, reset } = useFileReader()

  const uploadAvatarMut = api.user.uploadAvatar.useMutation({
    onSuccess(data) {
      toast.success("Аватар успешно обновлен!")

      useAuthStore.setState({ user: data })

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
              user?.avatar
                ? env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL + user.avatar
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
            {user ? (
              <>
                <span className={styles.role}>{formatRole(user.role)}</span>
                <p className={styles.fullName}>
                  {user.lastName} {user.firstName} {user.middleName}
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
        {user ? (
          <div className={styles.groupInfo}>
            <hr />
            <ul className={styles.list}>
              <li>
                Email
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
              {user.tel ? (
                <li>
                  Телефон <span>3</span>
                </li>
              ) : null}
              <li>
                Дата рождения
                <span>{user.birthDate.toLocaleDateString("ru")}</span>
              </li>
            </ul>
          </div>
        ) : null}
      </aside>
    </>
  )
}

export default ProfileSidebar
