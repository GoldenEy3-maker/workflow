import toast from "react-hot-toast"
import ImageUploader from "~/components/ImageUploader"
import { env } from "~/env.mjs"
import { useFileReader } from "~/hooks/fileReader.hook"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { formatRole } from "~/utils/helpers"

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
      <aside className="sticky left-0 top-4 grid h-full max-w-[20rem] flex-initial basis-[20rem] gap-4 overflow-hidden rounded-medium-shape bg-surface-container px-8 py-6">
        <div className="grid place-items-center">
          <ImageUploader
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
          <div className="mt-4 grid gap-[0.3rem] text-center">
            {user ? (
              <>
                <span className="font-medium text-on-surface-variant">
                  {formatRole(user.role)}
                </span>
                <p className="text-title-l">
                  {user.lastName} {user.firstName} {user.middleName}
                </p>
              </>
            ) : null}
          </div>
        </div>

        <div>
          <hr className="mx-auto mb-4 h-[2px] w-20 rounded-full border-none bg-outline-variant" />
          <ul className="grid gap-[0.8rem]">
            <li className="flex items-center justify-between gap-4 overflow-hidden">
              Выполненные заказы <span className="text-success">21</span>
            </li>
            <li className="flex items-center justify-between gap-4 overflow-hidden">
              Текущие заказы <span className="text-primary">3</span>
            </li>
            <li className="flex items-center justify-between gap-4 overflow-hidden">
              Отмененные заказы <span className="text-danger">1</span>
            </li>
          </ul>
        </div>
        {user ? (
          <div>
            <hr className="mx-auto mb-4 h-[2px] w-20 rounded-full border-none bg-outline-variant" />
            <ul className="grid gap-[0.8rem]">
              <li className="flex items-center justify-between gap-4 overflow-hidden">
                Email
                <a
                  href={`mailto:${user.email}`}
                  className="truncate text-primary hover:underline"
                >
                  {user.email}
                </a>
              </li>
              {user.tel ? (
                <li className="flex items-center justify-between gap-4 overflow-hidden">
                  Телефон <span className="text-primary">{user.tel}</span>
                </li>
              ) : null}
              <li className="flex items-center justify-between gap-4 overflow-hidden">
                Дата рождения
                <span className="text-primary">
                  {user.birthDate.toLocaleDateString("ru")}
                </span>
              </li>
            </ul>
          </div>
        ) : null}
      </aside>
    </>
  )
}

export default ProfileSidebar
